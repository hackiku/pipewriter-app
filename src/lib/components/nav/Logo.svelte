<!-- src/lib/components/nav/Logo.svelte -->
<script lang="ts">
  import { PenTool } from "lucide-svelte";
  import { Badge } from "$lib/components/ui/badge";
</script>

<a href="/" class="relative flex items-center gap-2 group">
  <div class="flex items-center gap-1.5 relative z-10">
    <div class="relative w-5 h-5 ">
      <PenTool 
        class="absolute w-full h-full inset-0 transition-all duration-300 -rotate-90
               group-hover:opacity-0 group-hover:-translate-y-1" 
      />
      <PenTool 
        class="absolute w-full h-full inset-0 transition-all duration-300 -rotate-[80deg]
               opacity-0 translate-y-1
               group-hover:opacity-100 group-hover:translate-y-0" 
      />
    </div>
    
    <span 
      class="text-lg font-semibold transition-all duration-300
             group-hover:text-transparent group-hover:bg-clip-text 
             group-hover:bg-gradient-to-r group-hover:from-[#3644FE] group-hover:to-[#B345ED]"
    >
      Pipewriter
    </span>
  </div>
  
  <Badge 
    variant="outline" 
    class="font-normal transition-all duration-300
           group-hover:border-[#3644FE]/30 group-hover:text-[#3644FE]
           dark:group-hover:border-[#B345ED]/30 dark:group-hover:text-[#B345ED]"
  >
    beta
  </Badge>
</a>