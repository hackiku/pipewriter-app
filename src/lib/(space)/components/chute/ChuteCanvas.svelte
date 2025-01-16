<!-- src/lib/pages/space/components/chute/ChuteCanvas.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { PHYSICS, calculateState } from './physics';
  
  export let width = 400;
  export let height = 600;
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let startTime: number;
  let animationFrame: number;
  let images = {
    paraglider: null as HTMLImageElement | null,
    cloud: null as HTMLImageElement | null,
    ingenuity: null as HTMLImageElement | null
  };
  
  async function loadImages() {
    const imagePromises = [
      loadImage('/space/assets/paraglider.svg'),
      loadImage('/space/assets/cloud.svg'),
      loadImage('/space/assets/ingenuity.svg')
    ];
    
    const [paraglider, cloud, ingenuity] = await Promise.all(imagePromises);
    images = { paraglider, cloud, ingenuity };
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
    
    const x = width / 2;
    const y = height * 0.3 + Math.sin(elapsed / 1000) * 5; // Gentle float
    const scale = 0.5;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(Math.sin(elapsed / 2000) * 0.05); // Slower, gentler rotation
    ctx.drawImage(
      images.paraglider,
      -images.paraglider.width / 2,
      -images.paraglider.height / 2
    );
    ctx.restore();
  }

  function drawClouds(ctx: CanvasRenderingContext2D, elapsed: number) {
    if (!images.cloud) return;
    
    // Calculate cloud positions based on time
    const cloudPositions = Array.from({ length: 3 }, (_, i) => {
      const offset = (elapsed + i * 2000) % 6000;
      const x = width - (offset / 6000) * width;
      const y = height * (0.2 + i * 0.2);
      const scale = 0.3 + i * 0.2;
      const opacity = 0.2 + (i * 0.1);
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

  function drawStats(ctx: CanvasRenderingContext2D, altitude: number, velocity: number) {
    ctx.font = '14px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'right';
    
    // Add a subtle background for better readability
    const padding = 8;
    const lineHeight = 20;
    const statsX = width - padding;
    const statsY = height - (2 * lineHeight + padding);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.roundRect(
      width - 150,
      statsY - padding,
      150 - padding,
      2 * lineHeight + 2 * padding,
      4
    );
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(`alt(t) = ${altitude.toFixed(1)}m`, statsX, statsY + lineHeight);
    ctx.fillText(`v(t) = ${velocity.toFixed(1)}m/s`, statsX, statsY + 2 * lineHeight);
  }

  function draw(timestamp: number) {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    const elapsed = timestamp - startTime;
    const { altitude, velocity } = calculateState(elapsed);
    
    drawClouds(ctx, elapsed);
    drawParachutist(ctx, elapsed);
    drawStats(ctx, altitude, velocity);
    
    animationFrame = requestAnimationFrame(draw);
  }
  
  onMount(async () => {
    ctx = canvas.getContext('2d')!;
    await loadImages();
    startTime = performance.now();
    animationFrame = requestAnimationFrame(draw);
  });
  
  onDestroy(() => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
</script>

<div class="relative w-full h-full flex items-center justify-center">
  <canvas
    bind:this={canvas}
    {width}
    {height}
    class="w-full h-full object-contain"
  />
</div>