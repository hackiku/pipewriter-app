<!-- $lib/components/LogosMarquee.svelte -->

<script lang="ts">
  const logos = [
    { src: 'portfolio/logos/redocly-logo-white.svg', alt: 'Redocly' },
    { src: 'portfolio/logos/uploadcare-logo.svg', alt: 'Uploadcare' },
    { src: 'portfolio/logos/lenovo-logo-white.svg', alt: 'Lenovo' },
    { src: 'portfolio/logos/highfive-logo.svg', alt: 'HighFive' },
    { src: 'portfolio/logos/stoovo-logo.svg', alt: 'Stoovo' },
    // Add more logos here
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos];
</script>

<div class="w-full overflow-hidden py-4">
  <div class="flex space-x-12 animate-marquee">
    {#each duplicatedLogos as logo}
      <img 
        src={logo.src} 
        alt={logo.alt} 
        class="h-6 w-auto grayscale opacity-50 transition-opacity duration-200 hover:opacity-100" 
      />
    {/each}
  </div>
</div>

<style>
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-33.33%); }
  }

  .animate-marquee {
    animation: marquee 4s linear infinite;
  }
</style>