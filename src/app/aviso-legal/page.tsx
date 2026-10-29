import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: `Datos del responsable del sitio web de ${site.name}, fabricante de pangas de fibra de vidrio en ${site.address.locality}, Panamá.`,
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal" updated={site.lastLegalUpdate}>
      <h2>Responsable del sitio</h2>
      <ul>
        <li>Nombre comercial: {site.name}</li>
        {site.legalOwner && <li>Titular: {site.legalOwner}</li>}
        {site.legalId && <li>RUC / cédula: {site.legalId}</li>}
        <li>Actividad: fabricación y venta de embarcaciones de fibra de vidrio (pangas y lanchas) para pesca y turismo.</li>
        <li>Dirección del taller: {site.address.street}, {site.address.locality}, {site.address.region}, Panamá.</li>
        <li>
          WhatsApp y teléfono: <a className="underline" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">{site.phoneDisplay}</a>
        </li>
        <li>
          Correo: <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        {site.hours && <li>Horario de atención: {site.hours}</li>}
      </ul>

      <h2>Objeto del sitio</h2>
      <p>
        Este sitio presenta los modelos que fabrica {site.name}, con fotografías de trabajos reales, medidas y precios referenciales, y permite
        pedir una cotización por WhatsApp. No se venden productos ni se cobran pagos a través del sitio: cada pedido se acuerda directamente con
        el taller.
      </p>

      <h2>Alojamiento</h2>
      <p>El sitio se aloja en Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, Estados Unidos).</p>

      <h2>Condiciones y privacidad</h2>
      <p>
        El uso del sitio se rige por los <Link className="underline" href="/terminos">Términos y condiciones</Link>. El tratamiento de datos
        personales se explica en la <Link className="underline" href="/privacidad">Política de privacidad</Link>, conforme a la Ley 81 de 2019
        de la República de Panamá.
      </p>
    </LegalPage>
  );
}
