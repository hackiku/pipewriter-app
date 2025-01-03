// src/lib/pages/free/stores/exportStore.ts
import { writable } from 'svelte/store';
import type { ContentStructure, ContentElement, ElementType } from '../types';

export type ExportFormat = 'text' | 'html' | 'react' | 'markdown';

interface ExportState {
	dialogOpen: boolean;
	selectedFormat: ExportFormat;
	lastExported: ExportFormat | null;
}

type ElementFormatter = {
	prefix?: string;
	suffix?: string;
	wrapper?: (content: string) => string;
};

const formatters: Record<ExportFormat, Record<ElementType, ElementFormatter>> = {
	text: {
		h1: {},
		h2: {},
		h3: {},
		text: {},
		button: {},
		quote: { prefix: '"', suffix: '"' },
		label: {},
		emoji: {},
		image: { prefix: '[Image: ', suffix: ']' }
	},

	html: {
		h1: { wrapper: content => `<!-- Heading 1 -->\n<h1 class="text-4xl font-bold">${content}</h1>` },
		h2: { wrapper: content => `<!-- Heading 2 -->\n<h2 class="text-2xl font-semibold">${content}</h2>` },
		h3: { wrapper: content => `<!-- Heading 3 -->\n<h3 class="text-xl font-medium">${content}</h3>` },
		text: { wrapper: content => `<p>${content}</p>` },
		button: { wrapper: content => `<button class="btn">${content}</button>` },
		quote: { wrapper: content => `<blockquote>${content}</blockquote>` },
		label: { wrapper: content => `<label>${content}</label>` },
		emoji: { wrapper: content => `<span class="emoji">${content}</span>` },
		image: { wrapper: content => `<img src="${content}" alt="" />` }
	},

	react: {
		h1: { wrapper: content => `{/* Heading 1 */}\n<h1 className="text-4xl font-bold">${content}</h1>` },
		h2: { wrapper: content => `{/* Heading 2 */}\n<h2 className="text-2xl font-semibold">${content}</h2>` },
		h3: { wrapper: content => `{/* Heading 3 */}\n<h3 className="text-xl font-medium">${content}</h3>` },
		text: { wrapper: content => `<p className="text-base">${content}</p>` },
		button: { wrapper: content => `<Button>${content}</Button>` },
		quote: { wrapper: content => `<blockquote className="italic">${content}</blockquote>` },
		label: { wrapper: content => `<Label>${content}</Label>` },
		emoji: { wrapper: content => `<span className="emoji">${content}</span>` },
		image: { wrapper: content => `<Image src="${content}" alt="" />` }
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

		reset: () => set({ dialogOpen: false, selectedFormat: 'text', lastExported: null })
	};
}

export const exportStore = createExportStore();