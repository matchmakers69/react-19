import { Box, Button } from "@mui/material";
import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";
import { PersonalInfoStepProps } from "./defs";
import { useRestaurantOrder } from "@features/restaurant/queries/useRestaurantOrder";
import { useFormContext } from "react-hook-form";
import RHFTextfield from "@components/ui/formParts/RHFTextfield";

export const PersonalInfoStep = ({ onRestaurantOrderSubmit }: PersonalInfoStepProps) => {
	const { handleSubmit, register } = useFormContext();
	const { data: restaurantOrderData } = useRestaurantOrder(); // Taking data from query cache
	const { handleGoToNextStep } = useRestaurantStepper();

	const handleSubmitPersonalInfoValues = (data: any) => {
		handleGoToNextStep();
		// TODO make sure to save step values to context
		console.log(data);
		// onRestaurantOrderSubmit(data);
	};

	return (
		<>
			<h2>Your personal details</h2>
			<Box
				onSubmit={handleSubmit(handleSubmitPersonalInfoValues)}
				autoComplete="off"
				component="form"
				noValidate
			>
				<RHFTextfield
					label="Order number"
					fullWidth
					variant="outlined"
					{...register("personalInfo.orderNumber")}
				/>
				<RHFTextfield
					label="Mobile number"
					fullWidth
					variant="outlined"
					{...register("personalInfo.mobileNumber")}
				/>
				<RHFTextfield
					label="Customer name"
					{...register("personalInfo.customerName")}
					fullWidth
					variant="outlined"
				/>
				<RHFTextfield
					label="E-mail"
					{...register("personalInfo.email")}
					type="email"
					fullWidth
					variant="outlined"
				/>

				<Button variant="contained" type="submit">
					Save and continue
				</Button>
			</Box>
		</>
	);
};
