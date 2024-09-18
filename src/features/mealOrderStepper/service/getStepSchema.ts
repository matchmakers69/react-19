import { z } from "zod";
import { orderMealStepValuesSchema } from "../components/MealOrderWizard/schema/mealOrderStepsSchema";
import { FoodOrderStep } from "../types";

export const getStepSchema = (currentStep: FoodOrderStep) => {
	switch (currentStep) {
		case FoodOrderStep.MealOrderStep:
			return z.object({
				order: orderMealStepValuesSchema.shape.order,
			});
		case FoodOrderStep.AddressDetails:
			return z.object({
				addressDetails: orderMealStepValuesSchema.shape.addressDetails,
			});
		case FoodOrderStep.DeliveryMethods:
			return z.object({
				deliveryMethods: orderMealStepValuesSchema.shape.deliveryMethods,
			});
		default:
			console.error("Invalid step detected:", currentStep);
			return z.object({}); // Safe fallback schema
		//return orderMealStepValuesSchema;
	}
};
