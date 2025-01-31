<!-- src/lib/pages/landing/sections/features/WireframesSection.svelte -->
<script lang="ts">
  import { FileText } from 'lucide-svelte';
  import DemoVideo from './DemoVideo.svelte';
  import EarlyAccessButton from '$lib/components/cta/EarlyAccessButton.svelte';
  
  export let source = "features_wireframes";
</script>

<div class="space-y-16">
  <!-- Header Row -->
  <div class="flex flex-col items-start gap-8">
    <h2 class="text-4xl md:text-5xl font-medium">
      Wireframes where you write
    </h2>
    <EarlyAccessButton {source} size="lg" text="Try in Google Docs" />
  </div>

  <!-- Content Grid -->
  <div class="grid lg:grid-cols-4 gap-16 items-start">
    <div class="space-y-6">
      <div class="inline-flex items-center justify-center w-16 h-16 
                  rounded-full bg-primary bg-opacity-10">
        <FileText class="w-8 h-8 text-primary" />
      </div>
      
      <p class="text-xl text-muted-foreground">
        Build website layouts right in Google Docs. No switching apps, 
        no learning curve - just write and watch your ideas take shape.
      </p>
    </div>

    <div class="lg:col-span-3">
      <DemoVideo />
    </div>
  </div>
</div>