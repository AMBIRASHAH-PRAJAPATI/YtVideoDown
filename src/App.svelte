<script lang="ts">
  import {
    getVideoIdFromUrl,
    fetchVideoDetails,
    downloadVideo,
    type VideoDetails,
  } from "./youtubedownloader";
  import PopupModal from "./content/PopupModal.svelte";
  import { Button } from "flowbite-svelte";
  import DownloadOutline from "flowbite-svelte-icons/DownloadOutline.svelte";

  let showModal = $state(false);
  let videoDetails = $state<Promise<VideoDetails | null> | null>(null);
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

<main>
  <div class="card">
    raj``
    <Button
      onclick={openModal}
      class="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-md shadow-md"
      color="red"
    >
      <DownloadOutline class="w-6 h-6" />
    </Button>

    {#if showModal}
      <PopupModal
        videoDetails={videoDetails}
        closeModal={closeModal}
        handleDownload={handleDownload}
      />
    {/if}
  </div>
</main>

<style>
</style>