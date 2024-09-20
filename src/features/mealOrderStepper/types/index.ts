import { OrderMealStepValues } from "@services/api/types";

export enum FoodOrderStep {
	MealOrderStep = "mealOrder",
	AddressDetails = "addressDetails",
	DeliveryMethods = "deliveryMethods",
}

export type FinalBookingOrderStep = {
	onSubmit: (stepValues: Pick<OrderMealStepValues, "deliveryMethods">) => void;
};
