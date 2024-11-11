// features/dropper/elements/elements.ts

import { elements } from './data';

export type ThemeType = 'light' | 'dark';

export interface Element {
	id: string;
	category: string;
	description: string;
	theme: ThemeType;
	src?: string;
	alt?: string;
}

export interface ElementsGroup {
	[category: string]: Element[];
}

// Core functions for element management
export class ElementManager {
	private static baseUrl = 'elements'; // SVG assets base URL

	static getAllElements(theme: ThemeType): Element[] {
		return Object.entries(elements).flatMap(([id, config]) => {
			// For light theme, only return base elements
			if (theme === 'light') {
				return [{
					id,
					...config,
					theme,
					src: `${this.baseUrl}/${id}.svg`,
					alt: id.replace(/-/g, ' ')
				}];
			}

			// For dark theme, only return dark variants if available
			if (config.hasDarkVariant) {
				return [{
					id: `${id}-dark`,
					...config,
					theme,
					src: `${this.baseUrl}/${id}-dark.svg`,
					alt: id.replace(/-/g, ' ')
				}];
			}

			return [];
		});
	}

	static groupByCategory(theme: ThemeType): ElementsGroup {
		const allElements = this.getAllElements(theme);

		return allElements.reduce((groups, element) => {
			const category = element.category;
			if (!groups[category]) {
				groups[category] = [];
			}
			groups[category].push(element);
			return groups;
		}, {} as ElementsGroup);
	}

	static getElement(elementId: string): Element | null {
		// Handle dark variants
		const baseId = elementId.replace(/-dark$/, '');
		const isDark = elementId.endsWith('-dark');

		const config = elements[baseId];
		if (!config) return null;

		// Don't return dark variant if element doesn't support it
		if (isDark && !config.hasDarkVariant) return null;

		return {
			id: elementId,
			...config,
			theme: isDark ? 'dark' : 'light',
			src: `${this.baseUrl}/${elementId}.svg`,
			alt: baseId.replace(/-/g, ' ')
		};
	}

	static isValidElement(elementId: string): boolean {
		const baseId = elementId.replace(/-dark$/, '');
		return baseId in elements;
	}
}

// Convenience exports for common operations
export const getAllElements = ElementManager.getAllElements.bind(ElementManager);
export const groupByCategory = ElementManager.groupByCategory.bind(ElementManager);
export const getElement = ElementManager.getElement.bind(ElementManager);
export const isValidElement = ElementManager.isValidElement.bind(ElementManager);