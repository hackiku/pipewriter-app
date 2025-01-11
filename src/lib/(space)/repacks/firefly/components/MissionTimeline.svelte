<!-- src/lib/(space)/repacks/firefly/components/MissionTimeline.svelte -->
<script lang="ts">
  const milestones = [
    { date: "2024-01-15", title: "Blue Ghost Launch", description: "Mission 1 Liftoff" },
    { date: "2024-01-16", title: "Trans-Lunar Injection", description: "Moon trajectory burn" },
    { date: "2024-02-14", title: "Lunar Orbit", description: "Arrival at the Moon" },
    { date: "2024-02-24", title: "Moon Landing", description: "Touchdown at Mare Crisium" }
  ];
</script>

<div class="relative border-l border-[#F5FF00]/20 pl-8 space-y-12 py-8">
  {#each milestones as milestone}
    <div class="relative">
      <!-- Timeline node -->
      <div class="absolute -left-[33px] w-3 h-3 bg-[#F5FF00]" />
      
      <div class="space-y-2">
        <time class="text-[#F5FF00] text-sm tracking-wider">{milestone.date}</time>
        <h3 class="text-white text-xl font-light">{milestone.title}</h3>
        <p class="text-zinc-400">{milestone.description}</p>
      </div>
    </div>
  {/each}
</div>