// src/lib/pages/free/components/editor/types.ts
export interface EditableProps {
	path: string[];          // Path to content in store e.g. ['hero', 'headline']
	value: string;           // Current value
	className?: string;      // Optional styling classes
}

export interface StylesProps {
	sectionId: string;       // For tracking active section
	className?: string;      // Additional styling
}