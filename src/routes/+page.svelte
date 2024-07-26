<script lang="ts">

import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Sun, Moon } from "lucide-svelte";
	import * as Drawer from "$lib/components/ui/drawer";
  import * as Menubar from "$lib/components/ui/menubar";
  import * as Sheet from "$lib/components/ui/sheet";

	import ElementsDropper from "$lib/controls/ElementsDropper.svelte";

  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

	const side = "right";

</script>


<div class="flex justify-between w-screen px-12 py-4">

	<div class="flex items-center gap-1">
		<h1 class="">Pipewriter</h1>
		<!-- <Badge variant="outline">beta</Badge> -->
		<Badge variant="outline">beta</Badge>
	</div>
	
	<Menubar.Root>
		<Menubar.Menu>
			<Menubar.Trigger>File</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Item>
					New Tab
					<Menubar.Shortcut>⌘T</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>New Window</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item>Share</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item>Print</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>


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


<Drawer.Root>
  <Drawer.Trigger>Open</Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description>
    </Drawer.Header>
    <Drawer.Footer>
      <Button>Submit</Button>
      <Drawer.Close>Cancel</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>


<Sheet.Root>
  <Sheet.Trigger>Open sheet</Sheet.Trigger>
  <Sheet.Content {side}>
    <Sheet.Header>
      <Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
      <Sheet.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Sheet.Description>
    </Sheet.Header>
  </Sheet.Content >
</Sheet.Root>

<!-- <ElementsDropper /> -->
