<!-- src/lib/(space)/content/hero/Hero.svelte -->
<script lang="ts">
  import { Send } from "lucide-svelte";
  import SpaceButton from "../../components/cta/SpaceButton.svelte";
  import ClientAvatars from "../../components/proof/ClientAvatars.svelte";
</script>

<div class="h-full flex flex-col justify-start
						w-full sm:w-[55vw] md:w-[45vw] lg:w-[50vw]"
						>
  <h1 class="text-[7vh] md:text-[7vh] lg:text-[10vh] 
             font-medium leading-[1.1] tracking-tight mb-[2vh]
             ">
    Landing Pages for the Space Age
    <span class="whitespace-nowrap"></span>
  </h1>
<!-- text-xl sm:text-xl lg:text-[2.5vh]  -->
  <p class="text-[5vw] sm:text-[3.5vw] md:text-[2vw]
            text-muted-foreground mb-[3vh] leading-relaxed 
            max-w-[45ch]">
    Website revamps for space startups. Delivered at reentry speeds in your brand and code stack.
  </p>

  <!-- Button Container -->
  <!-- <div class="space-y-3"> -->
    <div class="flex flex-col __md:flex-row items-center w-fit gap-7">
      <SpaceButton size="md" text="Book a Chute Repack" />
			<ClientAvatars />
    </div>
    

</div>