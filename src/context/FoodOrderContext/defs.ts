import { FoodOrderStep } from "@features/mealOrderStepper/types";
import { AddressDetailsStep, DeliveryMethodsStep, MealOrderStep } from "@services/api/types";
import { Dispatch } from "react";
import { BaseProps } from "types/defs";

export type FoodOrderProps = BaseProps;

export type FoodOrderActions =
	| { type: "SET_CURRENT_STEP"; payload: FoodOrderStep }
	| { type: "SET_MEAL_ORDER"; payload: MealOrderStep }
	| {
			type: "SET_ADDRESS_DETAILS";
			payload: AddressDetailsStep;
	  }
	| {
			type: "SET_DELIVERY_METHODS";
			payload: DeliveryMethodsStep;
	  };

export type FoodOrderState = {
	mealOrderStep?: MealOrderStep;
	currentStep: FoodOrderStep;
	addressDetailsStep?: AddressDetailsStep;
	deliveryMethodsStep?: DeliveryMethodsStep;
};

export type FoodOrderInit = FoodOrderState & {
	dispatch: Dispatch<FoodOrderActions>;
};
