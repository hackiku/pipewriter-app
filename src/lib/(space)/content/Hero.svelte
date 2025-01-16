<!-- src/lib/pages/space/content/Hero.svelte -->
<script lang="ts">
  import { Send } from "lucide-svelte";
  import SpaceButton from "../components/cta/SpaceButton.svelte";
</script>

<section class="relative flex pt-28 md:pt-40">
  <div class="container px-4 sm:px-6 md:px-16 lg:px-24 xl:px-44">
    <div class="flex flex-col 
                sm:max-w-[85%] 
                md:max-w-[75%] 
                lg:max-w-[65%]">
      <!-- Chute Repack Pill - Add max-w to prevent stretching -->
      <div class="inline-flex items-center gap-1.5 px-3 py-1 w-fit
                  rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
        <Send class="w-4 h-4" />
        <span class="text-xl font-medium">Chute Repack</span>
      </div>

      <h1 class="text-5xl sm:text-5xl md:text-7xl font-regular leading-tight mb-6">
        Landing Pages for<br/> the Space Age
      </h1>

      <p class="text-2xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
        Website redesigns for space startups. Full-airspeed conversion + UX, delivered in your code stack.
      </p>

      <!-- Button Container - Add w-fit to prevent stretching -->
      <div class="w-full md:w-fit">
        <SpaceButton size="lg" />
      </div>
    </div>
  </div>
</section>