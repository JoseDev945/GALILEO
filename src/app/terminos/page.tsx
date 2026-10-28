import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Condiciones de uso del sitio web de ${site.name}.`,
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return (
    <LegalPage title="Términos y condiciones" updated={site.lastLegalUpdate}>
      <p>Al usar este sitio aceptas estas condiciones. Si no estás de acuerdo, te pedimos no usarlo.</p>

      <h2>Información y precios</h2>
      <ul>
        <li>Los precios publicados son referenciales, en dólares de los Estados Unidos, y pueden cambiar sin previo aviso según el costo de los materiales.</li>
        <li>El precio, lo que incluye y el plazo de entrega se acuerdan por escrito en cada cotización. Publicar un precio no constituye una oferta vinculante.</li>
        <li>Las medidas indicadas son aproximadas; las finales se confirman en la cotización.</li>
      </ul>

      <h2>Formas de pago</h2>
      <ul>
        <li>Aceptamos pagos en {site.payment.methods.join(" o ")}.</li>
        <li>Se paga el 50 % del precio acordado para empezar la construcción del bote y el 50 % restante cuando el bote está terminado, antes de la entrega.</li>
        <li>Cada pago se confirma por escrito (WhatsApp o correo) con el detalle del pedido.</li>
      </ul>

      <h2>Fotografías</h2>
      <p>
        Las fotos muestran trabajos reales de nuestro taller. Los colores, rótulos, accesorios y motores que aparecen corresponden a pedidos
        de clientes específicos y no están incluidos salvo que se acuerde. Los nombres pintados en los cascos pertenecen a sus dueños.
      </p>

      <h2>Garantía y uso seguro</h2>
      <p>
        Las condiciones de garantía se entregan por escrito con cada bote. La capacidad de personas, carga y potencia de motor debe respetar
        lo indicado en la cotización y lo que exija la Autoridad Marítima de Panamá. El propietario es responsable del registro de la embarcación,
        del equipo de seguridad a bordo y de su uso conforme a la ley.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, fotografías, diseños y el logotipo de este sitio pertenecen a {site.name}. No pueden copiarse ni usarse con fines comerciales
        sin autorización escrita. Las marcas de terceros que pudieran mencionarse pertenecen a sus respectivos titulares; {site.name} no tiene
        relación comercial con ellas.
      </p>

      <h2>Responsabilidad</h2>
      <p>Hacemos lo posible para que la información sea correcta y esté disponible, pero el sitio se ofrece tal como está y puede contener errores u omisiones.</p>

      <h2>Ley aplicable</h2>
      <p>Estas condiciones se rigen por las leyes de la República de Panamá, incluida la normativa de protección al consumidor.</p>

      <h2>Contacto</h2>
      <p>{site.legalOwner}. <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
