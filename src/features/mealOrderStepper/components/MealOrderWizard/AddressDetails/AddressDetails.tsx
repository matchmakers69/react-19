import { Box, Button, Container, Stack } from "@mui/material";
import { AddressDetailsProps } from "./defs";
import { OrderMealStepValues } from "@services/api/types";
import { useFormContext } from "react-hook-form";
import RHFTextfield from "@components/ui/formParts/RHFTextfield";
import { useFoodOrderContext } from "@context/FoodOrderContext/FoodOrderContext";
import { useFoodOrderStepper } from "@features/mealOrderStepper/hooks/useFoodOrderStepper";

const AddressDetails = ({ onPrev }: AddressDetailsProps) => {
	const { handleSubmit } = useFormContext<OrderMealStepValues>();
	const { dispatch } = useFoodOrderContext();
	const { handleGoToNextStep } = useFoodOrderStepper();

	const handleSubmitAndSaveAddressDetailsStep = (stepValues: OrderMealStepValues) => {
		dispatch({ type: "SET_ADDRESS_DETAILS", payload: stepValues.addressDetails });
		handleGoToNextStep();
	};

	return (
		<Container maxWidth="sm">
			<Box
				component="form"
				width="100%"
				autoComplete="off"
				noValidate
				onSubmit={handleSubmit(handleSubmitAndSaveAddressDetailsStep)}
			>
				<Stack gap={4} width="100%">
					<h2>Address details</h2>
					<Stack gap={3}>
						<RHFTextfield
							label="Enter 1st line of your address"
							name="addressDetails.addressLine"
							fullWidth
							variant="outlined"
							type="text"
						/>
						<RHFTextfield
							sx={{
								maxWidth: "150px",
							}}
							label="Postcode"
							name="addressDetails.postCode"
							variant="outlined"
							fullWidth
							type="text"
						/>
						<RHFTextfield
							label="Enter your town/city"
							name="addressDetails.city"
							fullWidth
							variant="outlined"
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
	);
};

export default AddressDetails;
