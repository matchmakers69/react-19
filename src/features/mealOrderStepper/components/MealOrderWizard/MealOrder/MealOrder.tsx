import { Box, Button, Container, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { OrderMealStepValues } from "@services/api/types";
import RHFTextfield from "@components/ui/formParts/RHFTextfield";
import { useFoodOrderContext } from "@context/FoodOrderContext/FoodOrderContext";
import { useFoodOrderStepper } from "@features/mealOrderStepper/hooks/useFoodOrderStepper";

const MealOrder = () => {
	const { handleSubmit } = useFormContext<OrderMealStepValues>();
	const { dispatch } = useFoodOrderContext();
	const { handleGoToNextStep } = useFoodOrderStepper();

	const handleSubmitAndSaveMealOrderStep = (stepValues: OrderMealStepValues) => {
		dispatch({ type: "SET_MEAL_ORDER", payload: stepValues.order });
		handleGoToNextStep();
	};
	return (
		<Container maxWidth="sm">
			<Box
				component="form"
				width="100%"
				autoComplete="off"
				noValidate
				onSubmit={handleSubmit(handleSubmitAndSaveMealOrderStep)}
			>
				<Stack gap={4} width="100%">
					<h2>Your order details</h2>
					<Stack gap={3}>
						<RHFTextfield
							label="Your order number"
							name="order.orderNumber"
							fullWidth
							variant="outlined"
							type="text"
						/>
						<RHFTextfield label="Your email" name="order.email" fullWidth variant="outlined" type="email" />
						<RHFTextfield
							label="Your telephone number"
							name="order.telephone"
							fullWidth
							variant="outlined"
							type="text"
						/>
					</Stack>
					<Box>
						<Button type="submit" variant="contained">
							Save and continue
						</Button>
					</Box>
				</Stack>
			</Box>
		</Container>
	);
};

export default MealOrder;
