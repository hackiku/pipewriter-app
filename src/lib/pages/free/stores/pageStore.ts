// src/lib/pages/free/stores/pageStore.ts
interface PageState {
	sections: {
		id: string
		type: string
		order: number
		visible: boolean
		content: {
			elements: ContentElement[]
			children?: ContentSection[]
		}
	}[]
	ui: {
		activeSection: string | null
		editingField: string | null
		exportFormat: 'html' | 'react' | 'markdown' | 'text'
	}
}

// Single source of truth for initial state:
const DEFAULT_SECTIONS = {
	hero: {
		visible: true,
		order: 0,
		content: {/* ... */ }
	},
	features: {
		visible: true,
		order: 1,
		content: {/* ... */ }
	}
	// etc
};

function createPageStore() {
	const { subscribe, set, update } = writable<PageState>({
		sections: Object.entries(DEFAULT_SECTIONS).map(([id, config]) => ({
			id,
			...config
		})),
		ui: {
			activeSection: null,
			editingField: null,
			exportFormat: 'html'
		}
	});

	return {
		subscribe,
		updateContent: (path: string[], value: string) => {
			update(state => {/* Update specific content */ })
		},
		toggleSection: (id: string) => {
			update(state => {/* Toggle section visibility */ })
		},
		// etc
	}
}