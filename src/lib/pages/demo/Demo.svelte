<!-- src/lib/pages/demo/Demo.svelte -->

<script lang="ts">
  import { onMount } from "svelte";
  import { demoStore } from '$lib/stores/demoStore';
  import Blurbs from "./Blurbs.svelte";
  import ProductBlurbs from './ProductBlurbs.svelte';
  import ZigZag from "./ZigZag.svelte";
  import Testimonials from "./Testimonials.svelte";
  import CTA from "./CTA.svelte";

  // Reference sections for scrolling
  let sections: Record<string, HTMLElement> = {};

  onMount(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id.replace('-section', '') as keyof typeof $demoStore.visibleSections;
          demoStore.showSection(sectionName);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
      rootMargin: "50px",
    });

    // Only observe sections that exist
    setTimeout(() => {
      Object.entries(sections).forEach(([key, el]) => {
        if (el && document.body.contains(el)) {
          observer.observe(el);
        }
      });
    }, 0);

    return () => observer.disconnect();
  });

  export function showElement(elementId: string) {
    const sectionMap = {
      'blurbs-3': 'blurbs',
      'zz-left': 'zigZagLeft',
      'zz-right': 'zigZagRight',
    };

    const sectionName = sectionMap[elementId];
    if (sectionName) {
      demoStore.showSection(sectionName);
      requestAnimationFrame(() => {
        if (sections[sectionName]) {
          sections[sectionName].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    }
  }
</script>

<div class="space-y-6">
  <ZigZag
    visible={$demoStore.visibleSections.zigZagLeft}
    direction="left"
    bind:this={sections.zigZagLeft}
    {...$demoStore.content.zigzags.left}
  />

  <ProductBlurbs
    visible={$demoStore.visibleSections.productFeatures}
    bind:this={sections.productFeatures}
  />

  {#if $demoStore.visibleSections.blurbs}
    <section
      id="blurbs-section"
      bind:this={sections.blurbs}
      class="py-16 transition-all duration-700"
      class:opacity-0={!$demoStore.visibleSections.blurbs}
      class:translate-y-[20px]={!$demoStore.visibleSections.blurbs}
    >
      <Blurbs visible={$demoStore.visibleSections.blurbs} />
    </section>
  {/if}

  {#if $demoStore.visibleSections.zigZagRight}
    <ZigZag
      visible={$demoStore.visibleSections.zigZagRight}
      direction="right"
      bind:this={sections.zigZagRight}
      {...$demoStore.content.zigzags.right}
    />
  {/if}

  {#if $demoStore.visibleSections.testimonials}
    <section
      id="testimonials-section"
      bind:this={sections.testimonials}
      class="transition-all duration-700"
      class:opacity-0={!$demoStore.visibleSections.testimonials}
      class:translate-y-[20px]={!$demoStore.visibleSections.testimonials}
    >
      <Testimonials visible={$demoStore.visibleSections.testimonials} />
    </section>
  {/if}

  <CTA visible={$demoStore.visibleSections.cta} />
</div>