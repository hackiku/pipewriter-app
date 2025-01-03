// src/lib/pages/free/stores/exportStore.ts
import { writable } from 'svelte/store';
import type { ContentStructure, ContentElement, ElementType } from '../types';

export type ExportFormat = 'text' | 'html' | 'react' | 'markdown';

interface ExportState {
	dialogOpen: boolean;
	selectedFormat: ExportFormat;
	lastExported: ExportFormat | null;
}

// Common Tailwind classes for consistent styling
const commonStyles = {
	h1: 'text-4xl font-bold mb-6',
	h2: 'text-2xl font-semibold mb-4',
	h3: 'text-xl font-medium mb-3',
	text: 'text-base mb-4',
	button: 'inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
	quote: 'pl-4 border-l-4 border-muted italic text-muted-foreground',
	label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
	emoji: 'text-2xl',
	image: 'max-w-full h-auto rounded-lg'
};

// Format specific configurations
const formatters: Record<ExportFormat, Record<ElementType, {
	prefix?: string;
	suffix?: string;
	wrapper?: (content: string) => string;
	className?: string;
}>> = {
	text: {
		h1: { className: 'font-bold text-2xl' },
		h2: { className: 'font-bold text-xl' },
		h3: { className: 'font-bold text-lg' },
		text: { className: 'text-base' },
		button: { className: 'text-primary font-medium' },
		quote: { prefix: '"', suffix: '"', className: 'italic text-muted-foreground' },
		label: { className: 'text-sm text-muted-foreground' },
		emoji: { className: 'text-2xl' },
		image: { prefix: '[Image: ', suffix: ']', className: 'text-sm italic' }
	},

	html: {
		h1: { wrapper: content => `<!-- Heading 1 -->\n<h1 class="${commonStyles.h1}">${content}</h1>` },
		h2: { wrapper: content => `<!-- Heading 2 -->\n<h2 class="${commonStyles.h2}">${content}</h2>` },
		h3: { wrapper: content => `<!-- Heading 3 -->\n<h3 class="${commonStyles.h3}">${content}</h3>` },
		text: { wrapper: content => `<p class="${commonStyles.text}">${content}</p>` },
		button: { wrapper: content => `<button class="${commonStyles.button}">${content}</button>` },
		quote: { wrapper: content => `<blockquote class="${commonStyles.quote}">${content}</blockquote>` },
		label: { wrapper: content => `<label class="${commonStyles.label}">${content}</label>` },
		emoji: { wrapper: content => `<span class="${commonStyles.emoji}">${content}</span>` },
		image: { wrapper: content => `<img src="${content}" alt="" class="${commonStyles.image}" />` }
	},

	react: {
		h1: { wrapper: content => `{/* Heading 1 */}\n<h1 className="${commonStyles.h1}">${content}</h1>` },
		h2: { wrapper: content => `{/* Heading 2 */}\n<h2 className="${commonStyles.h2}">${content}</h2>` },
		h3: { wrapper: content => `{/* Heading 3 */}\n<h3 className="${commonStyles.h3}">${content}</h3>` },
		text: { wrapper: content => `<p className="${commonStyles.text}">${content}</p>` },
		button: { wrapper: content => `<Button className="${commonStyles.button}">${content}</Button>` },
		quote: { wrapper: content => `<blockquote className="${commonStyles.quote}">${content}</blockquote>` },
		label: { wrapper: content => `<Label className="${commonStyles.label}">${content}</Label>` },
		emoji: { wrapper: content => `<span className="${commonStyles.emoji}">${content}</span>` },
		image: { wrapper: content => `<Image src="${content}" alt="" className="${commonStyles.image}" />` }
	},

	markdown: {
		h1: { prefix: '# ' },
		h2: { prefix: '## ' },
		h3: { prefix: '### ' },
		text: {},
		button: { prefix: '[', suffix: '](button)' },
		quote: { prefix: '> ' },
		label: { prefix: '**', suffix: ':**' },
		emoji: {},
		image: { prefix: '![](', suffix: ')' }
	}
};

function formatElement(element: ContentElement, format: ExportFormat): string {
	const formatter = formatters[format][element.type];
	let result = element.value;

	if (formatter.wrapper) {
		return formatter.wrapper(result);
	}

	if (formatter.prefix) {
		result = formatter.prefix + result;
	}
	if (formatter.suffix) {
		result = result + formatter.suffix;
	}

	// Add className for text format
	if (format === 'text' && formatter.className) {
		result = `<div class="${formatter.className}">${result}</div>`;
	}

	return result;
}

function createExportStore() {
	const { subscribe, set, update } = writable<ExportState>({
		dialogOpen: false,
		selectedFormat: 'text',
		lastExported: null
	});

	return {
		subscribe,
		openDialog: () => update(state => ({ ...state, dialogOpen: true })),
		closeDialog: () => update(state => ({ ...state, dialogOpen: false })),
		setFormat: (format: ExportFormat) => update(state => ({ ...state, selectedFormat: format })),
		markExported: () => update(state => ({ ...state, lastExported: state.selectedFormat })),

		formatContent: (content: ContentStructure, format: ExportFormat): string => {
			return content.sections
				.sort((a, b) => a.order - b.order)
				.map(section => {
					let output = `\n/* ${section.id.toUpperCase()} */\n`;

					// Format main elements
					output += section.elements
						.map(element => formatElement(element, format))
						.join('\n');

					// Format children if they exist
					if (section.children) {
						section.children.forEach(child => {
							output += '\n';
							output += child.elements
								.map(element => formatElement(element, format))
								.join('\n');
						});
					}

					return output;
				})
				.join('\n\n');
		},

		getStylesForFormat: (format: ExportFormat) => formatters[format],
		reset: () => set({ dialogOpen: false, selectedFormat: 'text', lastExported: null })
	};
}

export const exportStore = createExportStore();