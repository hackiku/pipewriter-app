<!-- lib/blog/components/blocks/Disclaimer.svelte -->
<script lang="ts">
  import { Bot, ShieldAlert } from "lucide-svelte";
</script>

<div class="not-prose my-8 p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20">
  <div class="flex items-start gap-4">
    <div class="relative">
      <Bot class="w-10 h-10 text-yellow-500/90" />
      <ShieldAlert class="w-5 h-5 text-orange-500/90 absolute -bottom-1 -right-1" />
    </div>
    
    <div class="space-y-1.5">
      <h2 class="text-xl font-medium bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
				Opa! AI content ahead
      </h2>
      <p class="text-base text-muted-foreground/90 leading-relaxed">
				Warning: most posts on here are shamelessly automated.
      </p>
    </div>
  </div>
</div>