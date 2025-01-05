<!-- lib/pages/producthunt/components/LaunchStats.svelte -->
<script lang="ts">
  import { Users, Clock, ArrowUp } from 'lucide-svelte';
  
  const stats = [
    {
      icon: Users,
      value: "124",
      label: "Early Supporters",
    },
    {
      icon: Clock,
      value: "4hrs",
      label: "Critical Window",
    },
    {
      icon: ArrowUp,
      value: "#1",
      label: "Target Rank",
    }
  ];
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  {#each stats as stat}
    <div class="flex flex-col items-center text-center space-y-4">
      <div class="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
        <svelte:component this={stat.icon} class="w-8 h-8" />
      </div>
      
      <div class="space-y-1">
        <div class="text-4xl font-medium">{stat.value}</div>
        <div class="text-lg font-medium text-muted-foreground">
          {stat.label}
        </div>
      </div>
    </div>
  {/each}
</div>