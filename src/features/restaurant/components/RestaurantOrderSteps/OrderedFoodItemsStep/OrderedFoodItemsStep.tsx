import RestaurantOrderIndicatorButtons from "../../RestaurantOrderIndicatorButtons";
import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";

export const OrderedFoodItemsStep = () => {
	const { handleGoToNextStep, handleGoToPrevStep } = useRestaurantStepper();

	const handleSubmitOrderedFoodValues = () => {
		handleGoToNextStep();
	};
	return (
		<>
			<h2>Ordered food</h2>
			<RestaurantOrderIndicatorButtons onSubmit={handleSubmitOrderedFoodValues} onPrev={handleGoToPrevStep} />
		</>
	);
};
