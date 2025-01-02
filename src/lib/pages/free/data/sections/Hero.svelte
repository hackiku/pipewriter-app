<!-- src/lib/pages/app/components/sections/Hero.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import EditableField from '../editor/EditableField.svelte';
  
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
      <div class="flex flex-col items-start space-y-4 md:w-3/4 lg:w-[45vw]">
        <EditableField
          sectionId="hero"
          fieldId="eyebrow"
          value={content.eyebrow}
          className="text-sm font-medium text-primary"
        />
        
        <EditableField
          sectionId="hero"
          fieldId="headline"
          value={content.headline}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
        />
      </div>
    </div>
  </div>
</section>
{/if}