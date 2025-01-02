<!-- src/lib/pages/app/Demo.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { editorStore, visibleSections } from './stores/editorStore';
  import Dropper from './components/dropper/Dropper.svelte';
  
  // Import all section components
  import Hero from './components/sections/Hero.svelte';
  import CTA from './components/sections/CTA.svelte';
  import Testimonials from './components/sections/Testimonials.svelte';
  
  const sectionComponents = {
    hero: Hero,
    cta: CTA,
    testimonials: Testimonials,
    // Add other components as we create them
  };

  let isHeroVisible = true;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );

    const heroSection = document.querySelector('#hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  });

  function handleElementSelect(elementId: string) {
    editorStore.toggleSection(elementId, true);
    
    // Scroll to section
    setTimeout(() => {
      const section = document.getElementById(elementId);
      section?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  }
</script>

<div class="relative min-h-screen">
  <div class="space-y-24">
    {#each $visibleSections as section (section.id)}
      <div 
        id={section.id}
        class="transition-all duration-500"
      >
        <svelte:component 
          this={sectionComponents[section.type]} 
          content={section.content}
          visible={true}
        />
      </div>
    {/each}
  </div>

  <!-- Fixed Dropper -->
  <div class="fixed bottom-8 right-8 z-50">
    <div class="transition-opacity duration-200" class:opacity-0={!isHeroVisible}>
      <Dropper {handleElementSelect} />
    </div>
  </div>
</div>