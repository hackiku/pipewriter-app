// src/lib/pages/product/types/index.ts
export interface Product {
	id: string;
	title: string;
	anchor: string;
	icon: string; // Lucide icon name
}

export interface ProductState {
	activeProduct: string;
	previousProduct: string | null;
	isNavVisible: boolean;
}