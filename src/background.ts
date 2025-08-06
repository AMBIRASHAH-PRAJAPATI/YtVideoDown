import * as ytdl from "ytdl-core";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "downloadVideo") {
    const { videoId, quality } = request;
    try {
      const info = await ytdl.getInfo(videoId);
      const format = ytdl.chooseFormat(info.formats, { quality: quality });
      if (format) {
        chrome.downloads.download({
          url: format.url,
          filename: `${info.videoDetails.title}.${format.container}`,
          conflictAction: "uniquify",
        });
      } else {
        console.error("No format found for the selected quality.");
      }
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  }
});
