/// <reference types="chrome" />
import * as ytdl from "ytdl-core";

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
    const qualities = info.formats
      .filter((format) => format.qualityLabel)
      .map((format) => format.qualityLabel!)
      .filter((value, index, self) => self.indexOf(value) === index);
    const videoDetails = {
      title: info.videoDetails.title,
      qualities: qualities as string[],
    };
    return videoDetails;
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}

export function downloadVideo(videoId: string, quality: string) {
  chrome.runtime.sendMessage({
    action: "downloadVideo",
    videoId: videoId,
    quality: quality,
  });
}
