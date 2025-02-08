<!-- src/lib/components/cta/pricing/Compare.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ChevronDown } from "lucide-svelte";
  import { slide } from "svelte/transition";
	import CompareTable from "$lib/components/cta/pricing/compare/CompareTable.svelte";
  import { featureCategories, PREVIEW_ROWS } from "$data/pricing/comparison";

  let showComparison = false;

  $: visibleCategories = showComparison
    ? featureCategories
    : [
        {
          ...featureCategories[0],
          features: featureCategories[0].features.slice(0, PREVIEW_ROWS),
        },
      ];
</script>

<div class="relative">
  <!-- Comparison Header -->
  <div class="text-center my-12">
    <h2
      class="text-[4vh] sm:text-[5vh] font-medium leading-[1.1] tracking-tight
             max-w-[16ch] mx-auto"
    >
      Compare All Features
    </h2>
  </div>
  
  <!-- Comparison Table -->
  <div class="relative">
    <div
      class="-mx-4 sm:-mx-6 md:-mx-12 lg:-mx-16 xl:-mx-24 2xl:-mx-32
              overflow-x-auto scrollbar-thin scrollbar-thumb-border"
    >
      <div
        class="min-w-[800px] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32"
      >
        <CompareTable categories={visibleCategories} />
      </div>
    </div>

    <!-- Gradient Overlay & Show More -->
    {#if !showComparison}
      <div class="relative pt-16">
        <div
          class="absolute inset-x-0 top-0 h-24 bg-gradient-to-t from-transparent to-background"
        />
        <div class="absolute inset-x-0 bottom-0">
          <div class="flex justify-center">
            <Button
              variant="ghost"
              size="lg"
              class="gap-2"
              on:click={() => (showComparison = true)}
            >
              <span>Compare all features</span>
              <ChevronDown class="transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>