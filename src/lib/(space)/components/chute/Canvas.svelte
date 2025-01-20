<!-- components/chute/Canvas.svelte -->
<script lang="ts">
  import Controls from './Controls.svelte';
  import { PHYSICS, calculateState } from './physics';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animationFrame: number;
  let paraglider: HTMLImageElement;

  async function init() {
    // Load image first
    paraglider = await loadImage('/space/assets/paraglider.svg');
    
    // Setup canvas
    ctx = canvas.getContext('2d')!;
    startAnimation();
  }

  function startAnimation() {
    let startTime = performance.now();
    
    function animate(now: number) {
      const elapsed = now - startTime;
      draw(elapsed);
      animationFrame = requestAnimationFrame(animate);
    }
    
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(animate);
  }

  function draw(elapsed: number) {
    if (!ctx || !paraglider) return;
    
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    
    // Draw parachutist
    const x = width * 0.5;
    const y = height * 0.3 + Math.sin(elapsed/1000) * 5;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(0.5, 0.5);
    ctx.rotate(Math.sin(elapsed/2000) * 0.05);
    ctx.drawImage(paraglider, -paraglider.width/2, -paraglider.height/2);
    ctx.restore();
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }

  onMount(init);
  onDestroy(() => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
</script>

<div class="relative w-full aspect-[2/3]">
  <!-- Canvas -->
  <canvas
    bind:this={canvas}
    width="400"
    height="600"
    class="w-full h-full"
  />
  
  <!-- Controls Overlay -->
  <Controls onReset={startAnimation} />
</div>