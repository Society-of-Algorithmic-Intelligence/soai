import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type WorkshopMosaicProps = {
  photos: { src: string; alt: string }[];
};

/**
 * Bento-style mosaic for workshop photos with a fullscreen viewer.
 * Static editorial composition — intentionally not the marquee Gallery.
 */
export function WorkshopMosaic({ photos }: WorkshopMosaicProps) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, prev, next]);

  if (photos.length === 0) return null;

  const tile = (index: number, className: string) => {
    const photo = photos[index];
    if (!photo) return null;
    return (
      <button
        key={index}
        type="button"
        onClick={() => setActive(index)}
        aria-label={`View photo ${index + 1} of ${photos.length}`}
        className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm transition hover:shadow-lg ${className}`}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </button>
    );
  };

  return (
    <>
      <div className="grid auto-rows-[128px] grid-cols-2 gap-3 md:auto-rows-[150px] md:grid-cols-12 md:gap-4">
        {tile(0, "col-span-2 row-span-2 md:col-span-7 md:row-span-2")}
        {tile(1, "md:col-span-5")}
        {tile(2, "md:col-span-5")}
        {tile(3, "md:col-span-4")}
        {tile(4, "md:col-span-4")}
        {tile(5, "md:col-span-4")}
        {tile(6, "md:col-span-6")}
        {tile(7, "col-span-2 md:col-span-6")}
      </div>

      {active !== null && photos[active] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <figure className="max-h-full max-w-[92vw]" onClick={(event) => event.stopPropagation()}>
            <img
              src={photos[active].src}
              alt={photos[active].alt}
              className="mx-auto max-h-[82vh] rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm text-white/70">
              {active + 1} / {photos.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
