import { Camera } from "lucide-react";
import Gallery from "@/components/home/Gallery";
import { gallerySpeed, type PhotoSlide } from "@/data/intelligenceXPhotos";

type EventPhotoBandProps = {
  /** Band title, e.g. "Day 1 — 24 September 2026". */
  title: string;
  photos: PhotoSlide[];
};

/**
 * "Photo reel" band: a deep-navy panel with an orange PHOTOS chip, photo count
 * and a pausable marquee of thumbnails. Clicking a photo opens the full-size
 * lightbox.
 */
export function EventPhotoBand({ title, photos }: EventPhotoBandProps) {
  if (photos.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl bg-[#002a57] shadow-lg shadow-[#002a57]/20">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 pt-5 pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-[#ee7c01] px-3 text-[11px] font-bold uppercase tracking-wider text-white">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            Photos
          </span>
          <p className="truncate text-sm font-semibold text-white">{title}</p>
        </div>
        <p className="text-xs text-white/60">
          {photos.length} {photos.length === 1 ? "photo" : "photos"} · click to enlarge
        </p>
      </div>
      <div className="pb-5">
        <Gallery
          images={photos}
          edge="navy"
          pauseOnHover
          speedMs={gallerySpeed(photos.length)}
          tileClassName="border-white/15 shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
