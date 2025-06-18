// $data/navigation/types.ts

export interface NavItem {
	href: string;
	label: string;
	onClick?: () => void;
}

export interface SocialLink {
	name: string;
	url: string;
	svg: string;
	ariaLabel: string;
}

export interface FooterSection {
	title: string;
	items: NavItem[];
}