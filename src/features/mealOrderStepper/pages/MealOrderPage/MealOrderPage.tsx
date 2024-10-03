import PageTitle from "@components/ui/PageTitle";
import CheckMealOrderBookingForm from "@features/mealOrderStepper/components/CheckMealOrderBookingForm";
import MealOrderWizard from "@features/mealOrderStepper/components/MealOrderWizard";
import { useBookingInfo } from "@features/mealOrderStepper/queries/useBookingInfo";
import { useMealOrderSteps } from "@features/mealOrderStepper/queries/useMealOrderSteps";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

// https://stackoverflow.com/questions/72950435/how-can-i-wait-for-mutation-execution-in-react-query/72994681#72994681 - multiple mutations

const FoodPage = () => {
	const { data: bookingInfo, isError: bookingInfoError, isLoading: bookingInfoLoading } = useBookingInfo();
	const {
		data: mealOrderSteps,
		refetch: refetchMealOrderSteps,
		isLoading: mealStepsAreLoading,
		isError: mealOrdersError,
	} = useMealOrderSteps(bookingInfo ?? null); // TODO perhaps use useQueries

	const isLoading = bookingInfoLoading || mealStepsAreLoading;
	const isError = bookingInfoError || mealOrdersError;
	// Refetch meal order steps when booking info changes
	useEffect(() => {
		if (bookingInfo?.isAlreadyBooked) {
			refetchMealOrderSteps();
		}
	}, [bookingInfo?.isAlreadyBooked, refetchMealOrderSteps]);

	if (isLoading) {
		return (
			<Box>
				<Typography variant="h3">Your booking is loading...</Typography>
			</Box>
		);
	}

	if (isError) {
		return (
			<Box>
				<Typography variant="h3">Something went wrong</Typography>
			</Box>
		);
	}

	return (
		<>
			<PageTitle title="Order your meal with us!" />
			<CheckMealOrderBookingForm bookingInfo={bookingInfo ?? null} />
			<MealOrderWizard mealOrderSteps={mealOrderSteps ?? null} />
		</>
	);
};

export default FoodPage;
