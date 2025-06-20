import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
	server: {
		fs: {
			allow: ['src/lib/blog/content', 'src/lib/pages/legal/content']
		}
	},
	assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp', '**/*.webm']
});