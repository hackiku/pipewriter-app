<!-- src/lib/pages/landing/sections/hero/Sticker.svelte -->
<script lang="ts">
  export let icon: 'docs' | 'drive' | 'figma';
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
    
			{:else if icon === 'figma'}
      <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
			<!-- <svg viewBox="-20 -20 128 128" class="icon" xmlns="http://www.w3.org/2000/svg"> -->
        <!-- Unified outer path for better stroke coverage -->
				<path d="M19.8516 29.7758C19.8516 27.1435 20.8973 24.619 22.7586 22.7576C24.6199 20.8963 27.1445 19.8506 29.7768 19.8506C32.4091 19.8506 34.9336 20.8963 36.795 22.7576C38.6563 24.619 39.702 27.1435 39.702 29.7758C39.702 32.4081 38.6563 34.9327 36.795 36.794C34.9336 38.6553 32.4091 39.701 29.7768 39.701C27.1445 39.701 24.6199 38.6553 22.7586 36.794C20.8973 34.9327 19.8516 32.4081 19.8516 29.7758Z"
				fill="#1ABCFE"
          stroke={strokeColor}
          stroke-width={strokeWidth}
          stroke-linejoin="round"
          stroke-linecap="round"
          class="outline-path"
        />
        <!-- Original colored sections -->
				<path d="M19.8516 29.7758C19.8516 27.1435 20.8973 24.619 22.7586 22.7576C24.6199 20.8963 27.1445 19.8506 29.7768 19.8506C32.4091 19.8506 34.9336 20.8963 36.795 22.7576C38.6563 24.619 39.702 27.1435 39.702 29.7758C39.702 32.4081 38.6563 34.9327 36.795 36.794C34.9336 38.6553 32.4091 39.701 29.7768 39.701C27.1445 39.701 24.6199 38.6553 22.7586 36.794C20.8973 34.9327 19.8516 32.4081 19.8516 29.7758Z" fill="#1ABCFE"/>
				<path d="M0 49.6264C0 46.9941 1.04569 44.4695 2.90703 42.6082C4.76837 40.7469 7.29289 39.7012 9.92523 39.7012H19.8505V49.6264C19.8505 52.2587 18.8048 54.7833 16.9434 56.6446C15.0821 58.5059 12.5576 59.5516 9.92523 59.5516C7.29289 59.5516 4.76837 58.5059 2.90703 56.6446C1.04569 54.7833 0 52.2587 0 49.6264H0Z" fill="#0ACF83"/>
				<path d="M19.8516 0V19.8505H29.7768C32.4091 19.8505 34.9336 18.8048 36.795 16.9434C38.6563 15.0821 39.702 12.5576 39.702 9.92523C39.702 7.29289 38.6563 4.76837 36.795 2.90703C34.9336 1.04569 32.4091 0 29.7768 0L19.8516 0Z" fill="#FF7262"/>
				<path d="M0 9.92523C0 12.5576 1.04569 15.0821 2.90703 16.9434C4.76837 18.8048 7.29289 19.8505 9.92523 19.8505H19.8505V0H9.92523C7.29289 0 4.76837 1.04569 2.90703 2.90703C1.04569 4.76837 0 7.29289 0 9.92523H0Z" fill="#F24E1E"/>
				<path d="M0 29.7758C0 32.4081 1.04569 34.9327 2.90703 36.794C4.76837 38.6553 7.29289 39.701 9.92523 39.701H19.8505V19.8506H9.92523C7.29289 19.8506 4.76837 20.8963 2.90703 22.7576C1.04569 24.619 0 27.1435 0 29.7758H0Z" fill="#A259FF"/>
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