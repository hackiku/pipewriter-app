<!-- lib/blog/components/ui/ArticleGrid.svelte -->
<script lang="ts">
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "$lib/components/ui/select";
  import ArticleCard from "./ArticleCard.svelte";
  import type { BlogPost } from '../../types';

  export let posts: BlogPost[] = [];
  
  let columns = "2";
</script>

<div class="space-y-8">
  <div class="flex justify-end">
    <Select bind:value={columns}>
      <SelectTrigger class="w-[180px]">
        <SelectValue placeholder="Grid Columns" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Single Column</SelectItem>
        <SelectItem value="2">Two Columns</SelectItem>
        <SelectItem value="3">Three Columns</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-{columns} gap-8">
    {#each posts as post (post.slug)}
      <ArticleCard {post} />
    {/each}
  </div>
</div>