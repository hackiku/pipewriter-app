<!-- lib/blog/components/ui/Title.svelte -->
<script lang="ts">
  export let text = "writing on writing";
  export let className = '';
  export let repeatedText = "on writing";
</script>

<div class="relative {className}">
  <!-- Main content that dictates the height -->
  <div class="container md:px-20 lg:px-20 xl:px-44">
    <!-- Main content row -->
    <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
      <!-- Blog badge - width fit-content for mobile -->
      <div class="w-fit px-6 py-2 rounded-full bg-primary/10 text-primary 
                  border border-primary/20 text-xl font-medium hover:scale-105 
                  transition-transform h-[calc(theme(fontSize.6xl)*0.6)] 
                  md:h-[calc(theme(fontSize.7xl)*0.6)] inline-flex items-center">
        Blog
      </div>
      
      <!-- Main title -->
      <h1 class="text-6xl md:text-7xl font-normal leading-[1.1] md:leading-none">
        {text}
      </h1>
    </div>
  </div>

  <!-- Animated background text with more vertical freedom -->
  <div class="absolute top-[60%] w-screen left-[calc(50%-50vw)] h-[50vh]">
    <!-- First floating line -->
    <div class="whitespace-nowrap text-6xl md:text-7xl font-normal leading-none 
                text-foreground/10 animate-float-1">
      <div class="inline-block">
        {#each Array(10) as _}
          <span class="inline-block">{repeatedText}&nbsp;</span>
        {/each}
      </div>
    </div>

    <!-- Second floating line -->
    <div class="whitespace-nowrap text-6xl md:text-7xl font-normal leading-none 
                text-foreground/5 mt-2 animate-float-2">
      <div class="inline-block">
        {#each Array(10) as _}
          <span class="inline-block">{repeatedText}&nbsp;</span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes float1 {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(-100%, 0) rotate(1deg); }
  }

  @keyframes float2 {
    0% { transform: translate(-100%, 0) rotate(-1deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  .animate-float-1 {
    animation: float1 30s linear infinite;
  }

  .animate-float-2 {
    animation: float2 30s linear infinite;
  }

  /* Add a subtle wave effect on top of the scrolling */
  .animate-float-1 {
    animation: float1 2s linear infinite,
               wave1 5s ease-in-out infinite;
  }

  .animate-float-2 {
    animation: float2 12s linear infinite,
               wave2 8s ease-in-out infinite;
  }

  @keyframes wave1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(0, -1rem) rotate(3deg); }
  }

  @keyframes wave2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(0, 1rem, 12rem) rotate(-3deg); }
  }
</style>