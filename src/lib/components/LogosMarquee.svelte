<!-- $lib/components/LogosMarquee.svelte -->
<script lang="ts">
  const logos = [
    { src: 'portfolio/logos/redocly-logo-white.svg', alt: 'Redocly' },
    { src: 'portfolio/logos/uploadcare-logo.svg', alt: 'Uploadcare' },
    { src: 'portfolio/logos/lenovo-logo-white.svg', alt: 'Lenovo' },
    { src: 'portfolio/logos/highfive-logo.svg', alt: 'HighFive' },
    { src: 'portfolio/logos/stoovo-logo.svg', alt: 'Stoovo' },
  ];

  const duplicatedLogos = [...logos, ...logos];
</script>

<div class="w-full overflow-hidden py-4">
  <div class="flex space-x-12 animate-marquee">
    {#each duplicatedLogos as logo}
      <img 
        src={logo.src} 
        alt={logo.alt} 
        class="h-6 w-auto transition-opacity duration-200 hover:opacity-100 logo" 
      />
    {/each}
  </div>
</div>

<style>
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .animate-marquee {
    display: flex;
    animation: marquee 8s linear infinite;
    width: max-content;
  }

  .logo {
    filter: grayscale(100%) brightness(0);
    opacity: 0.5;
  }

  .logo:hover {
    filter: none;
    opacity: 1;
  }

  :global(.dark) .logo {
    filter: grayscale(100%) brightness(0) invert(1);
    opacity: 0.5;
  }

  :global(.dark) .logo:hover {
    filter: brightness(0) invert(1);
    opacity: 1;
  }
</style>