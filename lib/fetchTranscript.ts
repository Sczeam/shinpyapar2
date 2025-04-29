import { YoutubeTranscript } from "youtube-transcript";

export async function fetchTranscript(url: string): Promise<string> {
  try {
    const videoId = extractVideoId(url);
    if (!videoId) {
      console.error("Invalid YouTube URL, cannot extract videoId.");
      return "Transcript not available.";
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    if (!transcript || transcript.length === 0) {
      console.error("No transcript entries found.");
      return "Transcript not available.";
    }

    const fullText = transcript.map((entry) => entry.text).join(" ");
    return fullText;
  } catch (error) {
    console.error("Transcript error:", error);
    return "Transcript not available.";
  }
}

function extractVideoId(url: string): string {
  const regExp = /(?:youtube\.com.*[?&]v=|youtu\.be\/)([^&\n?#]+)/i;
  const match = url.match(regExp);
  return match?.[1] ?? "";
}