import { Box, Button, Stack, Typography } from "@mui/material";
import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";
import { useFormContext } from "react-hook-form";
import RHFTextfield from "@components/ui/formParts/RHFTextfield";
import { InfoField } from "@features/restaurant/types";

export const PersonalInfoStep = () => {
	const { handleSubmit } = useFormContext<InfoField>();
	const { handleGoToNextStep } = useRestaurantStepper();

	const handleSubmitPersonalInfoValues = () => {
		handleGoToNextStep();
	};

	return (
		<>
			<Typography variant="h3">Your personal details</Typography>

			<Box
				onSubmit={handleSubmit(handleSubmitPersonalInfoValues)}
				autoComplete="off"
				component="form"
				noValidate
			>
				<Stack gap={5} marginBottom={8}>
					<RHFTextfield
						label="Enter your name"
						name="personalInfo.CustomerName"
						fullWidth
						variant="outlined"
						type="text"
					/>

					<RHFTextfield
						label="Enter your email"
						name="personalInfo.Email"
						fullWidth
						variant="outlined"
						type="email"
					/>

					<RHFTextfield
						label="Enter your telephone number"
						name="personalInfo.MobileNumber"
						fullWidth
						variant="outlined"
						type="text"
					/>

					<RHFTextfield
						label="Enter your order number"
						name="personalInfo.OrderNumber"
						fullWidth
						variant="outlined"
						type="text"
					/>
				</Stack>
				<Button variant="contained" type="submit">
					Save and continue
				</Button>
			</Box>
		</>
	);
};
