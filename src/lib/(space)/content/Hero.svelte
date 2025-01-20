<!-- src/lib/(space)/content/Hero.svelte -->
<script lang="ts">
  import { Send } from "lucide-svelte";
  import SpaceButton from "../components/cta/SpaceButton.svelte";
</script>

<div class="flex flex-col">
  <!-- Chute Repack Pill -->
  <div class="inline-flex items-center gap-1.5 px-3 py-1 w-fit
              rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
    <Send class="w-4 h-4" />
    <span class="text-xl font-medium">Space Edition</span>
  </div>

  <h1 class="text-5xl md:text-6xl lg:text-7xl font-regular leading-[1.1] tracking-tight mb-6">
    Landing Pages<br/>
    for the<br/>
    Space Age
  </h1>

  <p class="text-xl text-muted-foreground mb-8 leading-relaxed max-w-[40ch]">
    Website redesigns for space startups. Full-airspeed conversion + UX, delivered in your code stack.
  </p>

  <!-- Button Container -->
  <div class="w-full md:w-fit">
    <SpaceButton size="lg" label="Get a Repack" />
  </div>
</div>