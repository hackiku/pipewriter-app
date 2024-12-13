<!-- $lib/pages/about/TeamGrid.svelte -->
<script lang="ts">
  import { team } from "./data/team";
  import { fade } from "svelte/transition";
  import { 
    Card,
    CardContent
  } from "$lib/components/ui/card";
  import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from "lucide-svelte";

  let loadedImages = new Set<string>();
  
  function onImageLoad(memberName: string) {
    loadedImages = loadedImages.add(memberName);
  }
</script>

<div class="grid sm:grid-cols-2 gap-8">
  {#each team as member}
    <div in:fade={{ duration: 200, delay: 50 }}>
      <Card class="relative overflow-visible group">
        <CardContent class="pt-6">
          <!-- Main content flex row -->
          <div class="flex gap-6 items-start">
            <Avatar class="w-24 h-24 shrink-0 ring-2 ring-offset-2 ring-offset-background ring-border">
              <div class="w-full h-full">
                <AvatarImage
                  src={member.image}
                  alt={`${member.firstName} ${member.lastName}`}
                  class="object-cover"
                  on:load={() => onImageLoad(member.firstName)}
                />
                <AvatarFallback class="text-2xl">{member.fallback}</AvatarFallback>
              </div>
            </Avatar>

            <div class="flex-1 min-w-0 space-y-2">
              <div>
                <h3 class="font-medium text-lg leading-none">
                  {member.firstName} {member.lastName}
                </h3>
                <p class="text-sm text-primary mt-1">
                  {member.profession}
                </p>
              </div>

              <!-- Role description -->
              <p class="text-sm text-muted-foreground leading-normal">
                {member.role}
              </p>
            </div>
          </div>

          <!-- Sticker-like button -->
          {#if member.link}
            <div class="absolute -bottom-3 -left-2 rotate-[-4deg] transform-gpu">
              <Button 
                variant="outline" 
                size="sm"
                class="gap-1.5 shadow-sm hover:shadow-md transition-shadow duration-200
                       bg-background hover:bg-background group/button"
                href={member.link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="font-medium">{member.link.text}</span>
                <ExternalLink 
                  class="w-3 h-3 opacity-70 -rotate-12 transition-transform duration-300 
                         group-hover/button:rotate-0" 
                />
              </Button>
            </div>
          {/if}
        </CardContent>
      </Card>
    </div>
  {/each}
</div>

<!-- <style>
  :global(.group) {
    transition: transform 0.3s ease-in-out;
  }
  :global(.group:hover) {
    transform: translateY(-2px);
  }
</style> -->