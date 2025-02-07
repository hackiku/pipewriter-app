 <!-- src/lib/components/cta/pricing/compare/CompareCTA.svelte -->

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight } from "lucide-svelte";
</script>

<div class="flex flex-col items-center space-y-8 pt-16">
  <div class="text-center space-y-4 max-w-2xl">
    <h3 class="text-3xl font-light">Still Comparing Options?</h3>
    <p class="text-lg text-zinc-400">
      Schedule a quick call to discuss your needs and find the perfect plan for your team.
    </p>
  </div>

  <div class="flex items-center gap-4">
    <Button variant="outline" href="/compare">
      View Full Comparison
    </Button>
    <Button variant="default" href="/call">
      Book a Call
      <ArrowRight class="w-4 h-4 ml-2" />
    </Button>
  </div>

  <p class="text-sm text-zinc-500">
    Or email us at support@pipewriter.io
  </p>
</div>