<!-- lib/blog/components/ui/Title.svelte -->
<script lang="ts">
  export let text: string = "writing on writing";
  export let className = '';
  export let repeatedText = "on writing on writing on writing";
</script>

<style>
  .title-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .title-row {
    position: relative;
    display: flex;
    white-space: nowrap;
    margin-bottom: -0.25em;
  }

  .infinite-text {
    animation: floatGently var(--duration) ease-in-out infinite;
    margin-left: -0.25em;
  }

  .repeated-row {
    opacity: var(--opacity);
    transform: translateY(var(--offset));
  }

  @keyframes floatGently {
    0%, 100% { 
      transform: translate(0, 0);
    }
    50% { 
      transform: translate(var(--float-x), var(--float-y));
    }
  }
</style>

<div class="title-container {className}">
  <!-- Main row with solid white text -->
  <div class="title-row">
    <h1 class="text-5xl sm:text-5xl md:text-7xl font-regular leading-tight">
      {text}
    </h1>
    <h1 class="infinite-text pl-10 text-5xl sm:text-5xl md:text-7xl font-regular leading-tight text-foreground/20"
        style="--duration: 3s; --float-x: -4px; --float-y: 2px;">
      {repeatedText} {repeatedText} {repeatedText}
    </h1>
  </div>

  <!-- Second row with all gray text -->
  <div class="title-row repeated-row ml-12"
       style="--opacity: 0.65; --offset: -0.4em">
    <h1 class="text-5xl sm:text-5xl md:text-7xl font-regular leading-tight text-foreground/20"
			style="--duration: 3s; --float-x: 12px; --float-y: 2px;">
      {repeatedText} {repeatedText} {repeatedText}
    </h1>
  </div>
</div>