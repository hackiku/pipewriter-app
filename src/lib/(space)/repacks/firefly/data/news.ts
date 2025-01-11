// src/lib/(space)/repacks/firefly/data/news.ts

export type NewsItem = {
	id: string;
	date: string;
	title: string;
	excerpt: string;
	category: 'Press' | 'Mission Update' | 'Company News';
	href: string;
	imageSrc?: string;
};

export type Mission = {
	id: string;
	name: string;
	date: string;
	vehicle: 'Alpha' | 'MLV' | 'Blue Ghost';
	type: 'Launch' | 'Lunar' | 'Orbital';
	status: 'Upcoming' | 'In Progress' | 'Complete';
	customer: string;
	description: string;
	milestones: {
		date: string;
		title: string;
		description: string;
	}[];
};

export const news: NewsItem[] = [
	{
		id: 'ng-contract',
		date: '2024-01-10',
		title: 'Behind the scenes at Rocket Ranch',
		excerpt: 'Get an exclusive look at our Texas facility where we manufacture and test our Alpha launch vehicles.',
		category: 'Press',
		href: '/news/rocket-ranch-tour',
		imageSrc: '/repacks/firefly/news/rocket-ranch.jpg'
	},
	{
		id: 'nasa-contract',
		date: '2024-01-08',
		title: 'NASA Selects Blue Ghost for Lunar Night Survival Demo',
		excerpt: 'Our lunar lander will demonstrate critical technologies for surviving the extreme cold of lunar nights.',
		category: 'Company News',
		href: '/news/nasa-night-survival',
		imageSrc: '/repacks/firefly/news/blue-ghost-nasa.jpg'
	},
	{
		id: 'alpha-success',
		date: '2024-01-05',
		title: 'Alpha Successfully Delivers VICTUS NROL-424 to Orbit',
		excerpt: 'Our fourth successful Alpha launch demonstrates growing capabilities in responsive space access.',
		category: 'Mission Update',
		href: '/news/alpha-nrol-424',
		imageSrc: '/repacks/firefly/news/alpha-launch.jpg'
	},
	{
		id: 'blue-ghost-ready',
		date: '2024-01-03',
		title: 'Blue Ghost Mission 1 Ready for Launch',
		excerpt: 'Final preparations underway for our first lunar mission carrying NASA and commercial payloads.',
		category: 'Mission Update',
		href: '/news/blue-ghost-ready',
		imageSrc: '/repacks/firefly/news/blue-ghost-prep.jpg'
	}
];

export const upcomingMissions: Mission[] = [
	{
		id: 'blue-ghost-m1',
		name: 'Blue Ghost Mission 1',
		date: '2024-01-15',
		vehicle: 'Blue Ghost',
		type: 'Lunar',
		status: 'Upcoming',
		customer: 'NASA Commercial Lunar Payload Services',
		description: 'First lunar landing mission delivering NASA and commercial payloads to Mare Crisium.',
		milestones: [
			{
				date: '2024-01-15',
				title: 'Launch',
				description: 'Liftoff from Cape Canaveral SLC-37'
			},
			{
				date: '2024-01-16',
				title: 'Trans-Lunar Injection',
				description: 'Spacecraft begins journey to the Moon'
			},
			{
				date: '2024-02-14',
				title: 'Lunar Orbit Insertion',
				description: 'Capture into lunar orbit'
			},
			{
				date: '2024-02-24',
				title: 'Landing',
				description: 'Touchdown at Mare Crisium'
			}
		]
	}
];

export const companyStats = {
	founded: 2014,
	launches: 4,
	successRate: 100,
	payloadsDelivered: 12,
	enginesTested: 78,
	locations: [
		{
			name: 'Headquarters & Manufacturing',
			city: 'Cedar Park',
			state: 'Texas'
		},
		{
			name: 'Launch Operations',
			city: 'Cape Canaveral',
			state: 'Florida'
		},
		{
			name: 'Test Facility',
			city: 'Briggs',
			state: 'Texas'
		}
	]
};

export const resonanceData = {
	videoId: 'your-video-id',
	criticalFrequencies: [
		{
			note: 'G5',
			frequency: 783.99,
			description: 'Primary structure resonant mode'
		},
		{
			note: 'D6',
			frequency: 1174.66,
			description: 'Secondary harmonic'
		}
	]
};

export const launchVehicles = [
	{
		name: 'Alpha',
		type: 'Small-lift launch vehicle',
		payload: {
			leo: '1,170 kg',
			sso: '745 kg'
		},
		height: '29.5 m',
		diameter: '1.8 m',
		stages: 2,
		engines: {
			firstStage: '4 x Reaver 1',
			secondStage: '1 x Lightning 1'
		}
	},
	{
		name: 'MLV',
		type: 'Medium-lift launch vehicle',
		payload: {
			leo: '13,000 kg',
			gto: '5,000 kg'
		},
		height: '50 m',
		diameter: '3.7 m',
		stages: 2,
		engines: {
			firstStage: 'In development',
			secondStage: 'In development'
		}
	}
];