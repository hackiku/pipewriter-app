<!-- src/lib/pages/space/components/chute/ChuteCanvas.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { PHYSICS, calculateState } from './physics';
  import { chuteStore } from '../../stores/chuteStore';
  import Controls from './Controls.svelte';
  import { RotateCcw } from "lucide-svelte";

  export let width = 400;
  export let height = 600;
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let startTime: number;
  let animationFrame: number;
  let images = {
    paraglider: null as HTMLImageElement | null,
    cloud: null as HTMLImageElement | null,
    ingenuity: null as HTMLImageElement | null,
    earth: null as HTMLImageElement | null,
    mars: null as HTMLImageElement | null
  };
  
  async function loadImages() {
    const imagePromises = [
      loadImage('/space/assets/paraglider.svg'),
      loadImage('/space/assets/cloud.svg'),
      loadImage('/space/assets/ingenuity.svg'),
      loadImage('/space/assets/earth.svg'),
      loadImage('/space/assets/mars.svg')
    ];
    
    const [paraglider, cloud, ingenuity, earth, mars] = await Promise.all(imagePromises);
    images = { paraglider, cloud, ingenuity, earth, mars };
  }
  
  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }
  
  function drawParachutist(ctx: CanvasRenderingContext2D, elapsed: number) {
    if (!images.paraglider) return;
    
    // Add padding from edges
    const x = width * 0.6;
    const y = height * 0.3 + Math.sin(elapsed / 1000) * 5;
    const scale = 0.45;
    
    ctx.save();
    
    // Draw base parachutist
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(Math.sin(elapsed / 2000) * 0.05);
    ctx.drawImage(
      images.paraglider,
      -images.paraglider.width / 2,
      -images.paraglider.height / 2
    );
    
    // Apply gradient overlay
    const gradient = ctx.createLinearGradient(
      -images.paraglider.width / 2,
      -images.paraglider.height / 2,
      images.paraglider.width / 2,
      images.paraglider.height / 2
    );
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.3)');  // indigo
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.3)'); // purple
    
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = gradient;
    ctx.fillRect(
      -images.paraglider.width / 2,
      -images.paraglider.height / 2,
      images.paraglider.width,
      images.paraglider.height
    );
    
    ctx.restore();
  }

  function drawClouds(ctx: CanvasRenderingContext2D, elapsed: number, velocity: number) {
    if (!images.cloud) return;
    
    const cloudSpeed = velocity * 0.5;
    const cycle = 8000 / cloudSpeed;
    
    const cloudPositions = Array.from({ length: 4 }, (_, i) => {
      const offset = (elapsed + i * 2000) % cycle;
      const x = width * (0.2 + i * 0.2);
      const y = height - (offset / cycle) * height * 1.5;
      const scale = 0.2 + i * 0.1;
      const opacity = 0.15 + (i * 0.05);
      return { x, y, scale, opacity };
    });

    cloudPositions.forEach(({ x, y, scale, opacity }) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.drawImage(
        images.cloud,
        -images.cloud.width / 2,
        -images.cloud.height / 2
      );
      ctx.restore();
    });
  }

  function draw(timestamp: number) {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    const elapsed = timestamp - startTime;
    const { altitude, velocity } = calculateState(elapsed);
    
    // Update store with current stats
    chuteStore.updateStats(altitude, velocity);
    
    drawClouds(ctx, elapsed, velocity);
    drawParachutist(ctx, elapsed);
    
    animationFrame = requestAnimationFrame(draw);
  }
  
  function startAnimation() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    startTime = performance.now();
    animationFrame = requestAnimationFrame(draw);
  }
  
  onMount(async () => {
    ctx = canvas.getContext('2d')!;
    await loadImages();
    startAnimation();
  });
  
  onDestroy(() => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
</script>


<div class="relative aspect-[2/3] bg-black/10 rounded-lg border border-white/10"> <!-- Added aspect ratio -->
  <canvas
    bind:this={canvas}
    {width}
    {height}
    class="absolute inset-0 w-full h-full"
    style="width: 100%; height: 100%;"
  />

	<Controls />
</div>

<style>
  canvas {
    image-rendering: pixelated;
  }
</style>