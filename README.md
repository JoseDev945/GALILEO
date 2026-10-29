# Botes Galileo: sitio web

Sitio de Botes Galileo (La Chorrera, Panamá Oeste): carrusel de modelos, catálogo, galería por uso (turismo, pesca y lanchas deportivas) y cotización por WhatsApp.

**Tecnologías:** Next.js 16 (App Router, Server Components) · React 19 · TypeScript estricto · Tailwind CSS 4 · Vercel (hosting, Web Analytics y Speed Insights) · pnpm.

## 1. Datos del negocio

Todo está en `src/config/site.ts` (WhatsApp, correo, redes, dirección, pagos). Completa lo marcado con `TODO`:

- `hours`: horario real de atención. Mientras esté vacío no se muestra.
- `legalOwner` y `legalId`: nombre del titular o razón social y RUC/cédula. Aparecen en el Aviso legal y en la Política de privacidad.

Los modelos, precios y medidas están en `src/data/catalog.ts`; las fotos, en `src/data/photos.json` y `public/img/`.

## 2. Probar en tu computadora

Necesitas Node.js 20.9 o superior y **pnpm** (este proyecto usa solo pnpm; no uses npm ni yarn).

```bash
corepack enable        # activa pnpm (viene con Node.js)
pnpm install
pnpm dev               # abre http://localhost:3000
```

Revisar la calidad del código antes de subir cambios:

```bash
pnpm lint              # ESLint: reglas de Next.js, React, accesibilidad y TypeScript
pnpm typecheck         # TypeScript en modo estricto
pnpm build             # compila el sitio como en producción
pnpm audit             # busca vulnerabilidades conocidas en las dependencias
```

## 3. Publicar en Vercel

1. En https://vercel.com, **Add New → Project** e importa el repositorio `JoseDev945/GALILEO`. Vercel detecta pnpm solo.
2. Variables de entorno (Settings → Environment Variables), ver `.env.example`:
   - `NEXT_PUBLIC_SITE_URL`: tu dominio final (opcional mientras uses el dominio de Vercel).
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: código de Google Search Console.
3. En el proyecto, activa **Analytics** y **Speed Insights** (pestañas del mismo nombre).
4. Cada `git push` a `main` publica una versión nueva. Vercel sirve el sitio con HTTPS y redirige HTTP a HTTPS.

## 4. Después de publicar

- **Search Console:** agrega el dominio, verifica con la etiqueta HTML (variable de arriba) y envía `https://tu-dominio/sitemap.xml`.
- **Perfil de Empresa de Google:** crea o reclama la ficha con el mismo nombre, dirección, teléfono y horario que el sitio.
- **PageSpeed Insights:** mide `https://tu-dominio` y revisa las Core Web Vitals (también en Speed Insights de Vercel).
- **Resultados enriquecidos:** valida una página de modelo en https://search.google.com/test/rich-results.
- **Analytics:** las visitas aparecen en Vercel Analytics. Los clics en WhatsApp se registran como el evento `whatsapp_click` (los eventos personalizados requieren el plan Pro de Vercel).

## Seguridad y privacidad incluidas

- Cabeceras HTTP: Content-Security-Policy, HSTS, X-Frame-Options, nosniff, Referrer-Policy y Permissions-Policy (`next.config.ts`).
- Sin formularios ni base de datos: el sitio no recibe ni guarda datos personales.
- Sin cookies: la analítica de Vercel no usa cookies y el mapa de Google solo se carga si la persona lo pide.
- Fotos publicadas sin metadatos EXIF (incluido el GPS). Fuentes alojadas en el propio sitio.

## Aviso legal

Las páginas `/aviso-legal`, `/privacidad` y `/terminos` son una base según la Ley 81 de 2019 (protección de datos de Panamá). **No sustituyen la revisión de un abogado.**
