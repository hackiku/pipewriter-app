// src/data/templates.ts

export interface DocLink {
	title: string;
	desc: string;
	url: string;
	// type: string = 'drive'; // 
}

export const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1k3ZaPn-J_xHSUV0YrpyvAvNuD-uFsuu_";

export const docLinks: DocLink[] = [
	{
		title: "Empty",
		desc: "Start with a blank document",
		url: "https://docs.google.com/document/d/12dHe768LCwop_nclgiyfRJ2bMq8YrbVGTnT1jWNUisc/"
	},
	{
		title: "Elements",
		desc: "All design elements",
		url: "https://docs.google.com/document/d/1fBHbgvrCayfg6K20g0AU1bXzpSyzNzgJhlBEW1eoaQA/edit?tab=t.0"
	},
	{
		title: "Dark Mode",
		desc: "Dark theme template",
		url: "https://docs.google.com/document/d/1FU1sZ4KdeAv_VcvDexzq6D4F0tffXnuVYAVVeVxz-ik/edit"
	},
	{
		title: "Master docs drive",
		desc: "Dark theme template",
		url: "https://drive.google.com/drive/folders/11-7g4bqX7uj_BKNlllo425kg1pAALSoL"
	}
];