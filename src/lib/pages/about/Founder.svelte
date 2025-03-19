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
            alt="Profile photo"
            class="w-full h-full object-cover rounded-2xl bg-muted"
          />
        </div>
      </div>
      
      <!-- Secondary image -->
      <div class="absolute bottom-4 -right-2 md:bottom-8 md:-right-4 w-3/5 aspect-square">
        <div class="relative w-full h-full rotate-3 shadow-xl">
          <img 
            src="/pages/about/kermit-typewriter.webp"
            alt="Kermit typing gif"
            class="w-full h-full object-cover rounded-2xl bg-muted"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-8">
      <div class="space-y-3">
        <h2 class="text-3xl font-bold">Hi I'm Ivan 👋</h2>
        <p class="text-lg text-primary font-medium">Copywriter turned Product Developer</p>
      </div>

      <div class="space-y-4 text-muted-foreground">
        <p>
          After 8 years crafting copy for top SaaS companies (including Global 500 and YC startups), 
          I found myself naturally evolving into product design. Because when writers thrive, 
          products become more human.
        </p>
        <p>
          This is my secret sauce from years of banging out website copy for startups and design agencies. 
          It's my collection of Google Docs scripts and snippets, cleaned up and wrapped in a modern app 
          that helps writers work better.
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
            href="/portfolio" 
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

  {#if showContactModal}
    <ContactModal 
      on:close={() => showContactModal = false} 
    />
  {/if}
</section>

<style>
  /* Optional: Smoother image hover effects */
  .relative img {
    transition: transform 0.3s ease-out;
  }
  @media (min-width: 1024px) {
    .relative:hover img:first-child {
      transform: scale(1.02) rotate(-1deg);
    }
    .relative:hover img:last-child {
      transform: scale(1.02) rotate(5deg);
    }
  }
</style>