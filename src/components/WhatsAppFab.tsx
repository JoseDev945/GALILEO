import { site, whatsappLink } from "@/config/site";

const WA = "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z";
const TT = "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1 0-5.2c.27 0 .53.04.78.12V9.66a5.73 5.73 0 0 0-.78-.05A5.69 5.69 0 0 0 4.18 15.3 5.69 5.69 0 0 0 9.87 21a5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.26-1.48Z";
const FB = "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z";

const base = "grid place-items-center rounded-full text-white shadow-lg transition-transform hover:scale-105";

/** Botones flotantes: Facebook (en celular, más pequeño que TikTok), TikTok y WhatsApp. */
export function WhatsAppFab() {
  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-center gap-3">
      <a href={site.social.facebookPage} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Botes Galileo" className={`${base} size-10 bg-[#1877f2] lg:size-12`}>
        <svg aria-hidden width="26" height="26" className="size-[22px] lg:size-[26px]" viewBox="0 0 24 24" fill="currentColor"><path d={FB} /></svg>
      </a>
      <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Botes Galileo" className={`${base} size-12 bg-black ring-1 ring-white/20`}>
        <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d={TT} /></svg>
      </a>
      <a href={whatsappLink("Hola, quiero información sobre sus botes.")} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className={`${base} size-14 bg-[#25d366]`}>
        <svg aria-hidden width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d={WA} /></svg>
      </a>
    </div>
  );
}
