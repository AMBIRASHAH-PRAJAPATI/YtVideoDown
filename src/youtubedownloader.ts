
export type VideoDetails = {
    title: string;
    qualities: string[];
    // or any significat required data
  };
  
  export function getVideoIdFromUrl(url: string): string | null {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  }
  
  export async function fetchVideoDetails(videoId: string) {
  
    //  use extrnal package for this
  }
  
  export function downloadVideo(videoId: string, quality: string) {
    // from api like yt-core etc get download link and with help of window donload the video
  }