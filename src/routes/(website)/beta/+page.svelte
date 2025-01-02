<!-- src/routes/beta/+page.svelte -->
<script lang="ts">
  import BackgroundPattern from "$lib/components/BackgroundPattern.svelte";
  import Hero from "$lib/pages/space/Hero.svelte";
  import { Button } from "$lib/components/ui/button";

  let currentPattern = 3;
  
  const patterns = [
    {
      size: "md",
      opacity: "high",
      gradient: true,
      name: "Production Hero",
      bg: "bg-background",
      component: Hero
    },
    {
      size: "lg",
      opacity: "medium",
      gradient: false,
      name: "Large Clean Grid",
      bg: "bg-muted"
    },
    {
      size: "sm",
      opacity: "high",
      gradient: true,
      name: "Dense Editorial",
      bg: "bg-background"
    }
  ];
</script>

<!-- Pattern Controls -->
<div class="fixed top-4 right-4 z-50 flex gap-2">
  {#each patterns as pattern, i}
    <Button 
      variant={currentPattern === i + 1 ? "default" : "outline"}
      size="sm"
      on:click={() => currentPattern = i + 1}
    >
      Pattern {i + 1}
    </Button>
  {/each}
</div>

<!-- Pattern Display -->
{#each patterns as pattern, i}
  {#if currentPattern === i + 1}
    <section class="relative min-h-screen flex items-center {pattern.bg}">
      <BackgroundPattern 
        size={pattern.size}
        opacity={pattern.opacity}
        gradient={pattern.gradient}
      />
      
      <div class="container relative z-10">
        {#if pattern.component}
          <svelte:component this={pattern.component} />
        {:else}
          <div class="max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold mb-4">{pattern.name}</h2>
            <p class="text-muted-foreground">
              Size: {pattern.size}, 
              Opacity: {pattern.opacity}, 
              Gradient: {pattern.gradient ? 'Yes' : 'No'}
            </p>
          </div>
        {/if}
      </div>
    </section>
  {/if}
{/each}