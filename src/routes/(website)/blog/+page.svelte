<!-- src/routes/(website)/blog/+page.svelte -->
<script lang="ts">
  import BlogPage from "$lib/blog/BlogPage.svelte";
  import { posts } from "$lib/blog/posts/_posts";

  export let data;
</script>

<BlogPage {posts} />