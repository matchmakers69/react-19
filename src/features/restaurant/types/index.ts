export enum OrderSteps {
	personalInfo = "Personal Info",
	orderedFoodItems = "Ordered Food Items",
	checkoutDetails = "Checkout Details",
	deliveryAddress = "Delivery Address",
}

export interface CommonFieldValue {
	id: string | number;
	label: string;
}

export interface SimpleFieldValue extends CommonFieldValue {
	value: string | number;
}

export interface PersonalInfo extends CommonFieldValue {
	value: string | number;
}

export interface DeliveryMethod extends CommonFieldValue {
	value: string | number;
}

export interface OrderedFoodItem {
	label: string;
	starters?: StarterItem[];
	drinks?: DrinkItem[];
	sandwiches?: SandwichItem[];
}

export interface StarterItem {
	id: string | number;
	label: string;
	price?: string | null;
	qnt?: number | null;
}

export interface DrinkItem {
	id: string | number;
	label: string;
	price: string;
	qnt: number;
}

export interface SandwichItem {
	id: string | number;
	label: string;
	price: string;
	qnt: number;
}
export interface CheckoutDetail {
	id?: string | number;
	label: string;
	paymentMethod: string[];
	deliveryWithin: string[];
}

export interface OrderData {
	// Also double check RestaurantOrder type where dynamic keys were used
	personalInfo: InfoField[];
	orderedFoodItems: OrderedFoodItem[];
	checkoutDetails: CheckoutDetail[];
	deliveryAddress: InfoField[];
}

export interface InfoField {
	id: string | number;
	label: string;
	value: string | number;
}

export type FinalRestaurantOrderStep = {
	onRestaurantOrderSubmit: (stepValues: any) => void;
	// onSubmit: (stepValues: Pick<OrderMealStepValues, "deliveryMethods">) => void;
};
