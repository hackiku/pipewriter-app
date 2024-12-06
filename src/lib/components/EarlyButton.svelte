<!-- $lib/components/EarlyButton.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight } from "lucide-svelte";
  
  export let size: "default" | "lg" = "default";
  export let className = "";
</script>

<Button
  href="/early"
  class="relative group {size === 'lg' ? 'h-12 text-lg' : 'h-10 text-sm'} 
         px-8 font-medium rounded-lg bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
         hover:shadow-md hover:shadow-primary/10 
         transition-all duration-300 {className}"
>
  <span class="absolute inset-0 bg-gradient-to-r from-[#B345ED] to-[#3644FE] 
               opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
  />
  
  <div class="relative z-10 flex items-center justify-center w-full text-white">
    <div class="flex items-center gap-1.5 transition-transform duration-300 
                transform group-hover:-translate-x-2">
      <span>Early Access</span>
      <div class="w-4 transition-all duration-300 transform translate-x-4 
                  opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
        <ArrowRight class="w-4 h-4" />
      </div>
    </div>
  </div>
</Button>