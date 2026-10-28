import { site } from "@/config/site";

const icons = {
  tiktok: (
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1 0-5.2c.27 0 .53.04.78.12V9.66a5.73 5.73 0 0 0-.78-.05A5.69 5.69 0 0 0 4.18 15.3 5.69 5.69 0 0 0 9.87 21a5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.26-1.48Z" />
  ),
  facebook: (
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
  ),
};

const links = [
  { href: site.social.facebookPage, label: "Página de Facebook", icon: "facebook" as const },
  { href: site.social.facebookContact, label: "Escríbenos en Facebook", icon: "facebook" as const },
  { href: site.social.tiktok, label: "TikTok", icon: "tiktok" as const },
];

/** Enlaces a redes sociales. variant "icons" = solo íconos; "list" = ícono + texto. */
export function SocialLinks({ variant = "icons", className = "" }: { variant?: "icons" | "list"; className?: string }) {
  if (variant === "list") {
    return (
      <ul className={`space-y-2 ${className}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:underline">
              <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{icons[l.icon]}</svg>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className={`flex gap-3 ${className}`}>
      {links.filter((l) => l.href !== site.social.facebookContact).map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className="grid size-10 place-items-center rounded-full border border-current/30 transition-colors hover:bg-white hover:text-ink">
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{icons[l.icon]}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
