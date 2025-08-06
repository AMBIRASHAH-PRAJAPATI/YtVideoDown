import * as ytdl from "ytdl-core";
import { createWriteStream } from "fs";

export type VideoDetails = {
  title: string;
  qualities: string[];
};

export function getVideoIdFromUrl(url: string): string | null {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("v");
}

export async function fetchVideoDetails(
  videoId: string,
): Promise<VideoDetails | null> {
  try {
    const info = await ytdl.getInfo(videoId);
    const videoDetails = {
      title: info.videoDetails.title,
      qualities: info.formats
        .map((format) => format.qualityLabel)
        .filter(Boolean) as string[],
    };
    return videoDetails;
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}

export function downloadVideo(videoId: string, quality: string) {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const video = ytdl(url, { quality: quality });

  // Example of saving to a file. In a browser extension, you would use the downloads API.
  video.pipe(createWriteStream("video.mp4"));
}
