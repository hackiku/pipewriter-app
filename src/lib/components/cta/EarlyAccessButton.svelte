<!-- $lib/components/cta/EarlyAccessButton.svelte -->
<!-- EarlyAccessButton.svelte -->
<script lang="ts">
  import { ArrowUp } from "lucide-svelte";
  import * as Drawer from "$lib/components/ui/drawer";
  import EarlyAccessDrawer from "./EarlyAccessDrawer.svelte";
  import EarlyAccess from "./EarlyAccess.svelte";
  import { cn } from '$lib/utils';
  
  export let size: "default" | "lg" = "default";
  export let className = "";
  export let fullWidth = false;
  let open = false;
</script>

<Drawer.Root bind:open>
  <Drawer.Trigger asChild>
    <button
      class={cn(
        "relative group overflow-hidden inline-flex items-center",
        "font-medium rounded-lg",
        "bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
        size === "lg" ? "h-12 text-lg px-8" : "h-10 text-base px-6",
        fullWidth ? "w-full max-w-md" : "w-auto",
        "shadow-[4px_4px_0px_0px_rgba(54,68,254,0.7)]",
        "hover:shadow-none",
        "hover:translate-x-[4px] hover:translate-y-[4px]",
        "hover:ring-2 hover:ring-[#B345ED]/30",
        "dark:shadow-[4px_4px_0px_0px_rgba(179,69,237,0.3)]",
        "dark:hover:ring-[#3644FE]/50",
        "transition-all duration-200",
        className
      )}
    >
      <span 
        class="absolute inset-0 bg-gradient-to-r from-[#B345ED] to-[#3644FE] 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      <div class="relative z-10 flex items-center justify-center text-white w-full">
        <div class="flex items-center gap-2">
          <span>Early Access</span>
          <ArrowUp 
            class="w-4 h-4 transform transition-all duration-300 
                  translate-y-2 opacity-0
                  group-hover:translate-y-0 group-hover:opacity-100" 
          />
        </div>
      </div>
    </button>
  </Drawer.Trigger>

  <Drawer.Content class="bg-background">
    <div class="mx-auto w-full">
      <div class="p-4">
        <EarlyAccess />
      </div>

      <Drawer.Footer class="flex justify-center">
        <Drawer.Close>
          <button class="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Close
          </button>
        </Drawer.Close>
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>