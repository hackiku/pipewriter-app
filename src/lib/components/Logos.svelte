<!-- $lib/components/Logos.svelte -->

<script lang="ts">
  const logos = [
    { src: 'portfolio/logos/redocly-logo-white.svg', alt: 'Redocly' },
    { src: 'portfolio/logos/uploadcare-logo.svg', alt: 'Uploadcare' },
    { src: 'portfolio/logos/lenovo-logo-white.svg', alt: 'Linguado' },
    { src: 'portfolio/logos/highfive-logo.svg', alt: 'HighFive' },
    // { src: 'portfolio/linguado-logo.jpg', alt: 'Linguado' },
    { src: 'portfolio/logos/stoovo-logo.svg', alt: 'Uploadcare' },
  ];
</script>

<div class="flex flex-wrap justify-center items-center gap-6 md:gap-8">
  {#each logos as logo}
    <img 
      src={logo.src} 
      alt={logo.alt} 
      class="h-3 md:h-6 w-auto opacity-50 transition-opacity duration-200 hover:opacity-100" 
    />
  {/each}
</div>

<style>
  /* Add any additional styles here if needed */
</style>