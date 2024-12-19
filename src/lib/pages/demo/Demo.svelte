<!-- src/lib/pages/demo/Demo.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { demoStore } from '$lib/stores/demoStore';
  import Blurbs from "./Blurbs.svelte";
  import ProductBlurbs from './ProductBlurbs.svelte';
  import ZigZag from "./ZigZag.svelte";
  import Testimonials from "./Testimonials.svelte";
  import CTA from "./CTA.svelte";

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

  // Helper function to update store content
  function updateContent(path: string[], value: string) {
    demoStore.updateContent(path, value);
  }
</script>

<div class="space-y-6">
  <ZigZag
    visible={$demoStore.visibleSections.zigZagLeft}
    direction="left"
    bind:this={sections.zigZagLeft}
    heading={$demoStore.content.zigzags.left.heading}
    subheading={$demoStore.content.zigzags.left.subheading}
    description={$demoStore.content.zigzags.left.description}
    onUpdate={(field, value) => updateContent(['zigzags', 'left', field], value)}
  />

  <ProductBlurbs
    visible={$demoStore.visibleSections.productFeatures}
    bind:this={sections.productFeatures}
    features={$demoStore.content.products.features}
    onUpdate={(idx, field, value) => updateContent(['products', 'features', idx.toString(), field], value)}
  />

  {#if $demoStore.visibleSections.blurbs}
    <section
      id="blurbs-section"
      bind:this={sections.blurbs}
      class="py-16 transition-all duration-700"
      class:opacity-0={!$demoStore.visibleSections.blurbs}
      class:translate-y-[20px]={!$demoStore.visibleSections.blurbs}
    >
      <Blurbs 
        visible={$demoStore.visibleSections.blurbs}
        headline={$demoStore.content.features.headline}
        blurbs={$demoStore.content.features.blurbs}
        onUpdate={(idx, field, value) => updateContent(['features', 'blurbs', idx.toString(), field], value)}
        onHeadlineUpdate={(value) => updateContent(['features', 'headline'], value)}
      />
    </section>
  {/if}

  {#if $demoStore.visibleSections.zigZagRight}
    <ZigZag
      visible={$demoStore.visibleSections.zigZagRight}
      direction="right"
      bind:this={sections.zigZagRight}
      heading={$demoStore.content.zigzags.right.heading}
      subheading={$demoStore.content.zigzags.right.subheading}
      description={$demoStore.content.zigzags.right.description}
      onUpdate={(field, value) => updateContent(['zigzags', 'right', field], value)}
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
      <Testimonials 
        visible={$demoStore.visibleSections.testimonials}
        headline={$demoStore.content.testimonials.headline}
        cards={$demoStore.content.testimonials.cards}
        onUpdate={(idx, field, value) => updateContent(['testimonials', 'cards', idx.toString(), field], value)}
        onHeadlineUpdate={(value) => updateContent(['testimonials', 'headline'], value)}
      />
    </section>
  {/if}

  <CTA 
    visible={$demoStore.visibleSections.cta}
    headline={$demoStore.content.cta.headline}
    subheading={$demoStore.content.cta.subheading}
    buttonText={$demoStore.content.cta.buttonText}
    note={$demoStore.content.cta.note}
    onUpdate={(field, value) => updateContent(['cta', field], value)}
  />
</div>