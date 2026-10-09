/**
 * IntelligenceX 2026 event photo data (shared by the main event page and the
 * Pre-meeting / Executive Track detail pages).
 *
 * Source photos were delivered in src/assets/IntelligenceX/pictures (originals,
 * not committed) and optimised into:
 *   src/assets/IntelligenceX/gallery/<group>/*.jpg          web  (long edge 1920)
 *   src/assets/IntelligenceX/gallery/<group>/thumbs/*.jpg   marquee thumbnails (long edge 680)
 */

export type PhotoSlide = { src: string; thumb: string; alt: string; caption: string };

type GlobeMap = Record<string, { default: string }>;

const preMeetingWeb = import.meta.glob("/src/assets/IntelligenceX/gallery/pre-meeting/*.jpg", { eager: true }) as GlobeMap;
const preMeetingThumbs = import.meta.glob("/src/assets/IntelligenceX/gallery/pre-meeting/thumbs/*.jpg", { eager: true }) as GlobeMap;
const executiveTrackWeb = import.meta.glob("/src/assets/IntelligenceX/gallery/executive-track/*.jpg", { eager: true }) as GlobeMap;
const executiveTrackThumbs = import.meta.glob("/src/assets/IntelligenceX/gallery/executive-track/thumbs/*.jpg", { eager: true }) as GlobeMap;
const mainConferenceWeb = import.meta.glob("/src/assets/IntelligenceX/gallery/main-conference/*.jpg", { eager: true }) as GlobeMap;
const mainConferenceThumbs = import.meta.glob("/src/assets/IntelligenceX/gallery/main-conference/thumbs/*.jpg", { eager: true }) as GlobeMap;

const gallerySlides = (web: GlobeMap, thumbs: GlobeMap, caption: string, altBase: string): PhotoSlide[] => {
  const keys = Object.keys(web).sort();
  return keys.map((key, index) => {
    const file = key.slice(key.lastIndexOf("/") + 1);
    const dir = key.slice(0, key.lastIndexOf("/"));
    const thumb = thumbs[`${dir}/thumbs/${file}`];
    return {
      src: web[key].default,
      thumb: thumb?.default ?? web[key].default,
      alt: `${altBase} (${index + 1} of ${keys.length})`,
      caption,
    };
  });
};

const pickDay = (map: GlobeMap, day: number): GlobeMap =>
  Object.fromEntries(Object.entries(map).filter(([key]) => key.includes(`Day${day}_`)));

export const preMeetingPhotos = gallerySlides(
  preMeetingWeb,
  preMeetingThumbs,
  "Switzerland–Singapore AI & Quantum Pre-meeting · 10 September 2026",
  "Pre-meeting photo",
);

export const executiveTrackPhotos = gallerySlides(
  executiveTrackWeb,
  executiveTrackThumbs,
  "IntelligenceX 2026 Executive Track · 28 September 2026",
  "Executive Track photo",
);

export const conferenceDayGalleries = (
  [
    { day: 1, date: "24" },
    { day: 2, date: "25" },
    { day: 3, date: "26" },
  ] as const
).map(({ day, date }) => {
  const photos = gallerySlides(
    pickDay(mainConferenceWeb, day),
    pickDay(mainConferenceThumbs, day),
    `IntelligenceX 2026 · Day ${day} — ${date} September 2026`,
    `IntelligenceX 2026 Day ${day} photo`,
  );
  return { day, title: `Day ${day} — ${date} September 2026`, photos };
});

/** Marquee duration scales with the number of photos so the strip speed feels constant. */
export const gallerySpeed = (count: number) => Math.max(26000, count * 4600);
