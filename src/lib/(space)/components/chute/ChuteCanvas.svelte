<!-- src/lib/pages/space/components/chute/ChuteCanvas.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { PHYSICS, calculateState } from './physics';
  import { chuteStore } from '../../stores/chuteStore';
  import Controls from './Controls.svelte';
  
  // Remove fixed dimensions, let container control size
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let startTime: number;
  let animationFrame: number;
  let containerWidth: number;
  let containerHeight: number;

  // Simplified image handling
  let parachuteImage: HTMLImageElement;
  let cloudImage: HTMLImageElement;

  function drawParachutist(ctx: CanvasRenderingContext2D, elapsed: number) {
    if (!parachuteImage) return;
    
    const x = containerWidth * 0.6;
    const y = containerHeight * 0.3 + Math.sin(elapsed / 1000) * 5;
    const scale = 0.45;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(Math.sin(elapsed / 2000) * 0.05);
    ctx.drawImage(
      parachuteImage,
      -parachuteImage.width / 2,
      -parachuteImage.height / 2
    );
    ctx.restore();
  }

  function drawClouds(ctx: CanvasRenderingContext2D, elapsed: number, velocity: number) {
    if (!cloudImage) return;
    
    const cloudSpeed = velocity * 0.5;
    const cycle = 8000 / cloudSpeed;
    
    Array.from({ length: 4 }, (_, i) => {
      const offset = (elapsed + i * 2000) % cycle;
      const x = containerWidth * (0.2 + i * 0.2);
      const y = containerHeight - (offset / cycle) * containerHeight * 1.5;
      const scale = 0.2 + i * 0.1;
      const opacity = 0.15 + (i * 0.05);
      
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.drawImage(
        cloudImage,
        -cloudImage.width / 2,
        -cloudImage.height / 2
      );
      ctx.restore();
    });
  }

  function draw(timestamp: number) {
    if (!ctx) return;
    
    const elapsed = timestamp - startTime;
    const { altitude, velocity } = calculateState(elapsed);
    
    // Update store for Controls component
    chuteStore.updateStats(altitude, velocity);
    
    // Clear and draw frame
    ctx.clearRect(0, 0, containerWidth, containerHeight);
    drawClouds(ctx, elapsed, velocity);
    drawParachutist(ctx, elapsed);
    
    animationFrame = requestAnimationFrame(draw);
  }
  
  function startAnimation() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    startTime = performance.now();
    animationFrame = requestAnimationFrame(draw);
  }

  // Handle canvas resize
  function resizeCanvas() {
    if (!canvas || !canvas.parentElement) return;
    
    containerWidth = canvas.parentElement.clientWidth;
    containerHeight = canvas.parentElement.clientHeight;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    
    ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
  }
  
  onMount(async () => {
    // Load images
    [parachuteImage, cloudImage] = await Promise.all([
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = '/space/assets/paraglider.svg';
      }),
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = '/space/assets/cloud.svg';
      })
    ]);

    // Initialize canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    startAnimation();
  });
  
  onDestroy(() => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', resizeCanvas);
  });
</script>

<div class="relative w-full h-full">
  <canvas
    bind:this={canvas}
    class="w-full h-full"
  />
  
  <!-- Controls overlay -->
  <div class="absolute inset-x-0 bottom-0">
    <Controls {startAnimation} />
  </div>
</div>