// src/lib/(space)/repacks/firefly/data/vehicles.ts
export const vehicles = [
	{
		id: "alpha",
		name: "Alpha",
		description: "Responsive small-lift launch vehicle capable of delivering 1.1 metric tons to LEO.",
		image: "/vehicles/alpha.jpg",
		specs: {
			height: "29m",
			payload: "1,170 kg",
			thrust: "730 kN",
			orbit: "LEO"
		}
	},
	{
		id: "mlv",
		name: "MLV",
		description: "Medium-lift vehicle delivering up to 13 metric tons to LEO and 8 metric tons to SSO.",
		image: "/vehicles/mlv.jpg",
		specs: {
			height: "50m",
			payload: "13,000 kg",
			thrust: "2,400 kN",
			orbit: "LEO/SSO"
		}
	},
	{
		id: "blue-ghost",
		name: "Blue Ghost",
		description: "Lunar lander designed for precise payload delivery to the Moon's surface.",
		image: "/vehicles/blue-ghost.jpg",
		specs: {
			height: "2m",
			payload: "155 kg",
			thrust: "15 kN",
			orbit: "Lunar"
		}
	},
	{
		id: "orbital",
		name: "Orbital Transfer Vehicle",
		description: "Versatile space tug for payload deployment and orbit raising missions.",
		image: "/vehicles/otv.jpg",
		specs: {
			height: "1.5m",
			payload: "500 kg",
			thrust: "2 kN",
			orbit: "LEO-GEO"
		}
	}
];