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
  
  function draw(timestamp: number) {
    if (!ctx || !images.paraglider) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate state
    const elapsed = timestamp - startTime;
    const { altitude, velocity, progress } = calculateState(elapsed);
    
    // Draw paraglider
    const x = width / 2;
    const y = height * 0.3 + Math.sin(elapsed / 1000) * 5;
    const scale = 0.5;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(Math.sin(elapsed / 1000) * 0.1);
    ctx.drawImage(
      images.paraglider, 
      -images.paraglider.width / 2, 
      -images.paraglider.height / 2
    );
    ctx.restore();
    
    // Draw clouds (add your cloud drawing logic here)
    // Draw ingenuity (add helicopter drawing logic here)
    
    // Draw stats
    ctx.font = '12px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'right';
    ctx.fillText(`alt(t) = ${altitude.toFixed(1)}m`, width - 20, height - 40);
    ctx.fillText(`v(t) = ${velocity.toFixed(1)}m/s`, width - 20, height - 20);
    
    // Continue animation
    if (progress < 1) {
      animationFrame = requestAnimationFrame(draw);
    }
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

<canvas
  bind:this={canvas}
  {width}
  {height}
  class="w-full h-full object-contain"
  style:width="{width}px"
  style:height="{height}px"
/>