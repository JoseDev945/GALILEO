import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo ${site.name} recoge y protege tus datos personales.`,
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad" updated={site.lastLegalUpdate}>
      <p>
        Esta política explica cómo {site.name} trata los datos personales relacionados con este sitio web y con los mensajes que nos envías, conforme a la
        Ley 81 de 2019 sobre Protección de Datos Personales de la República de Panamá y su reglamentación.
      </p>

      <h2>Responsable del tratamiento</h2>
      <p>{site.legalOwner} ({site.legalId}), {site.address.street}, {site.address.locality}, {site.address.region}. Contacto: {site.email}.</p>

      <h2>Qué datos recogemos</h2>
      <p>
        Este sitio <strong>no tiene formularios ni guarda datos personales</strong>. Tampoco usa cookies de publicidad ni herramientas de
        seguimiento de terceros. El servidor que aloja el sitio (Vercel) puede registrar datos técnicos de las visitas, como la dirección IP,
        solo por motivos de seguridad y funcionamiento.
      </p>

      <h2>Cuando nos escribes por WhatsApp, correo o redes sociales</h2>
      <p>
        Si nos contactas por WhatsApp, correo, Facebook o TikTok, recibimos los datos que tú nos envías (por ejemplo, tu nombre, número y
        lo que necesitas). Los usamos únicamente para responderte, preparar tu cotización y dar seguimiento a tu pedido. No los vendemos ni
        los cedemos a terceros con fines comerciales. Esas conversaciones también se rigen por las políticas de privacidad de cada plataforma.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes solicitar el acceso, la rectificación, la cancelación (eliminación), la oposición y la portabilidad de tus datos escribiendo a{" "}
        <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>. Respondemos en los plazos que establece la ley. Si no estás
        conforme con la respuesta, puedes acudir a la Autoridad Nacional de Transparencia y Acceso a la Información (ANTAI).
      </p>

      <h2>Mapa de ubicación</h2>
      <p>
        La página de inicio muestra un mapa de Google Maps con la ubicación del taller. Al cargarse, Google puede recibir datos técnicos
        de tu navegador según su propia política de privacidad.
      </p>

      <h2>Cambios</h2>
      <p>Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización.</p>
    </LegalPage>
  );
}
