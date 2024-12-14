<!-- $lib/pages/about/PlayPiano.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight } from "lucide-svelte";

  let sections = [
    {
      title: "They laughed when I set down at the piano...",
      content: "Because writers have always been seen as the 'content people'. Not anymore. We're building the tools that transform writers into product development powerhouses.",
      image: "/images/writer-meeting.jpg",
      align: "left"
    },
    {
      title: "...but when I started to play",
      content: "Great products start with words, not wireframes. Our tools help writers lead the design process with content-first deliverables that make both designers and developers happy.",
      image: "/images/writer-prototype.jpg",
      align: "right"
    }
  ];

  let isVisible = false;
  let activeSection = 0;
  let visibleSections = new Set<number>();

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sectionIndex = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            visibleSections.add(sectionIndex);
            visibleSections = visibleSections;
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  });

  $: isVisible = true; // Trigger initial animation
</script>

<div class="relative py-24 overflow-hidden">
  <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
  
  {#each sections as section, index}
    <div 
      class="section container max-w-7xl mx-auto mb-32 last:mb-0"
      data-index={index}
    >
      <div class="grid lg:grid-cols-2 gap-16 items-center" 
        class:lg:grid-flow-dense={section.align === 'right'}>
        
        <!-- Text Content -->
        <div class="space-y-6 px-6"
          class:lg:order-last={section.align === 'left'}
          in:fly={{
            x: section.align === 'left' ? -100 : 100,
            duration: 1000,
            delay: 200,
            easing: quintOut
          }}>
          <h2 class="text-4xl font-bold leading-tight">
            {section.title}
          </h2>
          <p class="text-xl text-muted-foreground leading-relaxed">
            {section.content}
          </p>
          
          {#if index === sections.length - 1}
            <div class="pt-6">
              <Button class="group">
                Start Building
                <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          {/if}
        </div>

        <!-- Image -->
        <div class="relative"
          in:fly={{
            x: section.align === 'left' ? 100 : -100,
            duration: 1000,
            easing: quintOut
          }}>
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl -rotate-2"></div>
          <img
            src={section.image}
            alt="Writers in tech"
            class="relative rounded-2xl shadow-xl rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-105"
          />
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgb(209 213 219 / 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(209 213 219 / 0.1) 1px, transparent 1px);
    background-size: 4rem 4rem;
  }

  @media (prefers-reduced-motion) {
    .section * {
      transition: none !important;
      animation: none !important;
    }
  }
</style>