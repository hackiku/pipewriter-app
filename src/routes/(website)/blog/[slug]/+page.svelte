<!-- routes/(website)/blog/[slug]/+page.svelte -->
<script lang="ts">
  import BlogPost from "$lib/blog/components/BlogPost.svelte";
  
  export let data;
</script>

<svelte:head>
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.excerpt} />
</svelte:head>

<BlogPost post={data.post} />