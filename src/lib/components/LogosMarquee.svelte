<!-- $lib/components/LogoMarquee.svelte -->
<script lang="ts">
  const logos = [
    { src: 'portfolio/logos/brex.svg', alt: 'Brex' },
    { src: 'portfolio/logos/lenovo.svg', alt: 'Lenovo' },
    { src: 'portfolio/logos/redocly.svg', alt: 'Redocly' },
    { src: 'portfolio/logos/highfive.svg', alt: 'Highfive' },
    { src: 'portfolio/logos/nextiva.svg', alt: 'Nextiva' },
    { src: 'portfolio/logos/stoovo.svg', alt: 'Stoovo' },
    { src: 'portfolio/logos/hypercore.svg', alt: 'Hypercore' },
    { src: 'portfolio/logos/orizon.svg', alt: 'Orizon' },
    { src: 'portfolio/logos/uploadcare.svg', alt: 'Uploadcare' }
  ];

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  // You can toggle this to experiment with different modes
  const isGrayscale = false;
</script>

<div class="w-full overflow-hidden py-8">
  <div class="flex space-x-16 animate-marquee">
    {#each duplicatedLogos as logo}
      <div class="flex items-center justify-center h-12">
        <img 
          src={logo.src} 
          alt={logo.alt}
          class="h-full w-auto transition-all duration-300
                {isGrayscale ? 'logo-grayscale' : 'logo-color'}"
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
    animation: marquee 30s linear infinite;
    will-change: transform;
    width: max-content;
  }

  /* Grayscale version */
  :global(.logo-grayscale) {
    filter: grayscale(100%) brightness(1.1) contrast(0.9);
    opacity: 0.6;
  }

  :global(.logo-grayscale:hover) {
    filter: none;
    opacity: 1;
  }

  /* Color version */
  :global(.logo-color) {
    opacity: 0.9;
  }

  :global(.logo-color:hover) {
    opacity: 1;
  }

  /* Dark mode adjustments */
  :global(.dark .logo-grayscale) {
    filter: grayscale(100%) brightness(2.5) contrast(0.7);
    opacity: 0.5;
  }

  :global(.dark .logo-grayscale:hover) {
    filter: brightness(2) contrast(1);
    opacity: 0.8;
  }

  :global(.dark .logo-color) {
    filter: brightness(2) contrast(0.9);
    opacity: 0.8;
  }

  :global(.dark .logo-color:hover) {
    filter: brightness(2) contrast(1);
    opacity: 1;
  }

  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .animate-marquee {
      animation: none;
      transform: translateX(0);
    }
  }
</style>