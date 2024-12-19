<!-- lib/pages/demo/Demo.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { demoStore } from '$lib/stores/demoStore';
  import { initialSections, dropperToSection } from './config';
  import type { DemoSection } from './types';
  
  // Import all section components
  import VideoSection from './layouts/VideoSection.svelte';
  import Blurbs from './Blurbs.svelte';
  import ProductBlurbs from './layouts/ProductBlurbs.svelte';
  import ZigZag from './layouts/ZigZag.svelte';
  import Testimonials from './layouts/Testimonials.svelte';
  import CTA from './layouts/CTA.svelte';

  // Debug mode - set to true to show all sections
  const DEBUG_MODE = false;

  const sectionComponents = {
    'video': VideoSection,
    'blurbs': Blurbs,
    'product-blurbs': ProductBlurbs,
    'zigzag': ZigZag,
    'testimonials': Testimonials,
    'cta': CTA
  };

  let activeSectionId: string | null = null;

  // Initialize with debug sections if needed
  onMount(() => {
    if (DEBUG_MODE) {
      demoStore.updateSectionOrder(initialSections.map(section => ({
        ...section,
        visible: true
      })));
    }
  });

  function setupIntersectionObserver(node: HTMLElement, sectionId: string) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSectionId = sectionId;
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  export function showElement(elementId: string) {
    if (elementId === 'hero') {
      // Special case: scroll to hero
      document.getElementById('hero-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }

    const sectionConfig = dropperToSection[elementId];
    if (!sectionConfig) return;

    const $sections = get(demoStore).sections;
    const existingSection = $sections.find(s => s.id === sectionConfig.id);
      
    if (existingSection?.visible) {
      // Section exists and is visible - scroll to it
      setTimeout(() => {
        document.getElementById(sectionConfig.id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
      return;
    }

    // Insert new section after current active section
    const activeIndex = $sections.findIndex(s => s.id === activeSectionId);
    const insertIndex = activeIndex !== -1 ? activeIndex + 1 : $sections.length;

    // Update orders
    const updatedSections = $sections.map(s => ({
      ...s,
      order: s.order >= insertIndex ? s.order + 1 : s.order
    }));

    // Find the section config from initialSections
    const newSectionConfig = initialSections.find(s => s.id === sectionConfig.id);
    if (!newSectionConfig) return;

    // Insert new section
    const newSection = {
      ...newSectionConfig,
      visible: true,
      order: insertIndex
    };

    updatedSections.splice(insertIndex, 0, newSection);
    demoStore.updateSectionOrder(updatedSections);

    // Scroll to new section after render
    setTimeout(() => {
      document.getElementById(sectionConfig.id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  }
</script>

<div class="space-y-24">
  {#each $demoStore.sections.filter(s => s.visible || DEBUG_MODE).sort((a, b) => a.order - b.order) as section (section.id)}
    <div 
      id={section.id}
      class="transition-all duration-500"
      class:opacity-0={!section.visible}
      class:translate-y-[20px]={!section.visible}
      use:setupIntersectionObserver={section.id}
    >
      <svelte:component 
        this={sectionComponents[section.type]} 
        {...section.props}
        visible={true}
      />
    </div>
  {/each}
</div>