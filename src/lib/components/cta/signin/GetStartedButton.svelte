<!-- src/lib/components/cta/signin/GetStartedButton.svelte -->
<script lang="ts">
  import { ArrowRight, Zap } from "lucide-svelte";
  import { cn } from '$lib/utils';
  
  export let size: "xs" | "sm" | "default" | "lg" = "default";
  export let className = "";
  export let fullWidth = false;
  export let text = "Get Started";
  export let subtext = "";
  export let href = "https://app.pipewriter.io";
  export let source = "default";
  export let variant: "primary" | "outline" | "minimal" = "primary";
  export let showIcon = true;
  
  const dimensions = {
    xs: {
      height: "h-8",
      padding: "px-3",
      text: "text-xs",
      icon: "w-3 h-3"
    },
    sm: {
      height: "h-9", 
      padding: "px-4",
      text: "text-sm",
      icon: "w-4 h-4"
    },
    default: {
      height: "h-11",
      padding: "px-6", 
      text: "text-base",
      icon: "w-4 h-4"
    },
    lg: {
      height: "h-12",
      padding: "px-8",
      text: "text-lg", 
      icon: "w-5 h-5"
    }
  };

  const variants = {
    primary: "bg-gradient-to-r from-[#3644FE] to-[#B345ED] text-white hover:shadow-xl hover:shadow-[#3644FE]/20",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    minimal: "text-primary hover:bg-primary/10"
  };

  // Analytics tracking
  function handleClick() {
    // Track conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'get_started_click', {
        source: source,
        button_text: text
      });
    }
  }
</script>

<a 
  {href}
  class={cn(
    "relative inline-flex items-center justify-center gap-3",
    "rounded-full font-medium transition-all duration-300 ease-out",
    "active:scale-95 group",
    dimensions[size].height,
    dimensions[size].padding,
    variants[variant],
    fullWidth && "w-full max-w-md",
    className
  )}
  on:click={handleClick}
  data-get-started-button
  data-source={source}
>
  <!-- Background effects for primary variant -->
  {#if variant === "primary"}
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-gradient-to-r from-[#3644FE]/20 to-[#B345ED]/20 rounded-full -z-10 blur-xl" />
  {/if}

  <!-- Content -->
  <div class="relative flex items-center justify-center gap-2">
    <!-- Icon -->
    {#if showIcon}
      <Zap class={cn("transition-transform duration-200 group-hover:scale-110", dimensions[size].icon)} />
    {/if}
    
    <!-- Text -->
    <div class="flex flex-col items-start">
      <span class={cn("font-medium", dimensions[size].text)}>{text}</span>
      {#if subtext}
        <span class="text-xs opacity-80 -mt-0.5">{subtext}</span>
      {/if}
    </div>
    
    <!-- Arrow -->
    <ArrowRight class={cn(
      "transition-all duration-200 opacity-70 group-hover:opacity-100",
      "group-hover:translate-x-1",
      dimensions[size].icon
    )} />
  </div>
</a>