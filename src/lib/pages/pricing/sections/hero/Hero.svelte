<!-- src/lib/pages/pricing/sections/hero/Hero.svelte -->
<script lang="ts">
  import { FileText, Zap } from "lucide-svelte";
</script>

<!-- <section class="relative pt-32 pb-16"> -->
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
      <h1 class="text-[5vh] md:text-[7vh] lg:text-[10vh]
                 font-bold leading-[1.1] tracking-tight
                 text-[#171717] dark:text-[#CFCFCF]">
        Start
        <span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
                     bg-clip-text text-transparent">
          Wirewriting
        </span> Here
      </h1>
      
      <!-- Subheadline -->
      <p class="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        Pipewriter turns Google Docs into a wireframing app. From free essential tools to professional bundles with premium templates.
        Start building better products where you already write.
      </p>

    </div>
  </div>
<!-- </section> -->