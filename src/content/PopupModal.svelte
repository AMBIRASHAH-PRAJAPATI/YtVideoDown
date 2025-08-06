<script lang="ts">
  import type { VideoDetails } from "../youtubedownloader";
  import { Modal, Button } from "flowbite-svelte";

  type Props = {
    videoDetails: Promise<VideoDetails | null> | null;
    handleDownload: (quality: string) => void;
    closeModal: () => void;
  };
  let { videoDetails, handleDownload, closeModal }: Props = $props();
  let qualitySelected = $state("");
</script>

<Modal
  open={videoDetails !== null}
  onclose={closeModal}
  size="sm"
  class="w-96 max-w-lg text-black bg-white rounded-lg shadow-xl"
>
  {#if videoDetails}
    {#await videoDetails}
      <p>Loading video details...</p>
    {:then videoDeta}
      {#if videoDeta}
        <h2 class="text-xl font-bold mb-4">{videoDeta.title}</h2>
        <p class="mb-4">Select a quality to download:</p>
        <div class="flex gap-2">
          {#each videoDeta.qualities as quality}
            <Button
              onclick={() => (qualitySelected = quality)}
              color="blue"
              class="px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              {quality}
            </Button>
          {/each}
        </div>
        <Button
          disabled={!qualitySelected}
          onclick={() => handleDownload(qualitySelected)}
          class="mt-4"
          color="gray"
        >
          Close
        </Button>
      {:else}
        <p>Unable to fetch video details.</p>
        <Button onclick={closeModal} class="mt-4" color="gray">Close</Button>
      {/if}
    {:catch error}
      <p>Error fetching video details.</p>
      <Button onclick={closeModal} class="mt-4" color="gray">Close</Button>
    {/await}
  {/if}
</Modal>

