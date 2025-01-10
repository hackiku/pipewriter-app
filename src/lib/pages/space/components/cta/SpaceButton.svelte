<!-- src/lib/components/cta/SpaceButton.svelte -->
<script lang="ts">
  import { Rocket } from "lucide-svelte";
  import { cn } from '$lib/utils';
  import { spaceDrawerStore } from '$lib/stores/spaceDrawerStore';
  
  export let size: "default" | "lg" = "default";
	export let text = "Get a Repack";
	export let className = "";
  export let fullWidth = false;
  export let source = "default";
  
  function handleClick() {
    spaceDrawerStore.open(source);
  }
</script>

<button
  class={cn(
    "relative group overflow-hidden inline-flex items-center justify-center",
    "font-normal rounded-lg",
    "bg-gradient-to-r from-indigo-600 to-purple-600",
    size === "lg" ? "h-12 text-lg px-8" : "h-10 text-base px-6",
    fullWidth ? "w-full max-w-md" : "w-auto",
    "shadow-[4px_4px_0px_0px_rgba(79,70,229,0.4)]",
    "hover:shadow-none",
    "hover:translate-x-[4px] hover:translate-y-[4px]",
    "hover:ring-2 hover:ring-purple-500/30",
    "dark:shadow-[4px_4px_0px_0px_rgba(139,92,246,0.3)]",
    "transition-all duration-200",
    className
  )}
  on:click|preventDefault|stopPropagation={handleClick}
>
  <span 
    class="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 
           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  />
  
  <div class="relative z-10 flex items-center justify-center text-white w-full">
    <div class="relative flex items-center justify-center w-full gap-0 group-hover:gap-3 transition-all duration-300">
      <span class="transition-all duration-300 translate-x-2 group-hover:-translate-x-2">
				{text}
      </span>
      <Rocket 
        class="w-4 h-4 transform transition-all duration-300 
               translate-x-[-8px] translate-y-8 opacity-0
               group-hover:translate-x-2 group-hover:translate-y-0 group-hover:opacity-100" 
      />
    </div>
  </div>
</button>

