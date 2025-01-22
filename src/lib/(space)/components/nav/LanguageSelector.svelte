<!-- src/lib/(space)/components/nav/LanguageSelector.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "$lib/components/ui/dropdown-menu";
  
  let currentLang = "EN";
  const languages = [
    { code: "EN", label: "English" },
    { code: "中文", label: "Chinese" }
  ];
  
  function setLanguage(code: string) {
    currentLang = code;
    // Add actual language switching logic here
  }
</script>

<DropdownMenu>
  <DropdownMenuTrigger asChild let:builder>
    <Button 
      builders={builder} 
      variant="ghost" 
      class="relative h-10 w-16 p-0 overflow-hidden group"
    >
      <div class="flex items-center justify-between w-full px-3">
        <span class="font-medium">{currentLang}</span>
        
        <!-- Peek of alternate language with gradient fade -->
        <div class="absolute right-0 top-0 bottom-0 flex items-center">
          <div class="w-6 bg-gradient-to-r from-background to-transparent" />
          <span class="text-muted-foreground/40 pr-2">
            {languages.find(l => l.code !== currentLang)?.code}
          </span>
        </div>
      </div>
    </Button>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent align="end" class="w-32">
    {#each languages as { code, label }}
      <DropdownMenuItem on:click={() => setLanguage(code)}>
        {label}
      </DropdownMenuItem>
    {/each}
  </DropdownMenuContent>
</DropdownMenu>