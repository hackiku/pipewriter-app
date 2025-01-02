<!-- src/lib/pages/free/Editor.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { editorStore, visibleSections } from './stores/editorStore';
  import Dropper from './components/dropper/Dropper.svelte';
  import Section from './components/Section.svelte';
  import AddSection from './components/AddSection.svelte';
  
  // Import section components
  import Hero from './components/sections/Hero.svelte';
  import CTA from './components/sections/CTA.svelte';
  import Testimonials from './components/sections/Testimonials.svelte';
  import Features from './components/sections/Features.svelte';
  
  const sectionComponents = {
    hero: Hero,
    cta: CTA,
    testimonials: Testimonials,
    features: Features
  } as const;

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
    editorStore.addSection(elementId);
    
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
    <!-- Add Section at the top -->
    <AddSection order={0} />
    
    {#each $visibleSections as section, index (section.id)}
      <Section {section}>
        <svelte:component 
          this={sectionComponents[section.type]} 
          content={$editorStore.content[section.type]}
          visible={true}
        />
        <AddSection order={index + 1} />
      </Section>
    {/each}
  </div>

  <!-- Fixed Dropper -->
  <div class="fixed bottom-8 right-8 z-50">
    <div class="transition-opacity duration-200" class:opacity-0={!isHeroVisible}>
      <Dropper {handleElementSelect} />
    </div>
  </div>
</div>