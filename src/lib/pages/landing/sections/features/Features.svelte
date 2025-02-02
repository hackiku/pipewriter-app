<!-- src/lib/pages/landing/sections/features/Features.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { driveStore } from '../../stores/driveStore';
  import AddToCart from "$lib/components/cta/buy/AddToCart.svelte";
  import DriveViewer from "./drive/DriveViewer.svelte";
  import FeaturePreview from "./FeaturePreview.svelte";
  import WriterShoutout from "./WriterShoutout.svelte";

  // Reference to container for intersection observer
  let previewContainer: HTMLElement;

  onMount(() => {
    // Set up intersection observer for preview cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const path = entry.target.id.replace('preview-', '');
            driveStore.navigate(path);
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
        rootMargin: "-20% 0px -30% 0px",
      }
    );

    // Observe all preview cards
    document.querySelectorAll(".preview-card").forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  });
</script>

<div class="relative">
  <!-- Desktop Layout -->
  <div class="hidden md:grid grid-cols-6 gap-8">
    <!-- Left Column: Drive Folder & CTA -->
    <div class="col-span-2">
      <div class="sticky top-4 space-y-6 z-50 pb-12">

   		  <DriveViewer />

        <!-- Writer Testimonials -->
        <div class="p-4 pt-12">
          <WriterShoutout />
        </div>

        <!-- CTA Button -->
        <AddToCart
          text="Add to Cart"
          showPrice={true}
          price="• 40% OFF"
          source="features-desktop"
        />
      </div>
    </div>

    <!-- Right Column: Preview Cards -->
    <div class="col-span-4" bind:this={previewContainer}>
      <FeaturePreview />
    </div>
  </div>

  <!-- Mobile Layout -->
  <div class="md:hidden">
    <!-- Sticky Header with Drive Folder -->
    <div class="sticky top-4 z-[999] bg-background/80 backdrop-blur-sm pb-6">
      <DriveViewer />
    </div>

    <!-- Preview Cards -->
    <div class="mt-6 pb-20"> <!-- Added padding for mobile CTA -->
      <FeaturePreview />
    </div>

    <!-- Fixed Mobile CTA -->
    <div class="fixed bottom-6 left-4 right-4 z-[999]">
      <AddToCart
        text="Get Drive Access"
        source="features-mobile"
      />
    </div>
  </div>
</div>