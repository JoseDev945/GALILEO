import { site, whatsappLink } from "@/config/site";

const WA = "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z";
const TT = "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1 0-5.2c.27 0 .53.04.78.12V9.66a5.73 5.73 0 0 0-.78-.05A5.69 5.69 0 0 0 4.18 15.3 5.69 5.69 0 0 0 9.87 21a5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.26-1.48Z";
const FB = "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z";
const IG = "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z";

const IG_BG = "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)]";

const links = [
  { key: "fb", href: site.social.facebookPage, aria: "Facebook de Botes Galileo", path: FB },
  { key: "ig", href: site.social.instagram, aria: "Instagram de Botes Galileo", path: IG },
  { key: "tt", href: site.social.tiktok, aria: "TikTok de Botes Galileo", path: TT },
  { key: "wa", href: whatsappLink("Hola, quiero información sobre sus botes."), aria: "Escribir por WhatsApp", path: WA },
] as const;

/** Color de cada red en la barra de abajo (celular). */
const barIcon: Record<(typeof links)[number]["key"], string> = {
  fb: "bg-[#1877f2]",
  ig: IG_BG,
  tt: "bg-black ring-1 ring-white/25",
  wa: "bg-[#25d366]",
};

/** Burbujas flotantes en PC (de arriba a abajo). */
const fab: Record<(typeof links)[number]["key"], string> = {
  fb: "size-12 bg-[#1877f2]",
  ig: `size-12 ${IG_BG}`,
  tt: "size-12 bg-black ring-1 ring-white/20",
  wa: "size-14 bg-[#25d366]",
};

/**
 * Redes sociales y WhatsApp.
 * - Celular y tableta: barra fija abajo con las 4 redes, solo íconos (sin nombres, para ocupar menos pantalla).
 * - PC: burbujas flotantes abajo a la derecha (Facebook, Instagram, TikTok y WhatsApp).
 */
export function WhatsAppFab() {
  return (
    <>
      <nav
        aria-label="Redes sociales"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="mx-auto grid h-14 max-w-md grid-cols-4">
          {links.map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.aria}
                className="flex h-full items-center justify-center"
              >
                <span className={`grid size-10 place-items-center rounded-full text-white transition-transform active:scale-95 ${barIcon[l.key]}`}>
                  <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d={l.path} /></svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="fixed bottom-4 right-4 z-40 hidden flex-col items-center gap-3 lg:flex">
        {links.map((l) => (
          <a
            key={l.key}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.aria}
            className={`grid place-items-center rounded-full text-white shadow-lg transition-transform hover:scale-105 ${fab[l.key]}`}
          >
            <svg aria-hidden width="26" height="26" className={l.key === "wa" ? "size-7" : "size-6"} viewBox="0 0 24 24" fill="currentColor"><path d={l.path} /></svg>
          </a>
        ))}
      </div>
    </>
  );
}
