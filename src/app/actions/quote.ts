"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { and, eq, gt, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { quoteRequests } from "@/db/schema";
import { models } from "@/data/catalog";

export type QuoteState = {
  status: "idle" | "ok" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "phone" | "email" | "use" | "model" | "message" | "consent", string>>;
};

const modelSlugs = models.map((m) => m.slug) as [string, ...string[]];

const QuoteSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(80, "Máximo 80 caracteres."),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{6,24}$/, "Escribe un teléfono válido, por ejemplo +507 6000-0000."),
  email: z.union([z.literal(""), z.email("Revisa el correo.").max(120)]),
  use: z.enum(["pesca", "turismo", "deportivas"], { error: "Elige el uso del bote." }),
  model: z.union([z.literal(""), z.enum(modelSlugs)]),
  message: z.string().trim().max(1500, "Máximo 1500 caracteres."),
  consent: z.literal("on", { error: "Necesitamos tu autorización para responderte." }),
});

const MAX_PER_HOUR = 3;

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Honeypot: los bots llenan este campo oculto. Fingimos éxito y no guardamos nada.
  if (String(formData.get("company") ?? "") !== "") return { status: "ok" };

  // Formulario enviado demasiado rápido (< 3 s) = probablemente un bot.
  const startedAt = Number(formData.get("t") ?? 0);
  if (!startedAt || Date.now() - startedAt < 3000) {
    return { status: "error", message: "No pudimos enviar el formulario. Espera unos segundos e inténtalo de nuevo." };
  }

  const parsed = QuoteSchema.safeParse({
    name: formData.get("name") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    use: formData.get("use") ?? "",
    model: formData.get("model") ?? "",
    message: formData.get("message") ?? "",
    consent: formData.get("consent") ?? "",
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>;
    const fieldErrors: QuoteState["fieldErrors"] = {};
    for (const [k, v] of Object.entries(flat)) if (v?.[0]) fieldErrors[k as keyof typeof fieldErrors] = v[0];
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "0.0.0.0").trim();
  const salt = process.env.IP_HASH_SALT ?? "";
  const ipHash = createHash("sha256").update(salt + ip).digest("hex");

  try {
    const db = getDb();
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(quoteRequests)
      .where(and(eq(quoteRequests.ipHash, ipHash), gt(quoteRequests.createdAt, sql`now() - interval '1 hour'`)));

    if (count >= MAX_PER_HOUR) {
      return { status: "error", message: "Ya recibimos varias solicitudes desde tu conexión. Escríbenos por WhatsApp o intenta en una hora." };
    }

    const d = parsed.data;
    await db.insert(quoteRequests).values({
      name: d.name,
      phone: d.phone,
      email: d.email || null,
      use: d.use,
      model: d.model || null,
      message: d.message || null,
      ipHash,
      consentAt: new Date(),
    });
  } catch (err) {
    console.error("submitQuote failed", err instanceof Error ? err.message : err);
    return { status: "error", message: "El formulario no está disponible ahora. Escríbenos por WhatsApp y te respondemos hoy." };
  }

  return { status: "ok", message: "Solicitud enviada. Te contactamos por teléfono o WhatsApp en menos de 24 horas hábiles." };
}
