import { useCallback } from "react";
import { FoodOrderStep } from "../types";
import { useFoodOrderContext } from "@context/FoodOrderContext/FoodOrderContext";

const initialStep = FoodOrderStep.MealOrderStep;
export const useFoodOrderStepper = () => {
	const { dispatch, currentStep } = useFoodOrderContext();

	const handleGoToNextStep = useCallback(() => {
		let nextStep: FoodOrderStep = initialStep;
		switch (currentStep) {
			case FoodOrderStep.MealOrderStep:
				nextStep = FoodOrderStep.AddressDetails;
				break;
			case FoodOrderStep.AddressDetails:
				nextStep = FoodOrderStep.DeliveryMethods;
				break;
			default:
				break;
		}

		dispatch({
			type: "SET_CURRENT_STEP",
			payload: nextStep,
		});
	}, [currentStep]);

	const handleGoToPrevStep = useCallback(() => {
		let prevStep: FoodOrderStep = FoodOrderStep.MealOrderStep;
		switch (currentStep) {
			case FoodOrderStep.DeliveryMethods:
				prevStep = FoodOrderStep.AddressDetails;
				break;

			case FoodOrderStep.AddressDetails:
				prevStep = FoodOrderStep.MealOrderStep;
				break;
			default:
				break;
		}

		dispatch({
			type: "SET_CURRENT_STEP",
			payload: prevStep,
		});
	}, [currentStep]);

	return { currentStep, handleGoToNextStep, handleGoToPrevStep };
};
