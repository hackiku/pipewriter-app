<!-- lib/blog/components/ui/Title.svelte -->
<script lang="ts">
  export let className = '';
</script>

<div class="relative {className}">
  <div class="container md:px-20 lg:px-20 xl:px-44">
    
    <!-- Blog Badge Row -->
    <div class="flex items-center gap-6 mb-1">
      <div class="px-6 py-2 rounded-full bg-primary/10 text-primary 
                  border border-primary/20 text-xl font-medium hover:scale-105 
                  transition-transform inline-flex items-center">
        Blog
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="relative overflow-hidden -mr-44 -space-y-3">
      
      <!-- Container for both texts -->
      <div class="flex items-baseline">
        
        <!-- Static "writing" -->
        <h1 class="relative z-20 text-6xl md:text-8xl lg:text-9xl font-normal 
                   text-primary leading-relaxed py-1">
          writing
        </h1>

        <!-- Sliding text starts right after "writing" -->
        <div class="relative z-10 overflow-hidden ml-4 py-1">
          <div class="whitespace-nowrap text-6xl md:text-8xl lg:text-9xl
                      font-normal leading-none text-primary/20 animate-slide-left">
            writing on writing on writing on writing on writing on writing
          </div>
        </div>
				
      </div>
			<div class="relative z-10 overflow-hidden ml-4 py-1">
				<div class="whitespace-nowrap text-6xl md:text-8xl lg:text-9xl
										font-normal leading-none text-primary/20 animate-slide-left">
					on writing on writing on writing on writing on writing on writing
				</div>
			</div>
    </div>
  </div>
</div>

<style>
  @keyframes slideLeft {
    0% { 
      transform: translateX(0); 
    }
    100% { 
      transform: translateX(-100%); 
    }
  }

  .animate-slide-left {
    animation: slideLeft 8s linear infinite;
    will-change: transform;
  }
</style>