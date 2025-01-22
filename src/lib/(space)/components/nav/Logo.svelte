<!-- src/lib/(space)/components/nav/Logo.svelte -->
<script lang="ts">
  import { Satellite, ArrowLeft } from "lucide-svelte";
</script>

<a href="/" class="relative flex items-center gap-2 group">
  <div class="flex items-center gap-1.5 relative z-10">
    <div class="relative w-5 h-5">
      <Satellite 
        class="absolute inset-0 transition-all duration-300 
               group-hover:opacity-0 group-hover:-translate-y-1" 
      />
      <ArrowLeft 
        class="absolute inset-0 transition-all duration-300 
               opacity-0 translate-y-1
               group-hover:opacity-100 group-hover:translate-y-0" 
      />
    </div>
    
    <span 
      class="text-xl font-semibold transition-all duration-300
             group-hover:text-transparent group-hover:bg-clip-text 
             group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600
             dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400"
    >
      Pipewriter
    </span>
  </div>
  
  <div class="absolute -right-8 -bottom-1.5 z-0">
    <div 
      class="px-2 py-0.5 text-[0.8em] font-medium rounded-full 
             bg-gradient-to-r from-indigo-600/20 to-purple-600/20 
             text-indigo-600 dark:text-purple-400
             -rotate-6 transform origin-bottom-right
             transition-all duration-300 
             group-hover:-rotate-3 group-hover:translate-x-1
             group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600
             group-hover:text-white"
    >
      <span class="block group-hover:hidden">Space Edition</span>
      <span class="hidden group-hover:block">Writing App</span>
    </div>
  </div>
</a>