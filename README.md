# Botes Galileo: sitio web

Sitio de Botes Galileo (La Chorrera, Panamá Oeste): carrusel de modelos, catálogo, galería por categoría (turismo, pesca y lanchas deportivas) y cotización por WhatsApp.

**Tecnologías:** Next.js 16 (App Router, Server Components) · React 19 · TypeScript · Tailwind CSS 4 · Vercel. (Drizzle + Neon quedan listos pero son opcionales: el sitio ya no usa formulario.)

## 1. Antes de publicar: edita tus datos

Los datos del negocio están en `src/config/site.ts` (WhatsApp, correo, redes, dirección, formas de pago). Falta completar lo marcado con `TODO`: horario real, nombre legal y RUC/cédula. Esos datos aparecen en el sitio, en la política de privacidad y en los datos para Google.

## 2. Probar en tu computadora

Necesitas Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local   # luego rellena DATABASE_URL e IP_HASH_SALT
npm run dev                  # abre http://localhost:3000
```

## 3. Base de datos en Neon (opcional, no se usa por ahora)

1. Crea un proyecto en https://console.neon.tech (región: US East es la más cercana a Panamá).
2. Copia la **pooled connection string** y pégala en `.env.local` como `DATABASE_URL`.
3. Crea la tabla:
   ```bash
   npm run db:push
   ```
4. Las cotizaciones llegan a la tabla `quote_requests`. Puedes verlas en el editor SQL de Neon:
   ```sql
   select created_at, name, phone, use, model, message from quote_requests order by created_at desc;
   ```

## 4. Subir a GitHub

```bash
git init
git add .
git commit -m "Sitio Botes Galileo"
git branch -M main
git remote add origin https://github.com/JoseDev945/GALILEO.git
git push -u origin main
```

El archivo `.gitignore` ya impide subir `.env.local` y otras claves.

## 5. Publicar en Vercel

1. En https://vercel.com, haz clic en **Add New → Project** e importa el repositorio de GitHub.
2. En **Environment Variables** agrega `DATABASE_URL`, `IP_HASH_SALT` y `NEXT_PUBLIC_SITE_URL` (tu dominio final, sin barra al final).
   - Otra opción es instalar la integración **Neon** desde el Marketplace de Vercel: crea `DATABASE_URL` sola.
3. Haz clic en **Deploy**. Cada `git push` a `main` publica una nueva versión automáticamente.
4. Cuando tengas dominio, agrégalo en **Settings → Domains** y actualiza `NEXT_PUBLIC_SITE_URL`.

## 6. SEO: después de publicar

- Registra el sitio en Google Search Console y envía `https://tu-dominio.com/sitemap.xml`.
- Crea o reclama tu ficha de **Perfil de Empresa de Google** con la misma dirección y teléfono que pusiste en `site.ts`.
- Lo que ya está incluido: metadatos por página, Open Graph para compartir en WhatsApp y Facebook, datos estructurados (LocalBusiness, ImageGallery, Breadcrumb), sitemap con imágenes, robots.txt, URLs canónicas, imágenes AVIF/WebP con `alt` descriptivo, páginas estáticas rápidas.

## Seguridad incluida

- Cabeceras HTTP: Content-Security-Policy, HSTS, X-Frame-Options, nosniff, Referrer-Policy y Permissions-Policy (`next.config.ts`).
- Formulario validado en el servidor con Zod, con campo trampa (honeypot) anti-bots, rechazo de envíos de menos de 3 segundos y límite de 3 solicitudes por hora por conexión.
- Las IPs no se guardan, solo un hash SHA-256 con sal.
- Las consultas usan Drizzle con parámetros, lo que protege contra inyección SQL.
- Las claves solo existen en variables de entorno del servidor y nunca llegan al navegador.
- Las fotos se publican sin metadatos EXIF (incluido el GPS).
- Las fuentes están alojadas en el propio sitio: no hay peticiones a Google Fonts.

## Agregar o cambiar fotos

1. Pon la foto en `public/img/` en formato `.webp`, con un ancho máximo de 1800 px.
2. Agrégala en `src/data/photos.json` con su `category` (`pesca`, `turismo` o `proceso`), `model` y un `alt` que describa la foto.

## Aviso legal

Las páginas `/privacidad` y `/terminos` son una base razonable según la Ley 81 de 2019 (protección de datos de Panamá). **No sustituyen la revisión de un abogado.** Pide que las revise antes de lanzar el sitio.
