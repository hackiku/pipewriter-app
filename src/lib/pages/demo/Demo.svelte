<!-- lib/pages/demo/Demo.svelte -->
<script lang="ts">
  import { demoStore } from '$lib/stores/demoStore';
  import { get } from 'svelte/store';
  import { initialSections, dropperToSection } from './config';
  import type { DemoSection } from './types';
  import type { ComponentType } from 'svelte';
  
  // Import layout components
  import Hero from './layouts/Hero.svelte';
  import VideoSection from './layouts/VideoSection.svelte';
  import Blurbs from './layouts/Blurbs.svelte';
  import ProductBlurbs from './layouts/ProductBlurbs.svelte';
  import ZigZag from './layouts/ZigZag.svelte';
  import Testimonials from './layouts/Testimonials.svelte';
  import CTA from './layouts/CTA.svelte';

  // Map section types to their components
  const sectionComponents: Record<string, ComponentType> = {
    'hero': Hero,
    'video': VideoSection,
    'blurbs': Blurbs,
    'product-blurbs': ProductBlurbs,
    'zigzag': ZigZag,
    'testimonials': Testimonials,
    'cta': CTA
  };

  let activeSectionId: string | null = null;

  // Track which section is in view
  function setupIntersectionObserver(node: HTMLElement, sectionId: string) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeSectionId = sectionId;
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

  // Add new section after currently visible section
  export function showElement(elementId: string) {
    const sectionConfig = dropperToSection[elementId];
    if (!sectionConfig) return;

    const $sections = get(demoStore).sections;
    const currentIndex = $sections.findIndex(s => s.id === activeSectionId);
    const insertIndex = currentIndex !== -1 ? currentIndex + 1 : $sections.length;

    // Create new section with next available order
    const newSection = {
      ...initialSections.find(s => s.id === sectionConfig.id),
      visible: true,
      order: insertIndex
    };

    // Insert new section and update orders
    const updatedSections = [
      ...$sections.slice(0, insertIndex),
      newSection,
      ...$sections.slice(insertIndex).map(s => ({
        ...s,
        order: s.order + 1
      }))
    ];

    // Update store and scroll to new section
    demoStore.updateSectionOrder(updatedSections);
    setTimeout(() => {
      document.getElementById(sectionConfig.id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  }
</script>

<div class="space-y-24">
  {#each $demoStore.sections
    .filter(s => s.visible)
    .sort((a, b) => a.order - b.order) as section (section.id)}
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