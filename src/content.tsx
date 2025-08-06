import ContentPage from "./content/ContentPgae.svelte";

const root = document.createElement("div");
root.id = "__youtube_video_download";
document.body.append(root);

new ContentPage({
  target: root,
});
