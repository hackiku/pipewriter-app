<!-- $lib/components/cta/contact/ContactButton.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { MessageSquare } from "lucide-svelte";
  import { createEventDispatcher } from 'svelte';
  
  export let size: "default" | "lg" = "default";
  export let className = "";

  const dispatch = createEventDispatcher();
</script>

<Button
  on:click={() => dispatch('openContact')}
  class="relative group overflow-hidden {size === 'lg' ? 'h-12 text-lg' : 'h-10 text-sm'} 
         px-8 font-medium rounded-lg bg-gradient-to-r from-[#22c55e] to-[#10b981] 
         hover:shadow-md hover:shadow-primary/10 
         transition-all duration-300 {className}"
>
  <span class="absolute inset-0 bg-gradient-to-r from-[#10b981] to-[#22c55e] 
               opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
  />
  
  <div class="relative z-10 flex items-center justify-center text-white">
    <div class="flex items-center gap-1.5 ml-3">
      <span class="transform transition-transform duration-300 group-hover:-translate-x-2">Contact Us</span>
      <MessageSquare class="w-4 h-4 transform transition-all duration-300 
                         translate-x-4 opacity-0 
                         group-hover:translate-x-0 group-hover:opacity-100" />
    </div>
  </div>
</Button>