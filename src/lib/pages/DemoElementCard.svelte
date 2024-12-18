<!-- src/lib/pages/DemoElementCard.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import { Plus } from 'lucide-svelte';

  interface Element {
    id: string;
    src: string;
    alt: string;
    description: string;
  }

  export let element: Element;

  const buttonClass = cn(
    "group relative w-full h-full p-0 rounded-lg overflow-hidden",
    "transition-all duration-200 ease-out",
    "hover:-translate-y-1 hover:-translate-x-1 hover:rotate-[-2deg]",
    "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.7)]",
    "dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)]",
    "active:translate-y-0 active:translate-x-0 active:shadow-none",
    "bg-white dark:bg-black border border-gray-300 dark:border-gray-700/80",
    "hover:bg-slate-400/30 dark:hover:bg-slate-900/80"
  );
</script>

<div class="relative">
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <Button
        variant="ghost"
        class={buttonClass}
      >
        <div class="relative w-full h-full">
          <img
            src={element.src}
            alt={element.alt}
            class="w-full h-full object-cover group-hover:opacity-40"
          />
          
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Plus class="text-gray-500 dark:text-black" size={30} />
          </div>
        </div>
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>{element.description}</p>
    </Tooltip.Content>
  </Tooltip.Root>
</div>