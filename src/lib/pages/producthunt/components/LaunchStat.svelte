<!-- lib/pages/producthunt/components/LaunchStat.svelte -->
<script lang="ts">
  export let number: string;
  export let label: string;
</script>

<div class="p-8 rounded-2xl bg-card border">
  <div class="space-y-3">
    <div class="text-7xl font-medium bg-gradient-to-r from-[#EA532A] to-[#EA532A]/70 bg-clip-text text-transparent">
      {number}
    </div>
    <div class="text-2xl font-medium text-muted-foreground">{label}</div>
  </div>
</div>