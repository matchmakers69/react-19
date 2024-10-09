import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { RestaurantOrderStepperProps } from "./defs";

const RestaurantOrderStepper = ({ active, steps, labels }: RestaurantOrderStepperProps) => {
	const currentStepIndex = steps.indexOf(active);

	return (
		<Box sx={{ width: "100%", marginBottom: 6 }}>
			<Stepper activeStep={currentStepIndex} alternativeLabel>
				{steps.map((step, index) => (
					<Step key={step}>
						<StepLabel>{labels[index]}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
};

export default RestaurantOrderStepper;
