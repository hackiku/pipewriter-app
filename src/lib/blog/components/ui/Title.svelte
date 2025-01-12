<!-- lib/blog/components/ui/Title.svelte -->
<script lang="ts">
  export let text = "writing on writing";
  export let className = '';
  export let repeatedText = "on writing";
</script>

<div class="relative {className}">
  <div class="container md:px-20 lg:px-20 xl:px-44">
    <!-- Mobile Layout: Blog badge aligned with first line -->
    <div class="flex flex-col md:hidden gap-4">
      <div class="flex items-center gap-4">
        <div class="px-6 py-2 rounded-full bg-primary/10 text-primary 
                    border border-primary/20 text-xl font-medium hover:scale-105 
                    transition-transform inline-flex items-center">
          Blog
        </div>
        <h1 class="text-6xl font-normal leading-[1.1]">writing</h1>
      </div>
      <h1 class="text-6xl font-normal leading-[1.1] pl-[calc(theme(spacing.6)+theme(spacing.12))]">
        on writing
      </h1>
    </div>

    <!-- Desktop Layout: Blog badge to the left -->
    <div class="hidden md:flex md:items-center gap-6">
      <div class="px-6 py-2 rounded-full bg-primary/10 text-primary 
                  border border-primary/20 text-xl font-medium hover:scale-105 
                  transition-transform h-[calc(theme(fontSize.7xl)*0.6)] inline-flex items-center">
        Blog
      </div>
      <h1 class="text-7xl font-normal leading-none">
        {text}
      </h1>
    </div>
  </div>

  <!-- Animated background text -->
  <div class="absolute top-[60%] w-screen left-[calc(50%-50vw)] h-[50vh] overflow-hidden">
    <!-- First line with rightward motion -->
    <div class="whitespace-nowrap text-6xl md:text-7xl font-normal leading-none 
                text-foreground/10 animate-float-right">
      <div class="inline-block">
        {#each Array(10) as _}
          <span class="inline-block">{repeatedText}&nbsp;</span>
        {/each}
      </div>
    </div>

    <!-- Second line with leftward motion -->
    <div class="whitespace-nowrap text-6xl md:text-7xl font-normal leading-none 
                text-foreground/5 mt-2 animate-float-left">
      <div class="inline-block">
        {#each Array(10) as _}
          <span class="inline-block">{repeatedText}&nbsp;</span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* Animation for right-moving text */
  @keyframes floatRight {
    0%, 100% { 
      transform: translate(-20rem, 0) rotate(-3deg); 
    }
    50% { 
      transform: translate(12rem, -1rem) rotate(4deg); 
    }
  }

  /* Animation for left-moving text */
  @keyframes floatLeft {
    0%, 100% { 
      transform: translate(20rem, 0) rotate(5deg); 
    }
    50% { 
      transform: translate(-20rem, 1rem) rotate(-5deg); 
    }
  }

  .animate-float-right {
    animation: floatRight 15s ease-in-out infinite;
  }

  .animate-float-left {
    animation: floatLeft 15s ease-in-out infinite;
  }
</style>