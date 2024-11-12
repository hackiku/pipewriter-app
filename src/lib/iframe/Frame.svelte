<!-- $lib/iframe/Frame.svelte -->
<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import * as Resizable from "$lib/components/ui/resizable";

  import TopBar from "./layout/TopBar.svelte";
  import Dropper from "./features/Dropper.svelte";
  // import Tabs from "./layout/Tabs.svelte";
  import Tabs from "./features/Tabs.svelte";
  import BottomBar from "./layout/BottomBar.svelte";
  import AppAbout from "./layout/AppAbout.svelte";
  
  import { zenMode } from "./stores";
  import { showAboutModal } from "./stores/aboutStore";
</script>

<main class="flex flex-col h-[95vh] overflow-hidden">
  
	<section class="flex-none px-2">
    <TopBar />
  </section>
	<hr />

  <div class="flex-1 overflow-hidden">
    <Resizable.PaneGroup direction="vertical" class="h-full">
      <Resizable.Pane defaultSize={65} minSize={30} maxSize={88}>
        <Dropper />
      </Resizable.Pane>

      <Resizable.Handle withHandle />

      <Resizable.Pane defaultSize={35} />
    </Resizable.PaneGroup>
  </div>

  {#if !$zenMode}
	<!-- class="fixed bottom-0 w-[16.8rem] flex-none px-2" -->
    <section
      class="fixed bottom-0 w-full XXw-[16.8rem] flex-none px-2"
      in:fade={{ duration: 200 }}
      out:slide={{ duration: 200, axis: "y" }}
    >
      <div class="mb-2">
        <Tabs />
      </div>
      {#if $showAboutModal}
        <AppAbout />
      {/if}
      <div class="border-t border-gray-200 dark:border-gray-700">
        <BottomBar />
      </div>
    </section>
  {/if}
</main>