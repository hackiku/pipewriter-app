<!-- src/routes/(website)/+error.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import BackgroundGrid from "$lib/components/BackgroundGrid.svelte";
  import StickerBackground from "$lib/pages/landing/sections/hero/StickerBackground.svelte";
  import BuyButton from "$lib/components/cta/buy/BuyButton.svelte";
  
  // Determine error type
  $: statusCode = $page.status;
  $: isNotFound = statusCode === 404;
  $: isServerError = statusCode >= 500;
  
  // Custom messaging based on error type
  $: errorTitle = isNotFound 
    ? "Page Not Found" 
    : "Something Went Wrong";
  
  $: errorMessage = isNotFound
    ? "The page you're looking for doesn't exist or has been moved."
    : "We're experiencing some technical difficulties. Our team has been notified.";
  
  $: actionText = isNotFound
    ? "Go back home"
    : "Return to safety";
</script>

<div class="bg-landing dark:bg-[#040D12] fixed inset-0 min-w-screen min-h-screen overflow-hidden -z-10">
  <BackgroundGrid gridSize="44" speed="10s" opacity="0.3" />
</div>

<main class="flex flex-col items-center justify-center min-h-screen px-4 text-foreground relative">
  <div class="absolute inset-0 -z-5">
    <StickerBackground opacity="0.3" />
  </div>

  <div class="flex flex-col items-center text-center max-w-lg mx-auto">
    <h1 class="text-[15vh] font-medium leading-none mb-6 text-[#171717] dark:text-[#CFCFCF]">
      {statusCode}
    </h1>
    
    <h2 class="text-3xl font-medium mb-4 text-[#171717] dark:text-[#CFCFCF]">
      {errorTitle}
    </h2>
    
    <p class="text-xl text-muted-foreground mb-8">
      {errorMessage}
    </p>
    
    <!-- Use your existing button component for consistent styling -->
    <a href="/" class="no-underline">
      <BuyButton size="lg" text={actionText} showPrice={false} />
    </a>
  </div>
</main>