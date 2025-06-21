<!-- src/lib/pages/landing/sections/proof/UserCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from 'lucide-svelte';
  import type { EnhancedTestimonial } from '$data/proof/testimonials/users';
  
  export let testimonial: EnhancedTestimonial;

	
</script>

<div class="relative w-full p-6 pb-8 rounded-xl border border-white/10 bg-card hover:shadow-md shadow-white">
	<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-14 fill-accent absolute bottom-8 right-5" viewBox="0 0 35 30" fill="none"><path d="M22.3838 27.6777C23.5264 28.9961 25.3721 29.6992 27.4814 29.6992C31.6123 29.6992 34.249 26.9746 34.249 22.7559C34.249 18.625 31.5244 15.6367 27.6572 15.6367C26.8662 15.6367 25.9873 15.8125 25.1084 16.0762C24.5811 9.48438 27.833 4.03516 32.2275 2.36523L31.7881 0.871094C24.2295 3.77148 19.4834 11.1543 19.4834 19.8555C19.4834 22.668 20.5381 25.7441 22.3838 27.6777ZM0.499023 19.8555C0.499023 24.6895 3.22363 29.6992 8.49707 29.6992C12.54 29.6992 15.1768 26.9746 15.1768 22.7559C15.1768 18.625 12.4521 15.6367 8.67285 15.6367C7.88184 15.6367 7.00293 15.8125 6.12402 16.0762C5.59668 9.48438 8.84863 4.03516 13.2432 2.36523L12.7158 0.871094C5.24512 3.77148 0.499023 11.1543 0.499023 19.8555Z"></path></svg>
  
	<!-- Quote -->
  <blockquote class="mb-6 text-md font-medium text-muted-foreground leading-relaxed">
    {testimonial.quote.full}
  </blockquote>
  
  <!-- Author Info & CTA -->
  <div class="relative flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="w-11 h-11  rounded-full bg-muted overflow-hidden">
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
          {#if testimonial.company}, {testimonial.company}
          {/if}
        </div>
      </div>
    </div>

    {#if testimonial.hire}
      <Button 
        variant="secondary" 
        size="sm"
        class="absolute -bottom-8 -right-8 -rotate-[8deg] text-sm font-medium 
							group hover:bg-primary hover:text-primary-foreground transform"
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



