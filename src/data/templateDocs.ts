// src/data/docs.ts

export interface DocLink {
	title: string;
	desc: string;
	url: string;
}

export const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1k3ZaPn-J_xHSUV0YrpyvAvNuD-uFsuu_";

export const docLinks: DocLink[] = [
	{
		title: "Empty Doc",
		desc: "Start with a blank document",
		url: "https://docs.google.com/document/d/1YuT5oGw27bMY4myZsBAbzBYelhy_CSSBUihjWipypYw/edit"
	},
	{
		title: "Normal Template",
		desc: "Light mode with basic elements",
		url: "https://docs.google.com/document/d/1X-mEWo2wuRcVZdA8Y94cFMpUO6tKm8GLxY3ZA8lyulk/edit"
	},
	{
		title: "Full Template",
		desc: "Complete template with examples",
		url: "https://docs.google.com/document/d/1uMdieQCJeBQCvkHs7w9ZiVeEB2_cglkF7ZLgeqvxL0U/edit"
	},
	{
		title: "Dark Mode",
		desc: "Dark theme template",
		url: "https://docs.google.com/document/d/1FU1sZ4KdeAv_VcvDexzq6D4F0tffXnuVYAVVeVxz-ik/edit"
	}
];