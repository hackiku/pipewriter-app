<!-- src/lib/(space)/content/products/ProjectsMarquee.svelte -->
<script lang="ts">
  import { projects } from "../../data/projects";
  
  // Duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects];
</script>

<div class="w-full overflow-hidden">
  <div class="flex space-x-8 animate-marquee">
    {#each duplicatedProjects as project}
      <div class="flex-none w-72">
        <a 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer" 
          class="block group"
        >
          <div class="relative rounded-xl overflow-hidden bg-card border">
            <div class="aspect-video relative">
              <img 
                src={project.image} 
                alt={project.title}
                class="w-full h-full object-cover 
                       transition-transform duration-300
                       group-hover:scale-105"
              />
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <!-- Content -->
              <div class="absolute inset-x-0 bottom-0 p-4">
                <div class="space-y-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-medium text-white">
                      {project.title}
                    </h3>
                    <span class="text-xs text-white/80">
                      {project.status}
                    </span>
                  </div>
                  <p class="text-sm text-white/80 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .animate-marquee {
    animation: marquee 40s linear infinite; /* Slower than logo marquee */
    will-change: transform;
    width: max-content;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-marquee {
      animation: none;
      transform: translateX(0);
    }
  }
</style>