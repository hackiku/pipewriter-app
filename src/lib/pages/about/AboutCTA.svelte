<!-- $lib/pages/about/AboutCTA.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ArrowRight } from "lucide-svelte";
</script>

<section class="container py-24 border-t">
  <div class="max-w-2xl mx-auto text-center space-y-8">
    <h2 class="text-3xl font-bold">Ready to Write Better?</h2>
    <p class="text-xl text-muted-foreground leading-relaxed">
      Join other technical writers using Pipewriter to create 
      better documentation, faster.
    </p>
    
    <div class="pt-8 flex justify-center gap-4">
      <Button asChild>
        <a href="/early" class="inline-flex items-center group">
          Get Early Access
          <ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    </div>
  </div>
</section>