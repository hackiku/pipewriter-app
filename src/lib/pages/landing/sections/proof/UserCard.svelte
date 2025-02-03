<!-- src/lib/pages/landing/sections/proof/UserCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from 'lucide-svelte';
  import type { EnhancedTestimonial } from '$data/proof/testimonials/users';
  
  export let testimonial: EnhancedTestimonial;
</script>

<div class="relative w-full p-6 rounded-xl border border-white/10 bg-card">
  <!-- Quote -->
  <blockquote class="mb-6 text-lg text-muted-foreground leading-relaxed">
    "{testimonial.quote.full}"
  </blockquote>
  
  <!-- Author Info & CTA -->
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-muted overflow-hidden">
        {#if testimonial.imgSrc}
          <img 
            src={testimonial.imgSrc} 
            alt={testimonial.author}
            class="w-full h-full object-cover"
          />
        {/if}
      </div>
      <div>
        <div class="font-medium text-base">{testimonial.author}</div>
        <div class="text-sm text-muted-foreground">
          {testimonial.role}
          {#if testimonial.company}
            , {testimonial.company}
          {/if}
        </div>
      </div>
    </div>

    {#if testimonial.hire}
      <Button 
        variant="outline" 
        size="sm"
        class="group font-medium hover:bg-primary hover:text-primary-foreground"
        href={testimonial.hire.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{testimonial.hire.buttonText}</span>
        <ExternalLink class="w-3.5 h-3.5 ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity" />
      </Button>
    {/if}
  </div>
</div>