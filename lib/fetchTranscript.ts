// lib/fetchTranscript.ts
import { Innertube } from "youtubei.js";

let youtubeClient: Innertube | null = null;

async function getYouTubeClient() {
  if (!youtubeClient) {
    youtubeClient = await Innertube.create({ lang: "en", location: "US" });
  }
  return youtubeClient;
}

export async function fetchTranscript(url: string): Promise<string> {
  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      console.error("Invalid YouTube URL, cannot extract videoId.");
      return "Transcript not available.";
    }

    const youtube = await getYouTubeClient();
    const info = await youtube.getInfo(videoId);
    const transcriptData = await info.getTranscript();

    if (!transcriptData?.transcript?.content?.body?.initial_segments) {
      return "Transcript not available.";
    }

    const lines = transcriptData.transcript.content.body.initial_segments.map(
      (segment) => segment.snippet.text
    );

    return lines.join(" ").trim();
  } catch (error) {
    console.error("Innertube Transcript Error:", error);
    return "Transcript not available.";
  }
}

function extractVideoId(url: string): string {
  const regExp = /(?:youtube\.com.*[?&]v=|youtu\.be\/)([^&\n?#]+)/i;
  const match = url.match(regExp);
  return match?.[1] ?? "";
}
