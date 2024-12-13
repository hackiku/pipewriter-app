<!-- $lib/pages/about/Founder.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink, Linkedin, Rocket, Pen } from "lucide-svelte";
	import ContactButton from "$lib/components/ContactButton.svelte";
	import ContactModal from "$lib/components/ContactModal.svelte";

	let showContactModal = false;

</script>

<section class="container py-24 border-t overflow-visible">
  <div class="grid lg:grid-cols-2 gap-16 items-center">
    <!-- Image Stack -->
    <div class="relative min-h-[400px] md:min-h-[500px]">
      <!-- Background decorative element -->
      <div class="absolute inset-0 bg-muted/30 rounded-2xl rotate-3" />
      
      <!-- Main image -->
      <div class="absolute top-4 -left-2 md:top-8 md:-left-4 w-4/5 aspect-square">
        <div class="relative w-full h-full -rotate-3 shadow-xl">
          <img 
            src="/api/placeholder/400/400"
            alt="Ivan Karaman"
            class="w-full h-full object-cover rounded-2xl bg-muted"
          />
        </div>
      </div>
      
      <!-- Kermit image -->
      <div class="absolute bottom-4 -right-2 md:bottom-8 md:-right-4 w-3/5 aspect-square">
        <div class="relative w-full h-full rotate-3 shadow-xl">
          <img 
            src="images/gifs/kermit-typewriter.webp"
            alt="Kermit typing furiously"
            class="w-full h-full object-cover rounded-2xl bg-muted"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-8">
      <div class="space-y-3">
        <h2 class="text-3xl font-bold">Ivan Karaman</h2>
        <p class="text-lg text-primary font-medium">Copywriter turned Dev</p>
      </div>

      <div class="space-y-4 text-muted-foreground">
        <p>
          After 8 years crafting copy for top SaaS companies (including Global 500 and YC alumni), 
          I found myself naturally evolving into product design. Words shape experiences, and great UX 
          starts with clear writing.
        </p>
        <p>
          Currently pushing the boundaries of UX in aerospace through jzro.co boutique agency, 
          while building tools that help other writers work better. Because when writers thrive, 
          products become more human.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 pt-4">
        <Button asChild variant="outline" class="gap-2">
          <a 
            href="https://linkedin.com/in/jzro" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Linkedin class="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        </Button>
        
        <Button asChild variant="outline" class="gap-2">
          <a 
            href="https://jzro.co" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Rocket class="h-4 w-4" />
            <span>Agency Work</span>
          </a>
        </Button>

        <Button asChild variant="outline" class="gap-2">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Pen class="h-4 w-4" />
            <span>Writing Portfolio</span>
          </a>
        </Button>
      </div>
		<ContactButton 
			size="lg" 
			on:openContact={() => showContactModal = true} 
		/>
    </div>
  </div>
</section>

<style>
  /* Optional: Add subtle parallax effect on image stack */
  @media (min-width: 1024px) {
    .relative {
      perspective: 1000px;
    }
    img {
      transition: transform 0.3s ease-out;
    }
    .relative:hover img:first-child {
      transform: translateZ(20px);
    }
    .relative:hover img:last-child {
      transform: translateZ(40px);
    }
  }
</style>