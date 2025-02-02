<!-- src/lib/pages/landing/sections/hero/Sticker.svelte -->
<script lang="ts">
  export let icon: 'docs' | 'drive';
  export let rotation = 0;
  export let className = '';
  
  const strokeWidth = 32;
  const strokeColor = "white"; 
</script>

<div class="sticker-wrapper {className}" style="transform: rotate({rotation}deg)">
    {#if icon === 'docs'}
      <svg viewBox="-20 -20 108 128" class="icon" xmlns="http://www.w3.org/2000/svg">
        <!-- Expanded viewbox gives room for the stroke -->
        <path 
          d="M58,88H6c-3.3,0-6-2.7-6-6V6c0-3.3,2.7-6,6-6h36l22,22v60c0,3.3-2.7,6-6,6z"
          stroke={strokeColor}
          stroke-width={strokeWidth}
          stroke-linejoin="round"
          class="outline-path"
        />
        
        <!-- Original paths -->
        <path d="M58,88H6c-3.3,0-6-2.7-6-6V6c0-3.3,2.7-6,6-6h36l22,22v60c0,3.3-2.7,6-6,6z" 
              fill="#3086F6"/>
        <path d="M42,0l22,22H42V0z" fill="#0C67D6"/>
        <path d="M50,39H14v-5h36v5zM50,46H14v5h36v-5zM40,58H14v5h26v-5z" 
              fill="#FFFFFF"/>
      </svg>
    {:else if icon === 'drive'}
      <svg viewBox="-20 -20 128 128" class="icon" xmlns="http://www.w3.org/2000/svg">
        <!-- Unified outer path for better stroke coverage -->
        <path 
          d="M43.65,25L57.4,1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.4c-1.6,0-3.15.45-4.5,1.2L16.15,25L43.65,25z
             M73.4,26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65,25l16.15,28h27.45c0-1.55-.4-3.1-1.2-4.5L73.4,26.5z
             M59.8,53H27.5L13.75,76.8c1.35.8,2.9,1.2,4.5,1.2h50.8c1.6,0,3.15-.45,4.5-1.2L59.8,53z"
          stroke={strokeColor}
          stroke-width={strokeWidth}
          stroke-linejoin="round"
          stroke-linecap="round"
          class="outline-path"
        />
        
        <!-- Original colored sections -->
        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" 
              fill="#0066da"/>
        <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" 
              fill="#00ac47"/>
        <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" 
              fill="#ea4335"/>
        <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" 
              fill="#00832d"/>
        <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" 
              fill="#2684fc"/>
        <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" 
              fill="#ffba00"/>
      </svg>
    {/if}
</div>

<style>
  .sticker-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  :global(.dark) .outline-path {
    stroke: theme('colors.zinc.800');
  }
</style>