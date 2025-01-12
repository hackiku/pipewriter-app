import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			typography: {
				DEFAULT: {
					css: {
						'--tw-prose-body': 'hsl(var(--foreground))',
						'--tw-prose-headings': 'hsl(var(--foreground))',
						'--tw-prose-links': 'hsl(var(--primary))',
						'--tw-prose-bold': 'hsl(var(--foreground))',
						'--tw-prose-counters': 'hsl(var(--muted-foreground))',
						'--tw-prose-bullets': 'hsl(var(--muted-foreground))',
						'--tw-prose-hr': 'hsl(var(--border))',
						'--tw-prose-quotes': 'hsl(var(--foreground))',
						'--tw-prose-quote-borders': 'hsl(var(--border))',
						'--tw-prose-captions': 'hsl(var(--muted-foreground))',
						'--tw-prose-code': 'hsl(var(--foreground))',
						'--tw-prose-pre-code': 'hsl(var(--foreground))',
						'--tw-prose-pre-bg': 'hsl(var(--muted))',
						'--tw-prose-th-borders': 'hsl(var(--border))',
						'--tw-prose-td-borders': 'hsl(var(--border))',

						// Dark mode
						'--tw-prose-invert-body': 'hsl(var(--foreground))',
						'--tw-prose-invert-headings': 'hsl(var(--foreground))',
						'--tw-prose-invert-links': 'hsl(var(--primary))',
						'--tw-prose-invert-bold': 'hsl(var(--foreground))',
						'--tw-prose-invert-counters': 'hsl(var(--muted-foreground))',
						'--tw-prose-invert-bullets': 'hsl(var(--muted-foreground))',
						'--tw-prose-invert-hr': 'hsl(var(--border))',
						'--tw-prose-invert-quotes': 'hsl(var(--foreground))',
						'--tw-prose-invert-quote-borders': 'hsl(var(--border))',
						'--tw-prose-invert-captions': 'hsl(var(--muted-foreground))',
						'--tw-prose-invert-code': 'hsl(var(--foreground))',
						'--tw-prose-invert-pre-code': 'hsl(var(--foreground))',
						'--tw-prose-invert-pre-bg': 'hsl(var(--muted))',
						'--tw-prose-invert-th-borders': 'hsl(var(--border))',
						'--tw-prose-invert-td-borders': 'hsl(var(--border))',

						// Base styles
						maxWidth: 'none',
						color: 'var(--tw-prose-body)',
						fontSize: '1rem',
						lineHeight: '1.75',
					},
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
};

export default config;
