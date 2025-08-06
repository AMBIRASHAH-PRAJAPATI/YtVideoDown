<script lang="ts" module>
 import { getVideoIdFromUrl, fetchVideoDetails, downloadVideo, type VideoDetails } from '../api/youtube';
 import Popup from './Popup.svelte';
</script>
<script lang="ts">
  
    let showModal = $state(false);
    let videoDetails =  $state<VideoDetails | null>(null);
    let videoId: string | null = null;
  
    async function openModal() {
      showModal = true;
      videoId = getVideoIdFromUrl(window.location.href);
  
      if (videoId) {
        try {
          videoDetails = fetchVideoDetails(videoId);
        } catch (error) {
          console.error("Error fetching video details:", error);
        } 
      } else {
        console.error("Could not find a valid YouTube video ID.");
      }
    }
  
    function closeModal() {
      showModal = false;
      videoDetails = null;
      videoId = null;
    }
  
    function handleDownload(quality: string) {
      if (videoId) {
        downloadVideo(videoId, quality);
        closeModal();
      }
    }
  </script>
  
  <button onclick={openModal} class="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-red-600 text-white p-2 rounded-md shadow-md hover:bg-red-700 transition">
    <!-- Download icon from librery from npm -->
  </button>
  
  {#if showModal}
    <Popup  videoDetails  closeModal handleDownload/>
  {/if}