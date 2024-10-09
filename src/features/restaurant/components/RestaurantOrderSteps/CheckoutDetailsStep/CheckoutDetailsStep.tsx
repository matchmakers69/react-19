import RestaurantOrderIndicatorButtons from "../../RestaurantOrderIndicatorButtons";
import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";

export const CheckoutDetailsStep = () => {
	const { handleGoToNextStep, handleGoToPrevStep } = useRestaurantStepper();
	const handleSubmitCheckoutDetailsValues = () => {
		handleGoToNextStep();
	};
	return (
		<>
			<h2>Checkout details</h2>
			<RestaurantOrderIndicatorButtons
				onSubmit={handleSubmitCheckoutDetailsValues}
				onPrev={handleGoToPrevStep}
			/>
		</>
	);
};
