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
