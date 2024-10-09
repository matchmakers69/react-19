import { Box, Button } from "@mui/material";
import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";
import { PersonalInfoStepProps } from "./defs";
import { useQuery } from "@tanstack/react-query";
import { useRestaurantOrder } from "@features/restaurant/queries/useRestaurantOrder";
import { OrderSteps } from "@features/restaurant/types";
import { useFormContext } from "react-hook-form";
import RHFTextfield from "@components/ui/formParts/RHFTextfield";

export const PersonalInfoStep = ({ onRestaurantOrderSubmit }: PersonalInfoStepProps) => {
	const { handleSubmit } = useFormContext();
	const { data: restaurantOrderData } = useRestaurantOrder(); // Taking data from query cache
	const { handleGoToNextStep } = useRestaurantStepper();

	const handleSubmitPersonalInfoValues = (data: any) => {
		handleGoToNextStep();
		// TODO make sure to save step values to context
		console.log(data);
		onRestaurantOrderSubmit(data);
	};
	const personalInfoFields = restaurantOrderData?.[OrderSteps.PersonalInfo];

	return (
		<>
			<h2>Your personal details</h2>
			<Box
				onSubmit={handleSubmit(handleSubmitPersonalInfoValues)}
				autoComplete="off"
				component="form"
				noValidate
			>
				{/* {personalInfoFields &&
					personalInfoFields.map((field) => (
						<RHFTextfield
							key={field.id}
							label={field.label}
							name={`${OrderSteps.PersonalInfo}.${field.id}`}
							fullWidth
							variant="outlined"
						/>
					))} */}
				<Button variant="contained" onClick={handleSubmitPersonalInfoValues} type="submit">
					Save and continue
				</Button>
			</Box>
		</>
	);
};
