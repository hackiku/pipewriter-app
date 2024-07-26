import { writable } from 'svelte/store';

export const sections = writable([
	{
		type: 'hero',
		data: {
			title: "Welcome to Pipewriter",
			subtitle: "Create beautiful wireframes in minutes"
		}
	},
	{
		type: 'blurbs',
		data: {
			items: [
				{ title: "Easy to Use", content: "Intuitive drag-and-drop interface" },
				{ title: "Responsive", content: "Looks great on all devices" },
				{ title: "Customizable", content: "Tailor to your specific needs" }
			]
		}
	}
]);