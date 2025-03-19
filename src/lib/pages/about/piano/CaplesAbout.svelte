<!-- $lib/pages/about/CaplesAbout.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight } from "lucide-svelte";
</script>

<div class="relative h-[100vh] overflow-hidden">
  <!-- Full-width image -->
  <div class="absolute inset-0">
    <img 
      src="/pages/about/caples-ad.webp"
      alt="John Caples Famous Piano Ad"
      class="w-full h-full object-cover opacity-20"
    />
  </div>

  <!-- Gradient overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

  <!-- Info card - sticky to bottom until scrolled -->
  <div class="absolute bottom-0 left-0 right-0 p-8 transition-all">
    <div class="max-w-2xl mx-auto text-center space-y-6">
      <p class="text-xl font-medium">
        Transform Google Docs into a UX design powerhouse. Build better products by starting with words, not wireframes.
      </p>

      <Button 
        variant="outline"
        size="lg" 
        class="bg-background/80 backdrop-blur"
      >
        Start Writing
        <ArrowRight class="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</div>