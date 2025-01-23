<!-- content/compare/CompareTable.svelte -->
<script lang="ts">
  import type { Feature } from "../../data/features";
  export let features: Feature[];

  const plans = ["Writer", "Agency", "Enterprise"];
</script>

<div class="relative overflow-x-auto">
  <table class="w-full text-left">
    <thead class="text-sm uppercase border-b border-zinc-800">
      <tr>
        <th class="p-4">Feature</th>
        {#each plans as plan}
          <th class="p-4">{plan}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each features as feature}
        <tr class="border-b border-zinc-800/50">
          <td class="p-4">
            <div class="space-y-1">
              <div class="font-medium">{feature.name}</div>
              <div class="text-sm text-zinc-400">{feature.description}</div>
            </div>
          </td>
          <td class="p-4">{feature.writer ? "✓" : "−"}</td>
          <td class="p-4">{feature.agency ? "✓" : "−"}</td>
          <td class="p-4">{feature.enterprise ? "✓" : "−"}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>