<!-- lib/pages/producthunt/cta/SupportSection.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { scrollStore } from '../stores/scrollStore';
  import SupportForm from './SupportForm.svelte';
  import LaunchStat from '../components/LaunchStat.svelte';
  
  let visible = false;
  let containerRef: HTMLElement;
  let contentRef: HTMLElement;
  let formRef: HTMLElement;
  let isMobile: boolean;
  let showFullForm = false;

  // Early support stats
  const stats = [
    { number: "7", label: "Early Supporters" },
    { number: "4h", label: "Launch Window" },
    { number: "#1", label: "Product Hunt Rank" }
  ];

  onMount(() => {
    // Check if mobile
    isMobile = window.innerWidth < 1024;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef);

    // Track scroll position
    const handleScroll = () => {
      if (contentRef) {
        const rect = contentRef.getBoundingClientRect();
        const progress = 1 - (rect.bottom / window.innerHeight);
        scrollStore.updateScroll(window.scrollY, progress);

        // Handle mobile form visibility
        if (isMobile && formRef) {
          const formRect = formRef.getBoundingClientRect();
          showFullForm = formRect.top < window.innerHeight - 100;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth < 1024;
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => {});
    };
  });

  function scrollToForm() {
    if (formRef) {
      formRef.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<section class="relative" bind:this={containerRef}>
  <div class="container max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
    <div class="grid grid-cols-12 gap-12 lg:gap-24">
      <!-- Left: Scrolling Stats -->
      <div 
        class="col-span-12 lg:col-span-6 space-y-32 lg:space-y-48" 
        bind:this={contentRef}
      >
        {#if visible}
          {#each stats as stat, index}
            <div 
              in:fly={{ y: 20, duration: 400, delay: index * 200 }}
              class="relative"
            >
              <LaunchStat {...stat} />
            </div>
          {/each}

          <!-- Mission Text -->
          <div 
            in:fly={{ y: 20, duration: 400, delay: 600 }}
            class="text-2xl font-regular leading-relaxed ml-auto mr-24 text-balance max-w-md"
          >
            Great products start with great writing. We're building tools that put writers 
            at the heart of product development.
          </div>
        {/if}
      </div>

      <!-- Right: Sticky Form -->
      <div 
        class="col-span-12 lg:col-span-6"
        class:fixed={isMobile}
        class:bottom-0={isMobile}
        class:inset-x-0={isMobile}
        class:z-40={isMobile}
        bind:this={formRef}
      >
        <div 
          class:lg:sticky={true}
          class:lg:top-32={true}
          class:translate-y-[85%]={isMobile && !showFullForm}
          class="transition-transform duration-300"
        >
          {#if visible}
            <!-- Mobile Handle -->
            {#if isMobile}
              <button
                class="w-full h-12 flex items-center justify-center bg-background/80 backdrop-blur-xl border-t rounded-t-xl"
                on:click={scrollToForm}
              >
                <div class="w-16 h-1 bg-muted-foreground/20 rounded-full" />
              </button>
            {/if}

            <div 
              in:fly={{ y: 20, duration: 400 }}
              class="bg-background/80 backdrop-blur-xl"
            >
              <SupportForm />
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>