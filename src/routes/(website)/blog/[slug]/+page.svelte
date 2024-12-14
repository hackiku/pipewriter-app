<!-- routes/(website)/blog/[slug]/+page.svelte -->
<script lang="ts">
  import EmailForm from "$lib/components/EmailForm.svelte";
  
  export let data;
  const post = data.post;
</script>

<svelte:head>
  <title>{post.title}</title>
  <meta name="description" content={post.excerpt} />
</svelte:head>

<article class="container max-w-4xl mx-auto py-24 px-4">
  <header class="space-y-8 mb-16">
    <div class="space-y-2">
      <div class="flex items-center gap-3 text-sm text-muted-foreground">
        <span class="rounded-full bg-primary/10 px-3 py-1 text-primary">
          {post.category}
        </span>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
        {post.title}
      </h1>

      <p class="text-xl text-muted-foreground">
        {post.excerpt}
      </p>
    </div>

    {#if post.heroImage}
      <img 
        src={post.heroImage} 
        alt={post.title}
        class="w-full aspect-video rounded-xl object-cover bg-muted"
      />
    {/if}
  </header>

  <div class="prose prose-lg dark:prose-invert max-w-none">
    <svelte:component this={post.content} />
  </div>

  <!-- Email Section -->
  <div class="not-prose bg-muted/50 rounded-xl p-8 my-16">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold mb-2">Want to see more?</h2>
      <p class="text-muted-foreground">Get the latest updates on writing-first development.</p>
    </div>
    <EmailForm size="sm" />
  </div>
</article>