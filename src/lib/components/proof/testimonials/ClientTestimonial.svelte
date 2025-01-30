<!-- src/lib/components/proof/testimonials/ClientTestimonial.svelte -->
<script lang="ts">
  import type { Testimonial } from '$data/proof/types';
  
  export let testimonial: Testimonial;
</script>

<div class="relative flex-shrink-0 p-6 rounded-xl border bg-card 
            text-card-foreground shadow-sm hover:shadow-md transition-all
            -rotate-[1deg] hover:rotate-0">
  <div class="space-y-4">
    <blockquote class="text-muted-foreground">"{testimonial.quote}"</blockquote>
    
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
  </div>
</div>