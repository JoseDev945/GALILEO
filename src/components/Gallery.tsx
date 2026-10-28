"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { modelBySlug, type Photo } from "@/data/catalog";

const LIGHTBOX_WIDTHS = [828, 1440, 1920, 2560, 3200];

type Props = { photos: (Photo & { modelLabel: string })[]; priorityCount?: number };

export function Gallery({ photos, priorityCount = 3 }: Props) {
  const [index, setIndex] = useState(-1);
  const slides = useMemo(
    () =>
      photos.map((p) => ({
          src: p.src,
          width: p.width,
          height: p.height,
          alt: p.alt,
          title: p.modelLabel,
          description: p.alt,
          srcSet: LIGHTBOX_WIDTHS.filter((w) => w <= p.width).map((w) => ({
            src: `/_next/image?url=${encodeURIComponent(p.src)}&w=${w}&q=90`,
            width: w,
            height: Math.round((p.height * w) / p.width),
          })),
        })),
    [photos],
  );
  // Color del bote de la foto que se está viendo (para las flechas de la vista ampliada)
  const [view, setView] = useState(0);
  // En el teléfono: un toque en la foto oculta textos y botones (menos la X); otro toque los muestra
  const [clean, setClean] = useState(false);
  // En pantalla completa la foto ocupa toda la pantalla, sin márgenes (sin recortarse)
  const [fs, setFs] = useState(false);
  const accent = modelBySlug(photos[view]?.model ?? "")?.accent ?? ["#1d5f6b", "#4fb3c2"];

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4">
        {photos.map((p, i) => (
          <li key={p.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => { setView(i); setIndex(i); }}
              className="group block w-full overflow-hidden rounded-xl bg-line text-left"
              aria-label={`Ampliar foto: ${p.alt}`}
            >
              <Image
                src={p.src}
                width={p.width}
                height={p.height}
                alt={p.alt}
                placeholder="blur"
                blurDataURL={p.blur}
                priority={i < priorityCount}
                sizes="(min-width: 1024px) 33vw, 50vw"
                quality={90}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>
            <p className="mt-1.5 text-xs text-mist sm:mt-2 sm:text-sm">
              {!p.alt.toLowerCase().includes(p.modelLabel.toLowerCase()) && (
                <span className="block font-semibold text-ink">{p.modelLabel}</span>
              )}
              {p.alt}
            </p>
          </li>
        ))}
      </ul>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => { setIndex(-1); setClean(false); }}
        on={{ view: ({ index: i }) => { setView(i); setIndex(i); }, click: () => setClean((c) => !c), enterFullscreen: () => { setFs(true); setClean(true); }, exitFullscreen: () => setFs(false) }}
        className={`lb-boat ${clean ? "lb-clean" : ""} ${fs ? "lb-fs" : ""}`}
        carousel={{ padding: fs ? 0 : "16px", spacing: fs ? 0 : "30%", imageFit: "contain" }}
        styles={{ root: { "--yarl__boat": accent[0], "--yarl__boat-light": accent[1] } }}
        plugins={[Captions, Zoom, Fullscreen]}
        toolbar={{ buttons: ["zoom", "fullscreen", "close"] }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        labels={{ "Zoom in": "Acercar", "Zoom out": "Alejar", Close: "Cerrar", Previous: "Anterior", Next: "Siguiente", "Enter Fullscreen": "Pantalla completa", "Exit Fullscreen": "Salir de pantalla completa" }}
        slides={slides}
      />
    </>
  );
}
