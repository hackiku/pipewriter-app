<!-- lib/components/cta/email/SuccessMessage.svelte -->
<script lang="ts">
  import { Check } from 'lucide-svelte';
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let message = "You're in! Check your inbox for the next steps.";
</script>

<div class="flex items-center gap-2 text-green-500 dark:text-green-400">
  <Check 
    size={size === 'xs' ? 16 : size === 'sm' ? 18 : size === 'md' ? 20 : 24} 
    strokeWidth={2}
  />
  <span class={`
    ${size === 'xs' ? 'text-sm' : ''}
    ${size === 'sm' ? 'text-base' : ''}
    ${size === 'md' ? 'text-lg' : ''}
    ${size === 'lg' ? 'text-xl' : ''}
    ${size === 'xl' ? 'text-2xl' : ''}
  `}>
    {message}
  </span>
</div>