export enum OrderSteps {
	PersonalInfo = "Personal Info",
	OrderedFoodItems = "Ordered Food Items",
	CheckoutDetails = "Checkout Details",
	DeliveryAddress = "Delivery Address",
}

export interface CommonFieldValue {
	id: string;
	label: string;
}

export interface SimpleFieldValue extends CommonFieldValue {
	value: string | number;
}

export type FinalRestaurantOrderStep = {
	onRestaurantOrderSubmit: (stepValues: any) => void;
	// onSubmit: (stepValues: Pick<OrderMealStepValues, "deliveryMethods">) => void;
};
