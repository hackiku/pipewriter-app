<!-- src/lib/pages/free/Editor.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { contentStore } from './stores/contentStore';
  import { editorStore, visibleSections } from './stores/editorStore';
  import Dropper from './components/dropper/Dropper.svelte';
  import DropperWrapper from './components/dropper/DropperWrapper.svelte';
  import Section from './components/Section.svelte';
  import AddSection from './components/AddSection.svelte';
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
      const section = document.getElementById(`${elementId}-section`);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  }

  function handleAddSectionClick() {
    // Make dropper visible when Add Section is clicked
    isHeroVisible = false;
  }
</script>

<div class="relative min-h-screen overflow-x-hidden">
  <!-- Main content area with max-width constraint -->
  <div class="max-w-screen-2xl mx-auto">
    <!-- Sections with consistent spacing -->
    <div class="space-y-24 md:space-y-32 pt-44">
      {#each $visibleSections as section (section.id)}
        <Section {section}>
          <svelte:component 
            this={sectionComponents[section.type]} 
            visible={true}
            id={`${section.id}-section`}
          />
        </Section>
      {/each}
    </div>

    <!-- Add Section Button -->
    {#if $visibleSections.length}
      <AddSection 
        order={$visibleSections.length} 
        on:click={handleAddSectionClick}
      />
    {/if}
  </div>

  <!-- Dropper with wrapper -->
  <DropperWrapper>
    <div class="transition-opacity duration-200" class:opacity-0={!isHeroVisible}>
      <Dropper {handleElementSelect} />
    </div>
  </DropperWrapper>
</div>

<style>
  :global(body) {
    overflow-x: hidden;
  }
  
  :global(html) {
    scroll-behavior: smooth;
  }
</style>