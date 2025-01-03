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
		h1: text => text,
		h2: text => text,
		h3: text => text,
		text: text => text,
		button: text => text,
		quote: text => `"${text}"`,
		label: text => text,
		emoji: text => text,
		image: text => `[Image: ${text}]`
	},

	html: {
		wrapper: content => `<!DOCTYPE html>
<html>
<body>
${content}
</body>
</html>`,
		h1: text => `<h1>${text}</h1>`,
		h2: text => `<h2>${text}</h2>`,
		h3: text => `<h3>${text}</h3>`,
		text: text => `<p>${text}</p>`,
		button: text => `<button>${text}</button>`,
		quote: text => `<blockquote>${text}</blockquote>`,
		label: text => `<label>${text}</label>`,
		emoji: text => `<span>${text}</span>`,
		image: text => `<img src="${text}" alt="" />`
	},

	tailwind: {
		wrapper: content => `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
${content}
</body>
</html>`,
		h1: text => `<h1 class="text-4xl font-bold mb-4">${text}</h1>`,
		h2: text => `<h2 class="text-2xl font-semibold mb-3">${text}</h2>`,
		h3: text => `<h3 class="text-xl font-medium mb-2">${text}</h3>`,
		text: text => `<p class="text-base mb-2">${text}</p>`,
		button: text => `<button class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600">${text}</button>`,
		quote: text => `<blockquote class="pl-4 border-l-4 border-gray-200 italic text-gray-600">${text}</blockquote>`,
		label: text => `<label class="text-sm font-medium leading-none">${text}</label>`,
		emoji: text => `<span class="text-2xl">${text}</span>`,
		image: text => `<img src="${text}" alt="" class="max-w-full h-auto rounded-lg" />`
	},

	react: {
		wrapper: content => `import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="space-y-16">
${content}    </div>
  );
}`,
		h1: text => `      <h1 className="text-4xl font-bold mb-4">${text}</h1>`,
		h2: text => `      <h2 className="text-2xl font-semibold mb-3">${text}</h2>`,
		h3: text => `      <h3 className="text-xl font-medium mb-2">${text}</h3>`,
		text: text => `      <p className="text-base mb-2">${text}</p>`,
		button: text => `      <Button variant="default">${text}</Button>`,
		quote: text => `      <blockquote className="pl-4 border-l-4 border-muted italic text-muted-foreground">${text}</blockquote>`,
		label: text => `      <Label>${text}</Label>`,
		emoji: text => `      <span className="text-2xl">${text}</span>`,
		image: text => `      <Image src="${text}" alt="" className="max-w-full h-auto rounded-lg" />`
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