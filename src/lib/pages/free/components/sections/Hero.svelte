<!-- src/lib/pages/free/components/sections/Hero.svelte -->

<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Editable, Styles } from '../editor';
  
  export let content: {
    eyebrow: string;
    headline: string;
  };
  export let visible = true;
</script>

{#if visible}
<section 
  class="pt-20 lg:pt-40 min-h-[calc(100vh-5rem)]"
  in:fade={{ duration: 300 }}
>
  <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
    <div class="lg:w-[45%]">
      <Styles sectionId="hero">
        <div class="flex flex-col items-start space-y-4 md:w-3/4 lg:w-[45vw]">          
          <Editable
            path={['hero', 'CTA']}
            value={content.headline}
            class="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
          />
        </div>
      </Styles>
    </div>
  </div>
</section>
{/if}