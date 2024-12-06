<!-- $lib/components/LogosMarquee.svelte -->
<script lang="ts">
  const logos = [
    { src: 'logos/brex.svg', alt: 'Brex' },
    { src: 'logos/lenovo.svg', alt: 'Lenovo' },
    { src: 'logos/redocly.svg', alt: 'Redocly' },
    { src: 'logos/highfive.svg', alt: 'Highfive' },
    { src: 'logos/nextiva.svg', alt: 'Nextiva' },
    { src: 'logos/stoovo.svg', alt: 'Stoovo' },
    { src: 'logos/hypercore.svg', alt: 'Hypercore' },
    { src: 'logos/orizon.svg', alt: 'Orizon' },
    { src: 'logos/uploadcare.svg', alt: 'Uploadcare' }
  ];

  const duplicatedLogos = [...logos, ...logos];
</script>

<div class="w-full overflow-hidden py-6">
  <div class="flex space-x-16 animate-marquee">
    {#each duplicatedLogos as logo}
      <div class="flex items-center justify-center h-8">
        <img 
          src={logo.src} 
          alt={logo.alt}
          class="h-full w-auto transition-all duration-300 logo"
        />
      </div>
    {/each}
  </div>
</div>

<style>
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .animate-marquee {
    animation: marquee 20s linear infinite;
    will-change: transform;
    width: max-content;
  }

  /* Light mode - original colors */
  :global(.logo) {
    opacity: 85%;
    transition: all 0.3s ease;
  }

  :global(.logo:hover) {
    opacity: 100%;
  }

  /* Dark mode - inverted colors */
  :global(.dark .logo) {
    filter: invert(1) brightness(1.75);
    opacity: 85%;
  }

  :global(.dark .logo:hover) {
    opacity: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-marquee {
      animation: none;
      transform: translateX(0);
    }
  }
</style>