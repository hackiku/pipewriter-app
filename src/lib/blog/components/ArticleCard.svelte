<!-- $lib/pages/blog/ArticleCard.svelte -->
<script lang="ts">
  import { ArrowRight } from "lucide-svelte";

  export let title: string;
  export let excerpt: string;
  export let date: string;
  export let slug: string;
  export let readingTime: string;
  export let category: string;
</script>

<a 
  href="/blog/{slug}" 
  class="group block rounded-xl border bg-card p-6 transition-all 
         hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
>
  <div class="space-y-4">
    <div class="flex items-center gap-3 text-sm text-muted-foreground">
      <span class="rounded-full bg-primary/10 px-3 py-1 text-primary">
        {category}
      </span>
      <span>{date}</span>
      <span>·</span>
      <span>{readingTime}</span>
    </div>

    <h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
      {title}
    </h3>

    <p class="text-muted-foreground line-clamp-2">
      {excerpt}
    </p>

    <div class="flex items-center text-sm font-medium text-primary">
      Read more
      <ArrowRight class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </div>
  </div>
</a>