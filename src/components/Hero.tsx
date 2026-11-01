"use client";

import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BoatModel, Photo } from "@/data/models";
import { ModelTitle } from "./ModelTitle";
import { whatsappLink } from "@/config/site";
import { HERO_RESET_EVENT } from "./LogoLink";

const MOBILE = "(max-width: 767px)";

/**
 * Foto de fondo del carrusel. En teléfonos se sirve con calidad 75 (pesa ~30 % menos y no se nota en pantallas pequeñas);
 * en PC y pantallas grandes, con calidad 90. La primera foto se pide antes que todo (es el LCP de la página).
 */
function HeroPhoto({ photo, active, first }: { photo: Photo; active: boolean; first: boolean }) {
  const common = { src: photo.src, alt: active ? photo.alt : "", fill: true, sizes: "100vw", placeholder: "blur" as const, blurDataURL: photo.blur };
  const mobile = getImageProps({ ...common, quality: 75 }).props;
  const { props: desktop } = getImageProps({ ...common, quality: 90 });
  if (first) {
    preload(mobile.src, { as: "image", imageSrcSet: mobile.srcSet, imageSizes: "100vw", fetchPriority: "high", media: MOBILE });
    preload(desktop.src, { as: "image", imageSrcSet: desktop.srcSet, imageSizes: "100vw", fetchPriority: "high", media: "(min-width: 768px)" });
  }
  return (
    <picture>
      <source media={MOBILE} srcSet={mobile.srcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- el alt viene en desktop */}
      <img
        {...desktop}
        aria-hidden={!active}
        fetchPriority={first ? "high" : "auto"}
        loading={first ? "eager" : "lazy"}
        className={`-z-20 object-cover transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0"}`}
      />
    </picture>
  );
}

type Slide = { model: BoatModel; name: string; ofName: string; photo: Photo; href: string; price: string; eslora: string };

const INTERVAL = 6000;

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Modelo anterior" : "Modelo siguiente"}
      className="grid size-11 place-items-center rounded-full border border-white/40 bg-night/40 text-white backdrop-blur-sm transition-colors hover:border-[var(--accent-light)] hover:bg-[var(--accent)]"
    >
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24">
        <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  );
}

