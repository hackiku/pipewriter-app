// src/lib/pages/app/types/index.ts
export type SectionType = 'hero' | 'features' | 'cta' | 'blurbs';

export interface Section {
	id: string;
	type: SectionType;
	visible: boolean;
	order: number;
	content: Record<string, any>;
}

export interface EditorState {
	sections: Section[];
	activeSection: string | null;
	editingField: string | null;
}