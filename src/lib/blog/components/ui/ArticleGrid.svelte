<!-- lib/blog/components/ui/ArticleGrid.svelte -->
<script lang="ts">
  import { 
    ToggleGroup, 
    ToggleGroupItem 
  } from "$lib/components/ui/toggle-group";
  import { Grid2x2, Grid3x3, LayoutList } from "lucide-svelte";
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
  
  $: gridClass = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[$columns];
</script>

<div class="space-y-4">
  <div class="flex justify-end">
    <ToggleGroup type="single" value={$columns} onValueChange={columns.set}>
      <ToggleGroupItem value="1" aria-label="Single column">
        <LayoutList class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="2" aria-label="Two columns">
        <Grid2x2 class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="3" aria-label="Three columns">
        <Grid3x3 class="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  </div>

  <div class="grid gap-8 {gridClass}">
    {#each posts as post (post.slug)}
      <ArticleCard {post} />
    {/each}
  </div>
</div>
