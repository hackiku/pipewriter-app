// lib/pages/producthunt/utils/support.ts

interface Supporter {
	email: string;
	name?: string;
	twitter?: string;
	github?: string;
}

export async function addSupporter(data: Supporter) {
	try {
		// TODO: Integrate with your email subscription API
		const response = await fetch('/api/subscribe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...data,
				source: 'producthunt',
				tags: ['ph_supporter']
			}),
		});

		const result = await response.json();
		if (!result.success) {
			throw new Error(result.message);
		}

		return result;
	} catch (error) {
		console.error('Failed to add supporter:', error);
		throw error;
	}
}

export function scrollToForm() {
	const form = document.getElementById('support-form');
	if (form) {
		form.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
}