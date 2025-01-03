// src/lib/pages/free/components/cta/formatStyles.ts

import type { ElementType } from '../../types';
import type { ExportFormat } from '../../stores/exportStore';

type StyleConfig = {
	[key in ElementType]: string | ((text: string) => string);
} & {
	wrapper: (content: string) => string;
};

export const formatStyles: Record<ExportFormat, StyleConfig> = {
	text: {
		wrapper: content => content,
		h1: 'font-bold text-2xl',
		h2: 'font-bold text-xl',
		h3: 'font-bold text-lg',
		text: 'text-base',
		button: 'text-primary font-medium',
		quote: 'italic text-muted-foreground',
		label: 'text-sm text-muted-foreground',
		emoji: 'text-2xl',
		image: 'text-sm italic text-muted-foreground'
	},

	html: {
		wrapper: content => `<div class="content-html">\n${content}\n</div>`,
		h1: text => `<h1 class="text-4xl font-bold mb-4">${text}</h1>`,
		h2: text => `<h2 class="text-2xl font-semibold mb-3">${text}</h2>`,
		h3: text => `<h3 class="text-xl font-medium mb-2">${text}</h3>`,
		text: text => `<p class="text-base mb-2">${text}</p>`,
		button: text => `<button class="text-primary font-medium">${text}</button>`,
		quote: text => `<blockquote class="italic text-muted-foreground">${text}</blockquote>`,
		label: text => `<label class="text-sm text-muted-foreground">${text}</label>`,
		emoji: text => `<span class="text-2xl">${text}</span>`,
		image: text => `<img src="${text}" alt="" class="max-w-full h-auto" />`
	},

	react: {
		wrapper: content => `const Component = () => (\n  <div className="content-react">\n${content}  </div>\n)\n\nexport default Component`,
		h1: text => `    <h1 className="text-4xl font-bold mb-4">${text}</h1>`,
		h2: text => `    <h2 className="text-2xl font-semibold mb-3">${text}</h2>`,
		h3: text => `    <h3 className="text-xl font-medium mb-2">${text}</h3>`,
		text: text => `    <p className="text-base mb-2">${text}</p>`,
		button: text => `    <Button>${text}</Button>`,
		quote: text => `    <blockquote className="italic text-muted-foreground">${text}</blockquote>`,
		label: text => `    <Label>${text}</Label>`,
		emoji: text => `    <span className="text-2xl">${text}</span>`,
		image: text => `    <Image src="${text}" alt="" className="max-w-full h-auto" />`
	},

	markdown: {
		wrapper: content => content,
		h1: text => `# ${text}`,
		h2: text => `## ${text}`,
		h3: text => `### ${text}`,
		text: text => text,
		button: text => `[${text}]`,
		quote: text => `> ${text}`,
		label: text => `**${text}**`,
		emoji: text => text,
		image: text => `![](${text})`
	}
};