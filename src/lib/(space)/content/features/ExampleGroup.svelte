<!-- src/lib/(space)/content/features/ExampleGroup.svelte -->
<script lang="ts">
  import ExampleCard from './ExampleCard.svelte';
  import type { UXExample } from '../../types';
  
  export let example: UXExample;
  export let highlighted = false;
</script>

<div class="relative">
  <!-- Bad Example Card -->
  <div class="relative z-[1]">
    <ExampleCard 
      example={example.bad}
      type="bad"
      size={example.size}
      {highlighted}
    />
  </div>
  
  <!-- Good Example Card -->
  <div 
    class="relative"
    style="
      margin-top: -2rem;
      margin-left: 2rem;
      z-index: 2;
    "
  >
    <ExampleCard 
      example={example.good}
      type="good"
      size={example.size}
      {highlighted}
    />
  </div>
</div>