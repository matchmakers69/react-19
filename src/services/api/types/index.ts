import { CheckoutDetail, CommonFieldValue, SimpleFieldValue } from "@features/restaurant/types";
import { Nationality, Money, Email, DateString, Phone } from "types/defs";

export interface Company {
	name: string;
	description: string;
	contactEmail: string;
	contactPhone: string;
}

export interface Job {
	id: string;
	title: string;
	type: string;
	description: string;
	location: string;
	salary: string;
	company: Company;
}

export interface State {
	id: string;
	label: string;
}

export interface Language {
	id: string;
	label: string;
}

export interface Gender {
	id: string;
	label: string;
}

export interface Skill {
	id: string;
	label: string;
}

export interface Student {
	name: string;
}

// Employee types
export type CreateEmployee = {
	variant: "create";
};

export type EditEmployee = {
	variant: "edit";
	id: string;
};

export interface Employee {
	email: string;
	name: string;
	states: Array<string>;
	gender: string;
	languagesSpoken: Array<string>;
	skills: Array<string>;
	registrationDateAndTime: string;
	formerEmploymentPeriod: readonly [string, string];
	salaryRange: Array<number>;
	isTeacher: boolean;
	students?: Student[];
}

export interface SimpleEmployee {
	id: string;
	label: string;
}

export type EmployeeEdit = Employee & Partial<EditEmployee>;
export type EmployeeCreate = Employee & Partial<CreateEmployee>;
export type EmployeeGet = EditEmployee & Employee;

// Food types
export interface FoodOrder {
	id: string;
	orderSteps: OrderStepType[];
}

export type OrderStepType = MealOrderStep | AddressDetailsStep | DeliveryMethodsStep;

export interface OrderStep {
	name: string;
}

export interface MealOrderStep {
	orderNumber: string;
	email: string;
	telephone: string;
	paymentOptions?: string[];
}

export interface AddressDetailsStep {
	addressLine: string;
	postCode: string;
	city: string;
}

export interface DeliveryMethodsStep {
	quickDelivery: string;
	nextDayDelivery: string;
}

export type OrderStepItem =
	| ({ name: "order" } & MealOrderStep)
	| ({ name: "addressDetails" } & AddressDetailsStep)
	| ({ name: "deliveryMethods" } & DeliveryMethodsStep);

export type OrderMealStepValues = {
	order: MealOrderStep;
	addressDetails: AddressDetailsStep;
	deliveryMethods: DeliveryMethodsStep;
};

export interface BookingInfo {
	isAlreadyBooked?: boolean | null;
}

// Workers
export type WorkerSkill = string;

export type ContractType = "contract" | "permanent";

export type WorkerData = {
	data: Worker[];
	items?: number | null;
	next?: number | null;
	prev?: number | null;
	pages?: number | null;
};

export type Worker = {
	id: number;
	nationality: Nationality;
	departmentId: number;
	keycardId: string;
	account: string;
	salary: Money;
	office: [string, string];
	firstName: string;
	lastName: string;
	title: string;
	contractType: ContractType;
	email: Email;
	hiredAt: DateString;
	expiresAt: DateString;
	personalInfo: {
		age: number;
		phone: Phone;
		email: Email;
		dateOfBirth: DateString;
		address: {
			street: string;
			city: string;
			country: string;
		};
	};
	skills: Skill[];
	bio: string;
	imgURL: string;
};

export type Benefit = {
	id: string;
	beneficiary: {
		name: string;
		email: Email;
	};
	country: string;
	city: string;
	service: string;
	monthlyFee: number;
	subscribedAtDate: string;
};

export type Project = {
	id: string;
	name: string;
	budget: Money;
	startDate: string;
	endDate: string;
	team: {
		id: number;
		name: string;
	}[];
	manager: number;
	description: string;
};

// Restaurant

export interface FoodItem extends CommonFieldValue {
	price: string;
	qnt: number;
}

// export interface FoodOrderCategory extends CommonFieldValue {
// 	drinks: FoodItem[];
// 	sandwiches: FoodItem[];
// }

export interface OptionsInputField {
	[key: string]: string[] | string;
}

// type InputFieldInsideTab = SimpleFieldValue | FoodOrderCategory | OptionsInputField;

export interface RestaurantOrder {
	// [stepName: string]: InputFieldInsideTab[];
	personalInfo: SimpleFieldValue[];
	orderedFoodItems: FoodItem[];
	checkoutDetails: CheckoutDetail[];
	deliveryAddress: SimpleFieldValue[];
}

// Quiz types

export type Likes = {
	[key: string]: number;
};

export interface QuizCategory {
	id: string;
	title: string;
	description: string;
	likes?: { [t in string]: number } & Likes;
	hasLikes?: boolean | null;
	questions?: { questionText: string }[] | undefined;
	image?: string | null;
}

export interface QuizCategoryImage {
	path: string;
	caption: string;
	id: string;
}
