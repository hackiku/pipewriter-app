<!-- src/lib/(space)/content/features/Process.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Edit, Rocket, Code } from 'lucide-svelte';
  
  let containerRef: HTMLElement;
  let visible = false;
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef);
    return () => observer.disconnect();
  });
</script>

<div class="relative bg-indigo-400/10" bind:this={containerRef}>
  <div class="lg:col-span-3 space-y-[50vh]">
    {#if visible}
      <!-- Step 1 -->
      <div in:fly={{ y: 20, duration: 400, delay: 0 }} class="relative">
        <div class="flex gap-6">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-primary/10 
                       flex items-center justify-center shrink-0
                       transition-all duration-300
                       hover:scale-110 hover:rotate-12">
              <Edit class="w-6 h-6 text-primary" />
            </div>
            <div class="absolute left-1/2 top-12 bottom-0 w-px bg-primary/20 
                      transform -translate-x-1/2" />
          </div>
          <div>
            <p class="text-2xl leading-relaxed">
              Conversion boost <span class="text-muted-foreground">with writing, UX design that speaks to users</span>
            </p>
            <ul class="mt-4 space-y-2 text-muted-foreground">
              <li>• Copywriting</li>
              <li>• Technical accuracy meets marketing impact</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div in:fly={{ y: 20, duration: 400, delay: 200 }} class="relative">
        <div class="flex gap-6">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-primary/10 
                       flex items-center justify-center shrink-0
                       transition-all duration-300
                       hover:scale-110 hover:rotate-12">
              <Rocket class="w-6 h-6 text-primary" />
            </div>
            <div class="absolute left-1/2 top-12 bottom-0 w-px bg-primary/20 
                      transform -translate-x-1/2" />
          </div>
          <div>
            <h4 class="text-2xl leading-relaxed">
              On-brand design <span class="text-muted-foreground">that feels like mission control</span>
            </h4>
            <ul class="mt-4 space-y-2 text-muted-foreground">
              <li>• Modern space aesthetic that builds trust</li>
              <li>• Responsive layouts for all device types</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Step 3 with Tab -->
      <div in:fly={{ y: 20, duration: 400, delay: 400 }} class="relative">
        <div class="flex gap-6">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-primary/10 
                       flex items-center justify-center shrink-0
                       transition-all duration-300
                       hover:scale-110 hover:rotate-12">
              <Code class="w-6 h-6 text-primary" />
            </div>
          </div>
          <div class="relative">
            <div class="absolute bottom-0 -mb-8 inset-x-0 h-32
                       bg-zinc-950/[0.05] dark:bg-white/[0.03]
                       rounded-t-[2.5rem] border-t border-x border-border/50" />
            <p class="text-2xl leading-relaxed relative">
              Your code stack <span class="text-muted-foreground">with clean components your engineers will love</span>
            </p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
<style>
  .transition-all {
    will-change: transform, opacity;
  }
</style>