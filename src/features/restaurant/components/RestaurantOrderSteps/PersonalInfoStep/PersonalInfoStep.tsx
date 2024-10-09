import { Box, Button } from "@mui/material";
import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";

export const PersonalInfoStep = () => {
	const { handleGoToNextStep } = useRestaurantStepper();

	const handleSubmitPersonalInfoValues = () => {
		handleGoToNextStep();
	};
	return (
		<>
			<h2>Your personal details</h2>
			<Box autoComplete="off" component="form" noValidate>
				<Button variant="contained" onClick={handleSubmitPersonalInfoValues} type="submit">
					Save and continue
				</Button>
			</Box>
		</>
	);
};
