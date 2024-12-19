<!-- lib/pages/demo/Demo.svelte -->
<script lang="ts">
  import { writable } from 'svelte/store';
  import { initialSections, dropperToSection } from './config';
  import type { DemoSection } from './types';
  
  // Import all section components
  import VideoSection from './sections/VideoSection.svelte';
  import ProductBlurbs from './ProductBlurbs.svelte';
  import ZigZag from './ZigZag.svelte';
  import Blurbs from './Blurbs.svelte';
  import Testimonials from './Testimonials.svelte';
  import CTA from './CTA.svelte';

  const sections = writable<DemoSection[]>(initialSections);
  
  const sectionComponents = {
    'video': VideoSection,
    'product-blurbs': ProductBlurbs,
    'zigzag': ZigZag,
    'blurbs': Blurbs,
    'testimonials': Testimonials,
    'cta': CTA
  };

  export function showElement(elementId: string) {
    const sectionConfig = dropperToSection[elementId];
    if (sectionConfig) {
      sections.update(currentSections => {
        const sectionIndex = currentSections.findIndex(s => s.id === sectionConfig.id);
        if (sectionIndex !== -1) {
          currentSections[sectionIndex].visible = true;
        }
        return [...currentSections];
      });
    }
  }
</script>

<div class="space-y-24">
  {#each $sections.filter(s => s.visible).sort((a, b) => a.order - b.order) as section (section.id)}
    <div 
      class="transition-all duration-500"
      class:opacity-0={!section.visible}
      class:translate-y-[20px]={!section.visible}
    >
      <svelte:component 
        this={sectionComponents[section.type]} 
        {...section.props}
        visible={true}
      />
    </div>
  {/each}
</div>