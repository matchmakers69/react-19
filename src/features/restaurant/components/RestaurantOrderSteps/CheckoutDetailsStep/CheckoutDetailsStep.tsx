import { useFormContext } from "react-hook-form";
import RestaurantOrderIndicatorButtons from "../../RestaurantOrderIndicatorButtons";
import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";
import { CheckoutDetail } from "@features/restaurant/types";
import { Typography, Box } from "@mui/material";
import { useRestaurantOrder } from "@features/restaurant/queries/useRestaurantOrder";

export const CheckoutDetailsStep = () => {
	const { handleSubmit } = useFormContext<CheckoutDetail>();
	const { handleGoToNextStep, handleGoToPrevStep } = useRestaurantStepper();
	const handleSubmitCheckoutDetailsValues = () => {
		handleGoToNextStep();
	};
	const { data: restaurantOrderData } = useRestaurantOrder();
	const paymentMethods =
		restaurantOrderData?.checkoutDetails.find((item) => item.label === "PaymentMethod")?.paymentMethod ?? [];

	const deliveryTime =
		restaurantOrderData?.checkoutDetails.find((item) => item.label === "DeliveryWithin")?.deliveryWithin ??
		[];

	return (
		<>
			<Typography variant="h3">Your checkout details</Typography>

			<Box
				onSubmit={handleSubmit(handleSubmitCheckoutDetailsValues)}
				autoComplete="off"
				component="form"
				noValidate
			></Box>
			<RestaurantOrderIndicatorButtons onPrev={handleGoToPrevStep} />
		</>
	);
};
