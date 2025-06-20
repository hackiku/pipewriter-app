// lib/components/cta/email/styles.ts
import { cn } from '$lib/utils';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default';

interface StyleConfig {
	form: (opts: { wrap: boolean; size: Size; className?: string }) => string;
	input: (size: Size) => string;
	button: (size: Size, wrap: boolean) => string;
	success: (size: Size) => string;
}

export const defaultProps = {
	buttonText: "Loop me in",
	size: 'default' as Size,
	wrap: false,
	source: 'Website',
	className: '',
};

export const styles: StyleConfig = {
	form: ({ wrap, size, className = '' }) => cn(
		"w-full flex",
		wrap ? "flex-col" : "flex-col sm:flex-row",
		"gap-3",
		size === "default" ? "max-w-2xl" : "max-w-xl",
		className
	),

	input: (size) => cn(
		"w-full pl-11",
		"rounded-lg border border-gray-200 dark:border-gray-800",
		"bg-white dark:bg-gray-950",
		"focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
		"placeholder:text-gray-400 dark:placeholder:text-gray-600",
		"transition-shadow duration-200",
		// Fixed heights to match button exactly
		size === "xs" ? "pr-3 py-2 text-sm h-8" :
			size === "sm" ? "pr-4 py-2.5 text-base h-9" :
				size === "default" || size === "md" ? "pr-6 py-3.5 text-lg h-11" :
					size === "lg" ? "pr-8 py-4 text-xl h-12" :
						"pr-8 py-4.5 text-2xl h-14"  // xl
	),

	button: (size, wrap) => cn(
		"rounded-lg text-white font-medium relative",
		"bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
		"hover:shadow-lg hover:shadow-primary/20",
		"focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
		"transition-all duration-200 ease-out",
		"disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none",
		wrap ? "w-full" : "w-full sm:w-auto",
		// Matching heights with input
		size === "xs" ? "px-4 text-sm h-8" :
			size === "sm" ? "px-6 text-base h-9" :
				size === "default" || size === "md" ? "px-8 text-lg h-11" :
					size === "lg" ? "px-10 text-xl h-12" :
						"px-12 text-2xl h-14"  // xl
	),

	success: (size) => cn(
		"w-full p-6 rounded-lg",
		"bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
		"text-white text-center relative",
		size === "default" ? "max-w-2xl" : "max-w-xl"
	)
};