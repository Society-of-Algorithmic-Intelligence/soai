import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import {
  YOUTUBE_CHANNEL_URL,
  recordings,
  recordingThumbnailUrl,
  recordingWatchUrl,
  type Recording,
} from "@/data/recordings";

/** e.g. "4 h 56 min" — derived from the durations so it never goes stale. */
function totalDurationLabel() {
  const totalSeconds = recordings.reduce((sum, video) => {
    const [minutes, seconds] = video.duration.split(":").map(Number);
    return sum + minutes * 60 + seconds;
  }, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  return hours > 0 ? `${hours} h ${minutes} min` : `${minutes} min`;
}

function VideoCard({ video }: { video: Recording }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video bg-gray-900">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={`${video.title} | IntelligenceX 2026`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${video.title}`}
          >
            <img
              src={recordingThumbnailUrl(video.id)}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* The SoAI thumbnails already carry the session title and type, so only dim them subtly. */}
            <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/25" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#003d7b] shadow-lg transition-transform group-hover:scale-105">
              <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
            </span>
            <span className="absolute bottom-2.5 right-2.5 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
              {video.duration}
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-gray-600">{video.speaker}</p>
        <a
          href={recordingWatchUrl(video.id)}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium text-[#003d7b] hover:underline"
        >
          Watch on YouTube
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function VideoHighlights() {
  return (
    <section aria-labelledby="home-videos-heading">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#003d7b]">
            Video recordings
          </span>
          <h2 id="home-videos-heading" className="text-3xl font-bold text-gray-900">
            Watch IntelligenceX 2026
          </h2>
          <p className="text-sm text-gray-600">
            Selected keynotes and panel discussions from the inaugural conference —{" "}
            {recordings.length} sessions, {totalDurationLabel()} of recordings, now streaming on the
            SoAI YouTube channel.
          </p>
        </div>
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#003d7b] bg-white px-5 py-2.5 text-sm font-semibold text-[#003d7b] shadow-sm transition hover:bg-[#f0f6ff] sm:self-auto"
        >
          Visit our YouTube channel
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {/* Videos */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {recordings.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
