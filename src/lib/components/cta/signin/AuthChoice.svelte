<!-- src/lib/components/cta/signin/AuthChoice.svelte -->
<script lang="ts">
  import GetStartedButton from './GetStartedButton.svelte';
  import LogInButton from './LogInButton.svelte';
  import MarketplaceButton from './MarketplaceButton.svelte';
  
  export let layout: "horizontal" | "vertical" | "split" = "horizontal";
  export let showMarketplace = false;
  export let className = "";
  export let source = "auth-choice";
  
  // Customizable text
  export let primaryText = "Get Started";
  export let primarySubtext = "14-day free trial";
  export let secondaryText = "Log In";
  export let dividerText = "or";
</script>

<div class="w-full {className}">
  
  {#if layout === "split"}
    <!-- Split layout - good for landing pages -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- New users -->
      <div class="p-6 rounded-xl border bg-card space-y-4">
        <div class="space-y-2">
          <h3 class="font-semibold">New to Pipewriter?</h3>
          <p class="text-sm text-muted-foreground">
            Start your free trial and explore all Pro features
          </p>
        </div>
        <GetStartedButton 
          fullWidth={true}
          text={primaryText}
          subtext={primarySubtext}
          source="{source}-new"
        />
        {#if showMarketplace}
          <div class="pt-2">
            <MarketplaceButton 
              variant="badge"
              text="Also available on Marketplace"
              showExternal={true}
              source="{source}-marketplace"
              className="w-full justify-center"
            />
          </div>
        {/if}
      </div>
      
      <!-- Existing users -->
      <div class="p-6 rounded-xl border bg-muted/20 space-y-4">
        <div class="space-y-2">
          <h3 class="font-semibold">Already have an account?</h3>
          <p class="text-sm text-muted-foreground">
            Welcome back! Continue where you left off
          </p>
        </div>
        <LogInButton 
          variant="button"
          text={secondaryText}
          showArrow={true}
          source="{source}-existing"
          className="w-full justify-center"
          size="lg"
        />
      </div>
    </div>

  {:else if layout === "vertical"}
    <!-- Vertical layout - good for narrow spaces -->
    <div class="flex flex-col items-center gap-4">
      <GetStartedButton 
        fullWidth={true}
        text={primaryText}
        subtext={primarySubtext}
        source="{source}-primary"
      />
      
      <div class="flex items-center gap-3 w-full">
        <hr class="flex-1 border-border" />
        <span class="text-sm text-muted-foreground px-2">{dividerText}</span>
        <hr class="flex-1 border-border" />
      </div>
      
      <LogInButton 
        variant="button"
        text={secondaryText}
        showArrow={true}
        source="{source}-secondary"
        className="w-full justify-center"
        size="default"
      />

      {#if showMarketplace}
        <MarketplaceButton 
          variant="badge"
          showExternal={true}
          source="{source}-marketplace"
        />
      {/if}
    </div>

  {:else}
    <!-- Horizontal layout - good for headers/navs -->
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <GetStartedButton 
        text={primaryText}
        subtext={primarySubtext}
        source="{source}-primary"
      />
      
      <span class="text-sm text-muted-foreground hidden sm:block">{dividerText}</span>
      
      <LogInButton 
        variant="button"
        text={secondaryText}
        showArrow={true}
        source="{source}-secondary"
      />

      {#if showMarketplace}
        <MarketplaceButton 
          variant="icon"
          source="{source}-marketplace"
        />
      {/if}
    </div>
  {/if}
</div>