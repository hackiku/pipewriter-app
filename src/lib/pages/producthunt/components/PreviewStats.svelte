<!-- lib/pages/producthunt/components/PreviewStats.svelte -->
<script lang="ts">
  import { Rocket, Users, Star } from 'lucide-svelte';
  
  const stats = [
    {
      icon: Users,
      label: "Early Supporters",
      value: "124",
      subtext: "Writers ready to upvote"
    },
    {
      icon: Star,
      label: "Target Ranking",
      value: "#1",
      subtext: "Product of the Day"
    },
    {
      icon: Rocket,
      label: "Launch Window",
      value: "4hrs",
      subtext: "Critical support period"
    }
  ];
</script>

<div class="space-y-8">
  <h3 class="text-2xl font-semibold">Launch Stats</h3>
  
  <div class="grid gap-6">
    {#each stats as stat}
      <div class="flex items-center gap-4 p-6 rounded-xl bg-muted/50 border">
        <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <svelte:component this={stat.icon} class="w-6 h-6" />
        </div>
        
        <div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-bold">{stat.value}</span>
            <span class="text-sm font-medium text-muted-foreground">
              {stat.label}
            </span>
          </div>
          <p class="text-sm text-muted-foreground">{stat.subtext}</p>
        </div>
      </div>
    {/each}
  </div>
</div>