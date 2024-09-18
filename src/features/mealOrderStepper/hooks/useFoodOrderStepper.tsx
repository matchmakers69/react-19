import { useCallback, useState } from "react";
import { FoodOrderStep } from "../types";

const initialStep = FoodOrderStep.MealOrderStep;
export const useFoodOrderStepper = () => {
	const [currentStep, setCurrentStep] = useState(initialStep);

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

		setCurrentStep(nextStep);
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

		setCurrentStep(prevStep);
	}, [currentStep]);

	return { currentStep, handleGoToNextStep, handleGoToPrevStep };
};
