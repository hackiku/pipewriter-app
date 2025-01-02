<!-- src/lib/pages/space/About.svelte -->

<script lang="ts">
  import { Rocket, Code, Send } from "lucide-svelte";
</script>

<div class="container">
  <div class="grid lg:grid-cols-2 gap-16 items-center">
    <!-- Content -->
    <div class="space-y-6">
      <h3 class="text-2xl font-semibold">Hi, I'm Ivan 👋</h3>
      
      <div class="space-y-4 text-muted-foreground">
        <p class="text-lg">
          After years in SaaS and technical writing, I found my true calling in aerospace UX. 
          Now I'm building tools that help space companies communicate their technical excellence.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-primary">
            <Code class="w-5 h-5" />
            <span class="font-medium">Clean Code</span>
          </div>
          <p class="text-sm text-muted-foreground">
            Pure, semantic code in your stack of choice
          </p>
        </div>
        
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-primary">
            <Rocket class="w-5 h-5" />
            <span class="font-medium">Space Focus</span>
          </div>
          <p class="text-sm text-muted-foreground">
            Deep understanding of aerospace tech
          </p>
        </div>
      </div>
    </div>

    <!-- Image -->
    <div class="relative">
      <div class="absolute inset-0 bg-muted/30 rounded-2xl rotate-3" />
      <div class="relative -rotate-3">
        <img 
          src="/images/space-desk.jpg" 
          alt="Workspace with space memorabilia"
          class="w-full aspect-[4/3] object-cover rounded-2xl"
        />
      </div>
    </div>
  </div>
</div>