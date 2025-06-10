<!-- src/lib/components/cta/signin/LogInButton.svelte -->
<script lang="ts">
  import { LogIn, ArrowRight } from "lucide-svelte";
  import { cn } from '$lib/utils';
  
  export let size: "xs" | "sm" | "default" | "lg" = "default";
  export let className = "";
  export let text = "Log In";
  export let href = "https://app.pipewriter.io/login";
  export let source = "default";
  export let variant: "link" | "button" | "minimal" = "link";
  export let showIcon = true;
  export let showArrow = false;
  
  const dimensions = {
    xs: {
      padding: "px-2 py-1",
      text: "text-xs",
      icon: "w-3 h-3"
    },
    sm: {
      padding: "px-3 py-1.5",
      text: "text-sm", 
      icon: "w-3.5 h-3.5"
    },
    default: {
      padding: "px-4 py-2",
      text: "text-base",
      icon: "w-4 h-4"
    },
    lg: {
      padding: "px-6 py-3",
      text: "text-lg",
      icon: "w-5 h-5"
    }
  };

  const variants = {
    link: "text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline",
    button: "border border-border hover:border-primary hover:bg-muted transition-all rounded-lg",
    minimal: "text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-md"
  };

  // Analytics tracking
  function handleClick() {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'login_click', {
        source: source,
        variant: variant
      });
    }
  }
</script>

<a 
  {href}
  class={cn(
    "inline-flex items-center justify-center gap-2 group",
    "font-medium transition-all duration-200",
    dimensions[size].padding,
    variants[variant],
    className
  )}
  on:click={handleClick}
  data-login-button
  data-source={source}
>
  <!-- Icon -->
  {#if showIcon}
    <LogIn class={cn("transition-transform duration-200 group-hover:scale-110", dimensions[size].icon)} />
  {/if}
  
  <!-- Text -->
  <span class={dimensions[size].text}>{text}</span>
  
  <!-- Optional arrow -->
  {#if showArrow}
    <ArrowRight class={cn(
      "transition-all duration-200 opacity-70 group-hover:opacity-100",
      "group-hover:translate-x-0.5",
      dimensions[size].icon
    )} />
  {/if}
</a>