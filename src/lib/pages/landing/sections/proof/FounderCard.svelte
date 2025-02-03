<!-- src/lib/pages/landing/sections/proof/FounderCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { CalendarDays } from "lucide-svelte";
  
  export let name = "Ivan Karaman";
  export let role = "Builder & Lead Designer";
  export let years = "10+ years designing products";
  export let imageSrc = "/avatars/ivan.png";
</script>

<div class="relative col-span-2 row-span-2 rounded-xl overflow-hidden">
  <!-- Gradient Border -->
  <div class="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-r from-[#3644FE] to-[#B345ED]">
    <!-- Content Container with Gradient Background -->
    <div class="h-full rounded-xl bg-gradient-to-r from-[#3644FE]/30 to-[#B345ED]/30 p-6 flex flex-col">
      
      <!-- Header -->
      <div class="flex items-start justify-between mb-6">
        <div class="flex items-center gap-4">
          <img
            src={imageSrc}
            alt={name}
            class="w-16 h-16 rounded-full border-2 border-white/10"
          />
          <div>
            <h3 class="text-xl font-medium">{name}</h3>
            <p class="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        <div class="flex items-center text-sm text-muted-foreground">
          <CalendarDays class="w-4 h-4 mr-2" />
          {years}
        </div>
      </div>
      
      <!-- Body -->
      <div class="mb-8 space-y-4 text-lg">
        <p>
          "I built Pipewriter because I was tired of seeing talented writers struggle with complex design tools. Your words deserve better tools."
        </p>
        <p>
          "After a decade of crafting websites for startups and agencies, I've packaged all my tricks into a simple system that just works."
        </p>
      </div>
      
      <!-- CTA -->
      <div class="mt-auto">
        <Button 
          size="lg" 
          class="w-full text-lg bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:shadow-lg hover:shadow-primary/20"
        >
          Hire {name.split(' ')[0]}
        </Button>
      </div>
    </div>
  </div>
</div>