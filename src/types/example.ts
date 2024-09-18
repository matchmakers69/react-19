type Laptop = {
	type: "laptop";
	screenSize: number;
	graphics: string;
};

type Headphone = {
	type: "headphone";
	ANC: boolean;
};

type Product = {
	name: string;
	price: number;
} & (Laptop | Headphone); // By adding intersection with union we are getting an access to common property type so that we can distinguish between laptop and airPodsPro

export const laptop: Product = {
	type: "laptop", // so we get access to properties only for laptop i.e screenSize property
	screenSize: 19,
	name: "Dell",
	price: 300,
	graphics: "nividia",
};

export const airPodsPro: Product = {
	type: "headphone", // so we get access to properties only for headphone i.e ANC property
	ANC: true,
	name: "airPodsPro2022",
	price: 100,
};
