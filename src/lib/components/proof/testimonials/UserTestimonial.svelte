<!-- src/lib/components/proof/testimonials/UserTestimonial.svelte -->
<script lang="ts">
  import type { EnhancedTestimonial } from '$data/proof/testimonials/users';
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from 'lucide-svelte';
  
  export let testimonial: EnhancedTestimonial;
  export let useShortQuote = false;

  $: quote = useShortQuote ? testimonial.quote.short : testimonial.quote.full;
</script>

<div class="relative flex-shrink-0 p-6 rounded-xl border bg-card 
            text-card-foreground shadow-sm hover:shadow-md transition-all
            -rotate-[1deg] hover:rotate-0">
  <div class="space-y-4">
    <blockquote class="text-muted-foreground">"{quote}"</blockquote>
    
    <div class="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div class="flex gap-4 items-center">
        {#if testimonial.imgSrc}
          <div class="w-12 h-12 rounded-full bg-muted overflow-hidden">
            <img 
              src={testimonial.imgSrc} 
              alt={testimonial.author}
              class="w-full h-full object-cover"
            />
          </div>
        {/if}
        
        <div>
          <div class="font-semibold">{testimonial.author}</div>
          <div class="text-sm text-muted-foreground">
            {testimonial.role}
            {#if testimonial.company}
              , {testimonial.company}
            {/if}
          </div>
        </div>
      </div>

      {#if testimonial.hire}
        <div class="rotate-3 hover:rotate-0 transition-transform">
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
        </div>
      {/if}
    </div>
  </div>
</div>