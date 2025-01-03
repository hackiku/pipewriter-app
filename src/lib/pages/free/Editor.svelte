<!-- src/lib/pages/free/Editor.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { editorStore, visibleSections } from './stores/editorStore';
  import Dropper from './components/dropper/Dropper.svelte';
  import Section from './components/Section.svelte';
  import { elementConfig } from './config';
  
  // Import section components
  import Hero from './components/sections/Hero.svelte';
  import CTA from './components/sections/CTA.svelte';
  import Features from './components/sections/Features.svelte';
  import Testimonials from './components/sections/Testimonials.svelte';
  
  const sectionComponents = {
    hero: Hero,
    cta: CTA,
    features: Features,
    testimonials: Testimonials
  } as const;

  let isHeroVisible = true;
  
  onMount(() => {
    // Initialize with hero section
    const heroConfig = elementConfig.find(e => e.type === 'hero');
    if (heroConfig) {
      editorStore.addSection(heroConfig.id);
    }

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
    editorStore.addSection(elementId);
    
    // Scroll to new section
    setTimeout(() => {
      const section = document.getElementById(elementId);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  }
</script>

<div class="relative min-h-screen">
  <div class="space-y-24">
    {#each $visibleSections as section (section.id)}
      <Section {section}>
        <svelte:component 
          this={sectionComponents[section.type]} 
          content={$editorStore.content[section.type]}
          visible={true}
          id={`${section.id}-section`}
        />
      </Section>
    {/each}
  </div>

  <!-- Fixed Dropper -->
  <div class="fixed bottom-8 right-8 z-50">
    <div class="transition-opacity duration-200" class:opacity-0={!isHeroVisible}>
      <Dropper onSelect={handleElementSelect} />
    </div>
  </div>
</div>