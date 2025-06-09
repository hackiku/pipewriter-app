<!-- src/lib/pages/pricing/sections/hero/Hero.svelte -->
<script lang="ts">
  import { FileText, Zap } from "lucide-svelte";
</script>

<section class="relative pt-32 pb-16">
  <div class="container mx-auto px-4">
    <div class="text-center space-y-8 max-w-4xl mx-auto">
      
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full
                  bg-gradient-to-r from-[#3644FE]/10 to-[#B345ED]/10 
                  border border-primary/20">
        <Zap class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-primary">
          Professional Wireframing in Google Docs
        </span>
      </div>
      
      <!-- Main headline -->
      <h1 class="text-[4vh] md:text-[6vh] lg:text-[7vh]
                 font-bold leading-[1.1] tracking-tight
                 text-[#171717] dark:text-[#CFCFCF]">
        Choose Your<br>
        <span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
                     bg-clip-text text-transparent">
          Wireframing
        </span> Plan
      </h1>
      
      <!-- Subheadline -->
      <p class="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        From free essential tools to professional bundles with premium templates.
        Start building better products where you already write.
      </p>

      <!-- Value props -->
      <div class="grid md:grid-cols-3 gap-8 pt-8 max-w-3xl mx-auto">
        <div class="flex flex-col items-center text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText class="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 class="font-medium mb-1">Native Integration</h3>
            <p class="text-sm text-muted-foreground">Works directly in Google Docs sidebar</p>
          </div>
        </div>
        
        <div class="flex flex-col items-center text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span class="text-primary font-bold">84+</span>
          </div>
          <div>
            <h3 class="font-medium mb-1">UI Elements</h3>
            <p class="text-sm text-muted-foreground">Professional wireframe components</p>
          </div>
        </div>
        
        <div class="flex flex-col items-center text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span class="text-primary font-bold text-sm">14d</span>
          </div>
          <div>
            <h3 class="font-medium mb-1">Free Trial</h3>
            <p class="text-sm text-muted-foreground">Full access to test everything</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>