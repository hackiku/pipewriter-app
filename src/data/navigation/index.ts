// $data/navigation/index.ts

import type { NavItem, SocialLink } from './types';
import { contactModalStore } from '$lib/stores/contactModalStore';

export const mainNavItems: NavItem[] = [
	{ href: "/pricing", label: "Pricing" },
	{ href: "/about", label: "About" },
	{ href: "/blog", label: "Blog" },
	{ href: "/contact", label: "Contact" },
];

export const socialLinks: SocialLink[] = [
	{
		name: "LinkedIn",
		url: "https://linkedin.com/in/ivankaraman",
		svg: "/icons/linkedin.svg",
		ariaLabel: "Connect on LinkedIn",
	},
	{
		name: "Twitter",
		url: "https://x.com/ivan_karaman",
		svg: "/icons/x.svg", // You'll need to add this SVG
		ariaLabel: "Follow on Twitter",
	},
	{
		name: "TikTok",
		url: "https://www.tiktok.com/@pipewriter.io",
		svg: "/icons/tiktok.svg",
		ariaLabel: "Follow on TikTok",
	},
	{
		name: "Instagram",
		url: "https://instagram.com/pipewriter.io",
		svg: "/icons/instagram.svg",
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