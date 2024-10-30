<!-- lib/app/elements/sections/Hero.svelte -->
 
<script lang="ts">
  import Element from '../base/Element.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Pencil, Trash } from 'lucide-svelte';
  
  export let element: {
    id: string;
    type: string;
    props: {
      title: string;
      subtitle: string;
      alignment: 'left' | 'center' | 'right';
    };
  };
  
  function handleEdit() {
    // TODO: Open properties panel
  }
  
  function handleDelete() {
    // TODO: Remove element
  }
</script>

<Element {element} let:isSelected>
  <svelte:fragment slot="controls">
    <Button variant="ghost" size="icon" on:click={handleEdit}>
      <Pencil class="w-4 h-4" />
    </Button>
    <Button variant="ghost" size="icon" on:click={handleDelete}>
      <Trash class="w-4 h-4" />
    </Button>
  </svelte:fragment>
  
  <div class="px-4 py-32 text-{element.props.alignment}">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold mb-4">{element.props.title}</h1>
      <p class="text-xl text-muted-foreground">{element.props.subtitle}</p>
    </div>
  </div>
</Element>