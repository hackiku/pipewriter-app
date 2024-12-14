import { defineMDSveXConfig } from 'mdsvex';

const config = defineMDSveXConfig({
	extensions: ['.md'],
	remarkPlugins: [],
	rehypePlugins: [],
	layout: {
		_: './src/lib/layouts/BlogPost.svelte'  // This is optional but recommended
	}
});

export default config;