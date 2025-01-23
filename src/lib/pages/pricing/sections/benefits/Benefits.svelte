<!-- src/lib/pages/pricing/sections/benefits/Benefits.svelte -->
<script lang="ts">
	const sections = [
    {
      title: "Start in Google Docs",
      subtitle: "Where Writers Feel at Home",
      description: "No more juggling between Figma, Notion, and endless video calls. Write and wireframe in the environment you already know. Our sidebar app adds UX superpowers to your documents.",
      align: "right"
    },
    {
      title: "Export to Reality",
      subtitle: "From Doc to Development",
      description: "Generate production-ready code that developers actually want to use. Export to HTML, React, or Svelte with our AI-powered design system integration.",
      align: "left"
    },
    {
      title: "Own Your Process",
      subtitle: "No More Design By Committee",
      description: "Lead product development with words first. Create high-fidelity wireframes that communicate your vision clearly, before a single pixel is pushed.",
      align: "right"
    }
  ];
</script>

<section class="relative py-32 border-t border-border/50">
  <div class="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
  
  {#each sections as section, i}
    <div class="container mb-32 last:mb-0">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        {#if section.align === 'left'}
          <div class="relative aspect-square lg:aspect-auto lg:h-[32rem] bg-gradient-to-tr from-primary/10 to-primary/5 rounded-lg overflow-hidden">
            <!-- Image placeholder -->
          </div>
        {/if}
        
        <div class="space-y-8 {section.align === 'right' ? 'lg:order-first' : ''}">
          <div class="space-y-2">
            <h4 class="text-sm tracking-wide text-primary/80 uppercase">
              {section.subtitle}
            </h4>
            <h3 class="text-4xl md:text-5xl font-light tracking-tight leading-tight">
              {section.title}
            </h3>
          </div>
          <p class="text-xl text-muted-foreground leading-relaxed">
            {section.description}
          </p>
        </div>
        
        {#if section.align === 'right'}
          <div class="relative aspect-square lg:aspect-auto lg:h-[32rem] bg-gradient-to-tr from-primary/10 to-primary/5 rounded-lg overflow-hidden">
            <!-- Image placeholder -->
          </div>
        {/if}
      </div>
    </div>
  {/each}
</section>

<style>
  .bg-grid-white {
    background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  }
</style>