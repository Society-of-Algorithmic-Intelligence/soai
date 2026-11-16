export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@SoAI-org";

export type RecordingKind = "Panel Discussion" | "Talk";

export type Recording = {
  /** YouTube video ID. */
  id: string;
  title: string;
  speaker: string;
  duration: string;
  kind: RecordingKind;
};

/**
 * Recordings published on the SoAI YouTube channel.
 * The channel currently hosts these six IntelligenceX 2026 sessions.
 */
export const recordings: Recording[] = [
  {
    id: "tE3lJnkKhEs",
    title: "Research, Education, and Talent for the Intelligence Era",
    speaker: "Panel discussion",
    duration: "48:15",
    kind: "Panel Discussion",
  },
  {
    id: "Lr7VF16H0vQ",
    title: "Quantum × AI for Healthcare and Life Sciences",
    speaker: "Panel discussion",
    duration: "56:29",
    kind: "Panel Discussion",
  },
  {
    id: "4qhtU396mYs",
    title: "Signature-based Time Series Statistical Analysis",
    speaker: "Xin Guo · UC Berkeley",
    duration: "43:57",
    kind: "Talk",
  },
  {
    id: "BLiU1JFtvlA",
    title: "Utility-Scale Quantum–HPC Hybrid Computing",
    speaker: "Mitsuhisa Sato · RIKEN",
    duration: "48:49",
    kind: "Talk",
  },
  {
    id: "m_kWHcbnEQA",
    title: "Classification and Quantum",
    speaker: "José Ignacio Latorre · CQT",
    duration: "53:15",
    kind: "Talk",
  },
  {
    id: "f6qDzN7-ziw",
    title: "Towards Practical Quantum Advantage",
    speaker: "Stefan Wörner · IBM",
    duration: "45:27",
    kind: "Talk",
  },
];

/** hqdefault always exists for public videos, so thumbnails never 404. */
export function recordingThumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function recordingWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}
