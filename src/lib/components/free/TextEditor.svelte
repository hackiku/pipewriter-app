<!-- $lib/components/free/TextEditor.svelte -->
<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea";
  export let value: string;
  export let readonly: boolean = false;
</script>

<div class="flex flex-col gap-4">
  <h3 class="text-lg font-semibold">Your Contentsss</h3>
  <Textarea 
    class="flex-1 min-h-[400px] font-mono text-sm text-muted-foreground [&_strong]:text-foreground [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground"
    bind:value
    {readonly}
  />
</div>
