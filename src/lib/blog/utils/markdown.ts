// lib/blog/utils/markdown.ts
import { marked } from 'marked';
import type { ComponentType } from 'svelte';

interface ComponentRegistry {
	[key: string]: ComponentType;
}

export class MarkdownRenderer {
	private components: ComponentRegistry;

	constructor(components: ComponentRegistry) {
		this.components = components;
		this.setupCustomRenderer();
	}

	private setupCustomRenderer() {
		const renderer = new marked.Renderer();

		renderer.code = (code, language) => {
			if (language === 'demo') {
				// Parse component demo configuration
				const config = JSON.parse(code);
				return `<ComponentDemo name="${config.component}" props={${JSON.stringify(config.props)}} />`;
			}
			return `<pre><code class="language-${language}">${code}</code></pre>`;
		};

		marked.setOptions({ renderer });
	}

	public async render(content: string) {
		// Process custom shortcodes first
		content = content.replace(
			/::(\w+){(.*?)}::/g,
			(_, component, props) => {
				return `<${component} ${props} />`;
			}
		);

		return marked(content);
	}
}