<!-- $lib/pages/demo/Demo.svelte -->
 
<script lang="ts">
  import { onMount } from 'svelte';
  import { demoStore } from '$lib/stores/demoStore';
  import { get } from 'svelte/store';
  import { initialSections, dropperToSection } from './config';
  import type { DemoSection } from './types';
  
  // Import all section components correctly
  import VideoSection from './layouts/VideoSection.svelte';
  import Blurbs from './layouts/Blurbs.svelte';
  import ProductBlurbs from './layouts/ProductBlurbs.svelte';
  import ZigZag from './layouts/ZigZag.svelte';
  import Testimonials from './layouts/Testimonials.svelte';
  import CTA from './layouts/CTA.svelte';

  // Type for the component mapping
  type SectionComponents = {
    [key: string]: any;  // or be more specific with ComponentType if needed
  };

  const sectionComponents: SectionComponents = {
    'video': VideoSection,
    'blurbs': Blurbs,
    'product-blurbs': ProductBlurbs,
    'zigzag': ZigZag,
    'testimonials': Testimonials,
    'cta': CTA
  };


  export let activeSectionId: string | null = null;


  function setupIntersectionObserver(node: HTMLElement, sectionId: string) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeSectionId = sectionId;
          // Section visibility is now handled by the store
        }
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
    const sectionConfig = dropperToSection[elementId];
    if (!sectionConfig) return;

    const $sections = get(demoStore).sections;
    const activeIndex = $sections.findIndex(s => s.id === activeSectionId);
    const insertIndex = activeIndex !== -1 ? activeIndex + 1 : $sections.length;

    // Create new section after current one
    const newSection = {
      ...initialSections.find(s => s.id === sectionConfig.id),
      visible: true,
      order: insertIndex
    };

    // Update section orders
    const updatedSections = [
      ...$sections.slice(0, insertIndex),
      newSection,
      ...$sections.slice(insertIndex).map(s => ({
        ...s,
        order: s.order + 1
      }))
    ];

    demoStore.updateSectionOrder(updatedSections);

    // Scroll after render
    setTimeout(() => {
      document.getElementById(sectionConfig.id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  }
</script>

<div class="space-y-24">
  {#each $demoStore.sections.filter(s => s.visible).sort((a, b) => a.order - b.order) as section (section.id)}
    <div 
      id={section.id}
      class="transition-all duration-500"
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