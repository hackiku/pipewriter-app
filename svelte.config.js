import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, defineMDSveXConfig } from 'mdsvex';

const mdsvexConfig = defineMDSveXConfig({
	extensions: ['.md'],
	layout: {
		_: './src/routes/(website)/blog/[slug]/+layout.svelte'
	},
  smartypants: true,
	highlight: {
		highlighter: async (code, lang = 'html') => {
			if (lang) {
				// You could use prism, shiki, or other highlighters
				return `<pre class="language-${lang}"><code>${code}</code></pre>`;
			}
			return '';
		}
	}
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex(mdsvexConfig)
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$data: './src/data'
		},
	},

	// Add .md to the extensions SvelteKit processes
	extensions: ['.svelte', '.md']
};

export default config;