<!-- src/routes/(website)/blog/+page.svelte -->
<script lang="ts">
  import BlogPage from "$lib/blog/BlogPage.svelte";

  export let data;
</script>

<BlogPage posts={data.posts} />