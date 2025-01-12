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
		wrap ? "flex-col" : "flex-col items-center sm:flex-row",
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
		size === "default" || size === "md" ? "pr-6 py-3.5 text-lg" :
			size === "xs" ? "pr-3 py-2 text-sm" :
				size === "sm" ? "pr-4 py-2.5 text-base" :
					size === "lg" ? "pr-8 py-4 text-xl" :
						"pr-8 py-4 text-2xl"  // xl
	),

	button: (size, wrap) => cn(
		"rounded-lg text-white font-medium relative",
		"bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
		"hover:shadow-lg hover:shadow-primary/20",
		"focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
		"transition-all duration-200 ease-out",
		"disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:shadow-none", // Changed from opacity-50
		wrap ? "w-full" : "w-full sm:w-auto",
		size === "default" || size === "md" ? "px-8 py-3 text-lg" :
			size === "xs" ? "px-4 py-1.5 text-sm" :
				size === "sm" ? "px-6 py-2 text-base" :
					size === "lg" ? "px-10 py-3.5 text-xl" :
						"px-12 py-4 text-2xl"  // xl
	),
	success: (size) => cn(
		"w-full p-6 rounded-lg",
		"bg-gradient-to-r from-[#3644FE] to-[#B345ED]",
		"text-white text-center relative",
		size === "default" ? "max-w-2xl" : "max-w-xl"
	)
};