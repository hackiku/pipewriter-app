// src/lib/pages/landing/data/stickers.ts

export type StickerConfig = {
	icon: 'docs' | 'drive' | 'chat';
	position: {
		top?: string;
		bottom?: string;
		left?: string;
		right?: string;
	};
	size: {
		width: string;
		height: string;
	};
	rotation: number;
	animation: {
		duration: string;
		delay: string;
	};
}

export const stickerConfigs: Record<string, StickerConfig> = {
	docs: {
		icon: 'docs',
		position: {
			top: '15vh',
			right: '10vw'
		},
		size: {
			width: '10vw',
			height: '10vw'
		},
		rotation: 6,
		animation: {
			duration: '6s',
			delay: '0s'
		}
	},
	drive: {
		icon: 'drive',
		position: {
			bottom: '20vh',
			right: '15vw'
		},
		size: {
			width: '12vw',
			height: '12vw'
		},
		rotation: -12,
		animation: {
			duration: '7s',
			delay: '0.5s'
		}
	},
	keyboard: {
		icon: 'keyboard',
		position: {
			bottom: '25vh',
			left: '10vw'
		},
		size: {
			width: '15vw',
			height: '5vw'
		},
		rotation: 8,
		animation: {
			duration: '5s',
			delay: '1s'
		}
	},
	chat: {
		icon: 'chat',
		position: {
			top: '20vh',
			right: '15vw'
		},
		size: {
			width: '20vw',
			height: '6vw'
		},
		rotation: -4,
		animation: {
			duration: '6.5s',
			delay: '0.75s'
		}
	}
}