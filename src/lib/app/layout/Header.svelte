<!-- $lib/app/layout/Header.svelte -->

<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Sun, Moon, PenTool } from "lucide-svelte";
  import * as Menubar from "$lib/components/ui/menubar";
  import { goto } from "$app/navigation";

  function navigateTo(path: string) {
    goto(path);
  }
</script>

<div class="flex justify-between px-12 py-4">
  <div class="flex items-center gap-1">
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>
          <PenTool class="w-5 h-5" />
        </Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Clear all</Menubar.Item>
          <Menubar.Item on:click={() => navigateTo("/")}>
            Home
            <Menubar.Shortcut>⌘H</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item on:click={() => navigateTo("/gdocs")}>
						Docs app
            <Menubar.Shortcut>⌘D</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Separator />
					<Menubar.Item on:click={() => navigateTo("https://drive.google.com/drive/u/2/folders/1k3ZaPn-J_xHSUV0YrpyvAvNuD-uFsuu_")}>
						Templates</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  </div>

  <div class="flex items-center gap-2">
    <Button on:click={toggleMode} variant="outline" size="icon">
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>

    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
  </div>
</div>