export function Hero({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const stripRef = useRef<HTMLUListElement>(null);
  const touchX = useRef<number | null>(null);
  // true mientras la persona mueve la tira de modelos (y unos segundos después)
  const [browsing, setBrowsing] = useState(false);
  const browseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const markBrowsing = useCallback(() => {
    setBrowsing(true);
    if (browseTimer.current) clearTimeout(browseTimer.current);
    browseTimer.current = setTimeout(() => setBrowsing(false), 8000);
  }, []);
  const n = slides.length;
  const s = slides[active];
  // Solo se descargan las fotos ya mostradas y la siguiente (no las 9 de golpe): la página carga mucho más rápido.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1 % n]));

  const go = useCallback(
    (i: number) => {
      const k = ((i % n) + n) % n;
      setSeen((prev) => (prev.has(k) && prev.has((k + 1) % n) ? prev : new Set([...prev, k, (k + 1) % n])));
      setActive(k);
    },
    [n],
  );
  const next = useCallback(() => go(active + 1), [go, active]);
  const prev = useCallback(() => go(active - 1), [go, active]);

  // Avance automático cada 6 s (se pausa solo mientras se navega con el teclado dentro del carrusel)
  useEffect(() => {
    if (paused || browsing || n < 2) return;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, browsing, next, n, cycle]);

  // El botón "Cotiza tu bote" de la cabecera toma el color del bote activo
  useEffect(() => {
    document.documentElement.style.setProperty("--boat-color", slides[active].model.accent[0]);
  }, [active, slides]);
  useEffect(() => () => { document.documentElement.style.removeProperty("--boat-color"); }, []);

  // Al tocar el logo: volver al primer modelo y reiniciar el temporizador
  useEffect(() => {
    const reset = () => { setPaused(false); setBrowsing(false); setActive(0); setCycle((c) => c + 1); };
    window.addEventListener(HERO_RESET_EVENT, reset);
    return () => window.removeEventListener(HERO_RESET_EVENT, reset);
  }, []);

  // Mantener visible la miniatura activa en la tira (no si la persona la está moviendo a mano)
  const browsingRef = useRef(false);
  useEffect(() => { browsingRef.current = browsing; }, [browsing]);
  useEffect(() => {
    if (browsingRef.current) return;
    const strip = stripRef.current;
    const el = strip?.children[active] as HTMLElement | undefined;
    if (strip && el) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Modelos de Botes Galileo"
      className="hero-accent relative isolate overflow-hidden bg-night text-white"
      style={{ "--accent": s.model.accent[0], "--accent-light": s.model.accent[1] } as React.CSSProperties}
      onFocusCapture={(e) => { if ((e.target as HTMLElement).matches(":focus-visible")) setPaused(true); }}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => {
        // Deslizar sobre la tira o la barra de progreso no cambia la foto grande
        const t = e.target as HTMLElement;
        touchX.current = t.closest("[data-strip], [role=tablist]") ? null : e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      {slides.map((sl, i) => seen.has(i) && <HeroPhoto key={sl.photo.id} photo={sl.photo} active={i === active} first={i === 0} />)}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/35 via-45% to-transparent" />
      {/* Tono del color del bote sobre la foto */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top_right,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_40%)]" />

      <div className="mx-auto flex min-h-[calc(100svh-74px)] max-w-7xl flex-col justify-end px-4 pb-36 pt-28 sm:px-6 lg:pb-8 lg:pt-32">
        <div className="flex items-end justify-between gap-6">
          <div key={s.photo.id} aria-live={paused ? "polite" : "off"} className="max-w-3xl [text-shadow:0_1px_14px_rgb(0_0_0/0.6)]">
            {/* Título principal de la página para Google: lo que busca la gente ("botes en Panamá", "pangas") */}
            <h1 className="eyebrow mb-4 text-white/85">Botes y pangas de fibra de vidrio en Panamá</h1>
            <span className="inline-block rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20">{s.model.badge}</span>
            <p className="mt-5 text-[clamp(2.8rem,7vw,5.25rem)] [&_.model-num]:text-[var(--accent-light)] [&_.model-tag]:text-[var(--accent-light)]">
              <ModelTitle m={s.model} />
            </p>
            <p className="mt-5 max-w-xl text-lg text-white/90 sm:text-xl">{s.model.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappLink(`Hola, quiero cotizar el modelo ${s.name}.`)} target="_blank" rel="noopener noreferrer" className="btn bg-[var(--accent)] text-white ring-1 ring-white/20 hover:brightness-110">Cotiza la tuya</a>
              <Link href={s.href} className="btn border border-white text-white hover:bg-white hover:text-ink">
                Ver fotos<span className="hidden sm:inline">&nbsp;{s.ofName}</span>
              </Link>
            </div>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <Arrow dir="prev" onClick={prev} />
            <Arrow dir="next" onClick={next} />
          </div>
        </div>

        {/* Indicador de posición */}
        <div className="mt-10 flex items-center gap-4">
          <span className="text-sm tabular-nums text-white/80">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <div className="flex flex-1 gap-1.5" role="tablist" aria-label="Elegir modelo">
            {slides.map((sl, i) => (
              <button
                key={sl.photo.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Ver ${sl.name}`}
                onClick={() => go(i)}
                className="group relative h-6 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-white/25 group-hover:bg-white/50" />
                {i === active && (
                  <span
                    key={`${active}-${paused}-${cycle}`}
                    className="allow-motion absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-[var(--accent-light)]"
                    style={{ width: paused ? "100%" : undefined, animation: paused ? undefined : `hero-progress ${INTERVAL}ms linear forwards` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tira de modelos */}
        <ul
          ref={stripRef}
          data-strip
          onTouchStart={markBrowsing}
          onWheel={markBrowsing}
          onPointerDown={markBrowsing}
          onMouseEnter={() => { setBrowsing(true); if (browseTimer.current) clearTimeout(browseTimer.current); }}
          onMouseLeave={markBrowsing}
          className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:gap-4 [&::-webkit-scrollbar]:hidden">
          {slides.map((sl, i) => (
            <li key={sl.photo.id} className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-[calc(25%-12px)]">
              <button
                type="button"
                onClick={() => go(i)}
                aria-pressed={i === active}
                className={`flex h-full w-full items-center gap-4 rounded-2xl border p-3 text-left transition-colors sm:p-4 ${
                  i === active ? "border-[var(--accent-light)] bg-[color-mix(in_srgb,var(--accent)_45%,transparent)]" : "border-white/20 bg-night/50 hover:border-white/50"
                }`}
              >
                <Image src={sl.photo.src} alt="" width={96} height={64} sizes="96px" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                <span className="min-w-0">
                  <ModelTitle m={sl.model} className="block text-lg sm:text-xl" light />
                  <span className="eyebrow mt-1 block truncate text-white/70">{sl.model.badge}</span>
                  <span className="mt-1 block text-xs text-white/80 sm:text-sm">
                    {sl.eslora && `Largo ${sl.eslora} · `}<strong className="text-white">{sl.price}</strong>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
