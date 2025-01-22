<!-- src/lib/(space)/components/nav/Logo.svelte -->
<script lang="ts">
  import { Satellite } from "lucide-svelte";
</script>

<a href="/" class="flex items-center gap-2">
  <div class="flex items-center gap-1.5">
    <Satellite class="h-5 w-5" />
    <span class="text-lg font-semibold">Pipewriter</span>
  </div>
  
  <div class="relative">
    <div 
      class="px-2 py-0.5 text-xs font-medium rounded-full 
             bg-gradient-to-r from-indigo-600/20 to-purple-600/20 
             text-indigo-600 dark:text-purple-400
             rotate-6 transform origin-bottom-right"
    >
      Space Edition
    </div>
  </div>
</a>