// src/data/tools/types.ts

export interface Tool {
	name: string;
	icon: string;
	fallback: string;
	url: string;
	description: string;
	category: ToolCategory;
	tags?: string[];
}

export type ToolCategory =
	// Core Development
	| 'framework'     // SvelteKit, Next.js, Astro
	| 'library'       // React, Vue, jQuery
	| 'runtime'       // Node.js, Deno, Bun
	| 'language'      // TypeScript, Python, Rust

	// Backend & Infrastructure
	| 'backend'       // Express, FastAPI, NestJS
	| 'database'      // PostgreSQL, MongoDB, Redis
	| 'auth'          // Auth.js, Clerk, Supabase Auth
	| 'hosting'       // Vercel, Netlify, AWS
	| 'api'          // tRPC, GraphQL, REST

	// Frontend Specific
	| 'design'        // Figma, Sketch, Adobe XD
	| 'css'           // Tailwind, SASS, styled-components
	| 'animation'     // GSAP, Framer Motion, Three.js
	| 'mobile'        // React Native, Flutter, Ionic
	| 'testing'       // Jest, Vitest, Playwright

	// Developer Tools
	| 'ide'           // VS Code, WebStorm, Vim
	| 'version'       // Git, GitHub, GitLab
	| 'productivity'  // Docker, Postman, DevTools
	| 'monitoring'    // Sentry, LogRocket, Analytics

	// Content & Data
	| 'cms'           // WordPress, Strapi, Contentful
	| 'data'          // Pandas, NumPy, R
	| 'analytics'     // Mixpanel, GA4, Posthog
	| 'visualization' // D3.js, Chart.js, Plotly
	| 'dashboard'     // Grafana, Tableau, Streamlit

	// AI & ML
	| 'ai'            // TensorFlow, PyTorch, Hugging Face
	| 'llm'           // LangChain, OpenAI, Claude
	| 'mlops'         // MLflow, Weights & Biases
	| 'vision'        // OpenCV, MediaPipe

	// Build & Deploy
	| 'bundler'       // Vite, webpack, Turbopack
	| 'ci'            // GitHub Actions, Jenkins, Circle CI
	| 'deployment'    // Docker, Kubernetes, Terraform
	| 'edge'          // Cloudflare Workers, Deno Deploy
	;

export type ToolId = keyof typeof tools;