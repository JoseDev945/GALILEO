import { pgTable, serial, text, timestamp, varchar, index } from "drizzle-orm/pg-core";

// Solicitudes de cotización enviadas desde el formulario.
export const quoteRequests = pgTable(
  "quote_requests",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 80 }).notNull(),
    phone: varchar("phone", { length: 30 }).notNull(),
    email: varchar("email", { length: 120 }),
    use: varchar("use", { length: 20 }).notNull(),
    model: varchar("model", { length: 40 }),
    message: text("message"),
    // IP anonimizada con SHA-256 + sal: sirve para limitar spam sin guardar la IP real.
    ipHash: varchar("ip_hash", { length: 64 }).notNull(),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("quote_ip_created_idx").on(t.ipHash, t.createdAt)],
);
