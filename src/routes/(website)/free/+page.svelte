<!-- src/routes/free/+page.svelte -->
<script lang="ts">
  // import FreeDemo from "$lib/pages/free/FreeDemo.svelte";
  import Editor from "$lib/pages/free/Editor.svelte";
</script>

<div class="flex flex-col min-h-screen">
  <main class="flex-grow px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <section class="pb-32">
      <Editor />
    </section>
  </main>
</div> 