<!-- src/lib/pages/free/Editor.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { contentStore } from './stores/contentStore';
  import { editorStore, visibleSections } from './stores/editorStore';
  import { elementConfig, defaultVisibleSections } from './config';
  
  // Core layout components
  import Dropper from './components/dropper/Dropper.svelte';
  import DropperWrapper from './components/dropper/DropperWrapper.svelte';
  import Section from './components/Section.svelte';
  import AddSection from './components/AddSection.svelte';
  
  // Section components
  import Hero from './components/sections/Hero.svelte';
  import ZigzagLeft from './components/sections/ZigzagLeft.svelte';
  import ZigzagRight from './components/sections/ZigzagRight.svelte';
  import Features from './components/sections/Features.svelte';
  import VideoSection from './components/sections/VideoSection.svelte';
  import CTA from './components/sections/CTA.svelte';
  import Testimonials from './components/sections/Testimonials.svelte';
  
  // Define available section components
  const sectionComponents = {
    hero: Hero,
    'zigzag-right': ZigzagRight,  
    'zigzag-left': ZigzagLeft,  
    features: Features,
    video: VideoSection,
    cta: CTA,
    testimonials: Testimonials,
    media: Features,  // Fallback to Features for now
    social: Testimonials  // Fallback to Testimonials for now
  } as const;

  // Tracks hero section visibility for dropper animation
  let isHeroVisible = true;
  
  onMount(() => {
    // Initialize default sections on page load
    defaultVisibleSections.forEach(sectionId => {
      const config = elementConfig.find(e => e.id === sectionId);
      if (config) {
        editorStore.addSection(config.id);
      }
    });

    // Setup intersection observer for hero section
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

  // Handler for adding new sections
  function handleElementSelect(elementId: string) {
    editorStore.addSection(elementId);
    
    // Scroll to newly added section
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

  // Handle "Add Section" button click
  function handleAddSectionClick() {
    isHeroVisible = false; // Show dropper menu
  }
</script>

<div class="relative min-h-screen overflow-x-hidden">
  <!-- Main content area -->
  <div class="max-w-screen-2xl mx-auto">
    <!-- Sections container with consistent spacing -->
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

    <!-- Add Section button -->
    {#if $visibleSections.length}
      <AddSection 
        order={$visibleSections.length} 
        on:click={handleAddSectionClick}
      />
    {/if}
  </div>

  <!-- Dropper UI with wrapper -->
  <DropperWrapper>
    <div 
      class="transition-opacity duration-200" 
      class:opacity-0={!isHeroVisible}
    >
      <Dropper {handleElementSelect} />
    </div>
  </DropperWrapper>
</div>

<style>
  /* Prevent horizontal scroll */
  body {
    overflow-x: hidden;
  }
  
  /* Enable smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
</style>