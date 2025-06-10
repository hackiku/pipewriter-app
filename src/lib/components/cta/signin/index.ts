// src/lib/components/cta/signin/index.ts

export { default as GetStartedButton } from './GetStartedButton.svelte';
export { default as LogInButton } from './LogInButton.svelte';
export { default as SignUpForm } from './SignUpForm.svelte';
export { default as MarketplaceButton } from './MarketplaceButton.svelte';
export { default as AuthChoice } from './AuthChoice.svelte';

// Type definitions for component props
export interface GetStartedButtonProps {
	size?: "xs" | "sm" | "default" | "lg";
	className?: string;
	fullWidth?: boolean;
	text?: string;
	subtext?: string;
	href?: string;
	source?: string;
	variant?: "primary" | "outline" | "minimal";
	showIcon?: boolean;
}

export interface LogInButtonProps {
	size?: "xs" | "sm" | "default" | "lg";
	className?: string;
	text?: string;
	href?: string;
	source?: string;
	variant?: "link" | "button" | "minimal";
	showIcon?: boolean;
	showArrow?: boolean;
}

export interface SignUpFormProps {
	variant?: "default" | "compact" | "hero";
	showBenefits?: boolean;
	showSocialProof?: boolean;
	className?: string;
}

export interface MarketplaceButtonProps {
	size?: "xs" | "sm" | "default" | "lg";
	variant?: "full" | "compact" | "icon" | "badge";
	className?: string;
	text?: string;
	href?: string;
	source?: string;
	showLogo?: boolean;
	showExternal?: boolean;
}

export interface AuthChoiceProps {
	layout?: "horizontal" | "vertical" | "split";
	showMarketplace?: boolean;
	className?: string;
	source?: string;
	primaryText?: string;
	primarySubtext?: string;
	secondaryText?: string;
	dividerText?: string;
}