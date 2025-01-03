// src/lib/pages/free/components/editor/types.ts

// Component-specific props types
export interface EditableProps {
	path: string[];          // Path to content in store e.g. ['hero', 'headline']
	value: string;           // Current value
	className?: string;      // Optional styling classes
	placeholder?: string;    // Placeholder text when empty
	multiline?: boolean;     // Allow multiline editing
}

export interface StylesProps {
	sectionId: string;       // For tracking active section
	className?: string;      // Additional styling
	padding?: boolean;       // Control padding around the border effect
}