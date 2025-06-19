<!-- lib/blog/components/ui/ArticleGrid.svelte -->
<script lang="ts">
  import { 
    ToggleGroup, 
    ToggleGroupItem 
  } from "$lib/components/ui/toggle-group";
  import { Grid2x2, Grid3x3, LayoutList, Filter } from "lucide-svelte";
  import ArticleCard from "./ArticleCard.svelte";
  import type { BlogPost } from '../../types';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';

  export let posts: BlogPost[] = [];
  
  // Create a writable store for grid columns with local storage persistence
  const createLocalStore = (key: string, startValue: string) => {
    const store = writable(startValue);
    
    if (browser) {
      // Initialize from localStorage
      const saved = localStorage.getItem(key);
      if (saved) store.set(saved);
      
      // Save to localStorage on change
      store.subscribe(value => {
        localStorage.setItem(key, value);
      });
    }
    
    return store;
  };

  const columns = createLocalStore('blogGridColumns', '2');
  const selectedCategory = writable('all');
  
  $: gridClass = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2', 
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[$columns];

  // Get unique categories from posts
  $: categories = ['all', ...new Set(posts.map(post => post.category).filter(Boolean))];
  
  // Filter posts by selected category
  $: filteredPosts = $selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === $selectedCategory);
</script>

<div class="space-y-6">
  
  <!-- Filters Row -->
  <div class="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
    
    <!-- Category Filter -->
    <div class="flex items-center gap-3">
      <!-- <Filter class="w-4 h-4 text-muted-foreground" /> -->
      <div class="flex flex-wrap gap-2">
        {#each categories as category}
          <button
            class="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                   {$selectedCategory === category 
                     ? 'bg-primary text-primary-foreground shadow-md' 
                     : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'}"
            on:click={() => selectedCategory.set(category)}
          >
            {category === 'all' ? '📝 All' : `${category}`}
          </button>
        {/each}
      </div>
    </div>

    <!-- Grid Layout Selector -->
    <div class="flex items-center gap-3">
      <span class="text-sm text-muted-foreground">View:</span>
      <ToggleGroup 
        type="single" 
        value={$columns} 
        onValueChange={columns.set}
        class="bg-muted/50 p-1 rounded-xl"
      >
        <ToggleGroupItem 
          value="1" 
          aria-label="Single column"
          class="px-3 py-2 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground
                 hover:bg-background transition-all duration-200"
        >
          <LayoutList class="h-4 w-4" />
          <span class="hidden sm:inline ml-1">📄</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="2" 
          aria-label="Two columns"
          class="px-3 py-2 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground
                 hover:bg-background transition-all duration-200"
        >
          <Grid2x2 class="h-4 w-4" />
          <span class="hidden sm:inline ml-1">📰</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="3" 
          aria-label="Three columns"
          class="px-3 py-2 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground
                 hover:bg-background transition-all duration-200"
        >
          <Grid3x3 class="h-4 w-4" />
          <span class="hidden sm:inline ml-1">🗞️</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  </div>

  <!-- Posts Grid -->
  <div class="grid gap-8 {gridClass}">
    {#each filteredPosts as post (post.slug)}
      <ArticleCard {post} />
    {/each}
  </div>

  <!-- No posts message -->
  {#if filteredPosts.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">📭</div>
      <h3 class="text-xl font-medium mb-2">No posts found</h3>
      <p class="text-muted-foreground">
        Try selecting a different category or check back later!
      </p>
    </div>
  {/if}
</div>