<!-- $lib/pages/about/Founder.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from "lucide-svelte";
</script>

<section class="container py-24 border-t">
  <div class="grid md:grid-cols-2 gap-16 items-center">
    <div class="relative aspect-square rounded-lg overflow-hidden bg-muted">
      <img 
        src="/about/founder.jpg" 
        alt="Ivan working on Pipewriter" 
        class="w-full h-full object-cover"
      />
    </div>

    <div class="space-y-6">
      <h2 class="text-3xl font-bold">Technical Writer First</h2>
      <p class="text-xl text-muted-foreground">
        After years of writing docs for aerospace and deep tech companies, 
        I built the tool I wish I had. Now helping other writers work better.
      </p>
      <div class="flex gap-4">
        <Button asChild variant="outline">
          <a 
            href="https://linkedin.com/in/jzro" 
            class="inline-flex items-center"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
            <ExternalLink class="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  </div>
</section>