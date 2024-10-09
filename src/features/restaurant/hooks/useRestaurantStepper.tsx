import { ChangeEvent } from "react";
import { OrderSteps } from "../types";
import { useRestaurantContext } from "@context/RestaurantContext/RestaurantContext";

const useRestaurantStepper = () => {
	const { currentStep, dispatch } = useRestaurantContext();
	const stepKeys = Object.values(OrderSteps);

	const handleGoToNextStep = () => {
		const stepIndex = stepKeys.indexOf(currentStep);
		if (stepIndex < stepKeys.length - 1) {
			dispatch({
				type: "SET_ORDER_STEP",
				payload: stepKeys[stepIndex + 1],
			});
		}
	};

	const handleGoToPrevStep = () => {
		const stepIndex = stepKeys.indexOf(currentStep);
		if (stepIndex > 0) {
			dispatch({
				type: "SET_ORDER_STEP",
				payload: stepKeys[stepIndex - 1],
			});
		}
	};

	const handlePaginationChange = (_event: ChangeEvent<unknown>, value: number) => {
		dispatch({
			type: "SET_ORDER_STEP",
			payload: stepKeys[value - 1],
		});
	};

	return {
		handleGoToNextStep,
		handleGoToPrevStep,
		handlePaginationChange,
		stepKeys,
	};
};

export default useRestaurantStepper;
