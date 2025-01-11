<!-- src/lib/(space)/repacks/firefly/sections/News.svelte -->
<script lang="ts">
  import { news } from '../data/news';
	import { ArrowRight } from 'lucide-svelte';
  import SecondaryButton from '../components/cta/SecondaryButton.svelte';
  
  // Duplicate news array for continuous scroll
  const extendedNews = [...news, ...news, ...news];
  
  let containerEl: HTMLDivElement;
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;

  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    startX = e.pageX - containerEl.offsetLeft;
    scrollLeft = containerEl.scrollLeft;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerEl.offsetLeft;
    const walk = (x - startX) * 2;
    containerEl.scrollLeft = scrollLeft - walk;
  }

  function handleDragEnd() {
    isDragging = false;
  }
</script>

<section class="py-24 bg-black relative overflow-hidden">
  <div class="container">
    <div class="flex justify-between items-start mb-12">
      <div class="space-y-2">
        <h2 class="text-sm text-[#F5FF00] font-semibold tracking-wider">
          NEWS
        </h2>
        <h3 class="text-4xl font-light text-white">
          Updates from Firefly
        </h3>
      </div>
      
      <SecondaryButton href="/news">
        Read All <ArrowRight class="ml-2 pr-1"/>
      </SecondaryButton>
    </div>
  </div>

  <!-- Scrollable Container with Hidden Scrollbar -->
  <div class="relative">
    <div 
      bind:this={containerEl}
      class="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth
             cursor-grab active:cursor-grabbing select-none px-8
             scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
      on:mousedown={handleMouseDown}
      on:mousemove={handleMouseMove}
      on:mouseup={handleDragEnd}
      on:mouseleave={handleDragEnd}
    >
      {#each extendedNews as item}
        <div 
          class="flex-shrink-0 md:w-96 w-[85vw] p-6 space-y-4 
                 border border-[#F5FF00]/20 snap-center"
        >
          <time class="text-zinc-500 text-sm">{item.date}</time>
          <h4 class="text-xl text-white hover:text-[#F5FF00] transition-colors">
            {item.title}
          </h4>
          <p class="text-zinc-400">{item.excerpt}</p>
        </div>
      {/each}
    </div>

    <!-- Gradient Fades -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute left-0 top-0 bottom-0 w-16 
                  bg-gradient-to-r from-black to-transparent" />
      <div class="absolute right-0 top-0 bottom-0 w-16 
                  bg-gradient-to-l from-black to-transparent" />
    </div>
  </div>
</section>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
</style>