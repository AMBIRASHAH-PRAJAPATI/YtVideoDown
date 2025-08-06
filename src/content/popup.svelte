<script lang="ts" module>

</script>
<script lang="ts">
    import type { promises } from "dns";
import type { VideoDetails } from "../youtubedownloader";

    type Props = {
      videoDetails: promises<VideoDetails>;
      handleDownload: ()=> void;
      closeModal: ()=> void;
    };
    let { videoDetails, handleDownload, closeModal}: Props = $props();
  </script>


<dialog id="yt-download-modal" >
    <div class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-[10000]">
        <div class="bg-white p-8 rounded-lg shadow-xl w-96 max-w-lg text-black">
          {#await videoDetails}
          <p>Loading video details...</p>
          {:then videoDeta} 
            <h2 class="text-xl font-bold mb-4">{videoDeta.title}</h2>
            <p class="mb-4">Select a quality to download:</p>
            <div class="flex gap-2">
              {#each videoDeta.qualities as quality}
                <button on:click={() => handleDownload(quality)} class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  {quality}
                </button>
              {/each}
            </div>
            <button on:click={closeModal} class="mt-4 text-gray-500 hover:text-gray-700 transition">
              Close
            </button>
          {:else}
            <p>Unable to fetch video details.</p>
            <button onclick={closeModal} class="mt-4 text-gray-500 hover:text-gray-700 transition">
              Close
            </button>
          {/if}
        </div>
      </div>
</dialog>
<style>
</style>

{#snippet modalHeader()}
  <!-- a close (cross) btn at top right of modal below padding-2 -->
{/snippet}
