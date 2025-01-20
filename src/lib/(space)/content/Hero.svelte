<!-- src/lib/(space)/content/Hero.svelte -->
<script lang="ts">
  import { Send } from "lucide-svelte";
  import SpaceButton from "../components/cta/SpaceButton.svelte";
</script>

<div class="flex flex-col">
  <h1 class="text-5xl md:text-6xl lg:text-7xl font-regular leading-[1.1] tracking-tight mb-6">
    Landing Pages for the 
    Space Age
  </h1>

  <p class="text-xl text-muted-foreground mb-8 leading-relaxed max-w-[40ch]">
    Website redesigns for space startups. Full-airspeed conversion + UX, delivered in your code stack.
  </p>

  <!-- Button Container -->
  <div class="w-full md:w-fit">
    <SpaceButton size="md" text="Book Chute Repack" />
  </div>
</div>