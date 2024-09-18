import { Box, Button, Container, Stack } from "@mui/material";
import { DeliveryMethodsProps } from "./defs";
import { useFormContext } from "react-hook-form";
import RHFTextfield from "@components/ui/formParts/RHFTextfield";
import { OrderMealStepValues } from "@services/api/types";
import { useFoodOrderContext } from "@context/FoodOrderContext/FoodOrderContext";

const DeliveryMethods = ({ onPrev, handleSubmitStep }: DeliveryMethodsProps) => {
	const { handleSubmit } = useFormContext<OrderMealStepValues>();
	const { dispatch } = useFoodOrderContext();

	const handleSubmitAndSaveDeliveryMethodsStep = (stepValues: OrderMealStepValues) => {
		dispatch({ type: "SET_DELIVERY_METHODS", payload: stepValues.deliveryMethods });
		handleSubmitStep({ deliveryMethods: stepValues.deliveryMethods });
	};

	return (
		<>
			<Container maxWidth="sm">
				<Box
					component="form"
					width="100%"
					autoComplete="off"
					noValidate
					onSubmit={handleSubmit(handleSubmitAndSaveDeliveryMethodsStep)}
				>
					<Stack gap={4} width="100%">
						<h2>Your delivery options</h2>
						<Stack gap={3}>
							<RHFTextfield
								label="Quick delivery"
								name="deliveryMethods.quickDelivery"
								fullWidth
								variant="outlined"
								type="text"
							/>
							<RHFTextfield
								label="Next day delivery"
								name="deliveryMethods.nextDayDelivery"
								variant="outlined"
								fullWidth
								type="text"
							/>
						</Stack>
						<Stack flexDirection="row" gap={3}>
							<Button onClick={onPrev} variant="outlined">
								Go to prev step
							</Button>

							<Button type="submit" variant="contained">
								Save and continue
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Container>
		</>
	);
};

export default DeliveryMethods;
