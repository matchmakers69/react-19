import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";
import RestaurantOrderIndicatorButtons from "../../RestaurantOrderIndicatorButtons";

export const DeliveryAddressStep = () => {
	const { handleGoToNextStep, handleGoToPrevStep } = useRestaurantStepper();
	const handleSubmitDeliveryAddressDetails = () => {
		handleGoToNextStep();
	};
	return (
		<>
			<h2>Delivery address details</h2>
			<RestaurantOrderIndicatorButtons
				onSubmit={handleSubmitDeliveryAddressDetails}
				onPrev={handleGoToPrevStep}
			/>
		</>
	);
};
