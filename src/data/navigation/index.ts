// $lib/data/navigation/index.ts

import {
	GithubIcon,
	LinkedinIcon,
	Instagram,
	ShoppingBag
} from 'lucide-svelte';
import type { NavItem, SocialLink } from './types';
import { contactModalStore } from '$lib/stores/contactModalStore';

export const mainNavItems: NavItem[] = [
	{ href: "/product", label: "Product" },
	{ href: "/pricing", label: "pricing" },
	{ href: "/about", label: "About" },
	// { href: "/ai", label: "AI" },
	{ href: "/blog", label: "Blog" },
	{
		href: "",
		label: "Contact",
		onClick: () => contactModalStore.set(true)
	}
];

export const socialLinks: SocialLink[] = [
	{
		name: "Gumroad",
		url: "https://pipewriter.gumroad.com",
		svg: "icons/gumroad.svg",
		icon: ShoppingBag,
		ariaLabel: "Get Pipewriter on Gumroad",
	},
	{
		name: "LinkedIn",
		url: "https://linkedin.com/in/ivankaraman",
		svg: "icons/linkedin.svg",
		icon: LinkedinIcon,
		ariaLabel: "Connect on LinkedIn",
	},
	{
		name: "GitHub",
		url: "https://github.com/hackiku",
		svg: "icons/github.svg",
		icon: GithubIcon,
		ariaLabel: "View projects on GitHub",
	},
	{
		name: "TikTok",
		url: "https://www.tiktok.com/@pipewriter.io",
		svg: "icons/tiktok.svg",
		icon: GithubIcon,
		ariaLabel: "Follow on TikTok",
	},
	{
		name: "Instagram",
		url: "https://instagram.com/free2lance",
		svg: "icons/instagram.svg",
		icon: Instagram,
		ariaLabel: "Follow on Instagram",
	}
];

// Optional: Add footer-specific sections if you want to structure differently
export const footerSections = {
	quickLinks: {
		title: "Quick Links",
		items: mainNavItems
	},
	// Add more sections as needed
};