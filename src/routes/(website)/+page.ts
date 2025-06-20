// src/routes/(website)/+page.ts
// import type { PageLoad } from './$types';

// export const load: PageLoad = async () => {
//   // Only initialize video service on client-side for landing page
//   if (typeof window !== 'undefined') {
//     // Dynamic import to avoid SSR issues
//     const { loomVideoService } = await import('$lib/services/loomVideoService');
    
//     // Initialize video preloading in background
//     loomVideoService.initialize();
//   }

//   return {
//     // No data needed, just trigger video preloading
//   };
// };