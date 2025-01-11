<!-- src/lib/(space)/repacks/firefly/sections/News.svelte -->
<script lang="ts">
  import { news } from '../data/news';
  
  // Duplicate news array for continuous scroll
  const extendedNews = [...news, ...news, ...news];
</script>

<section class="py-24 bg-black relative overflow-hidden">
  <div class="container">
    <div class="space-y-2 mb-12">
      <h2 class="text-lg text-[#F5FF00] font-medium tracking-wider">
        LATEST NEWS
      </h2>
      <h3 class="text-4xl font-light text-white">
        Updates from Firefly
      </h3>
    </div>
  </div>

  <div class="relative flex gap-8 overflow-x-auto snap-x snap-mandatory 
              scrollbar-none hover:pause">
    {#each extendedNews as item}
      <div class="flex-shrink-0 w-96 p-6 space-y-4 border border-[#F5FF00]/20">
        <time class="text-zinc-500 text-sm">{item.date}</time>
        <h4 class="text-xl text-white hover:text-[#F5FF00] transition-colors">
          {item.title}
        </h4>
        <p class="text-zinc-400">{item.excerpt}</p>
      </div>
    {/each}
  </div>
</section>