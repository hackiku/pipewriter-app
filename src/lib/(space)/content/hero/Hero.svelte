<!-- src/lib/(space)/content/hero/Hero.svelte -->
<script lang="ts">
  import { Send } from "lucide-svelte";
  import SpaceButton from "../../components/cta/SpaceButton.svelte";
</script>

<div class="h-full flex flex-col justify-start
						w-full sm:w-[55vw] md:w-[45vw] lg:w-[50vw]"
						>
  <h1 class="text-[6vh] md:text-[7vh] lg:text-[10vh] 
             font-regular leading-[1.1] tracking-tight mb-[2vh]
             ">
    Landing Pages for the 
    <span class="whitespace-nowrap">Space Age</span>
  </h1>

  <p class="text-lg sm:text-xl lg:text-[2.5vh] 
            text-muted-foreground mb-[3vh] leading-relaxed 
            max-w-[45ch]">
    Website redesigns for space startups. Full-airspeed conversion + UX, 
    delivered in your code stack.
  </p>

  <!-- Button Container -->
  <div class="w-full md:w-fit">
    <SpaceButton size="md" text="Book Chute Repack" />
  </div>
</div>