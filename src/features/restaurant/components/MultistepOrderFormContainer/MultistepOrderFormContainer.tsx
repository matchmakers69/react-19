import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";
import RestaurantStepsPagination from "../RestaurantStepsPagination";
import { Box, Container } from "@mui/material";
import * as S from "../../styled/common.styled";
import RestaurantOrderStepper from "../RestaurantOrderStepper";
import { getRestaurantOrderSteps } from "@features/restaurant/service/getRestaurantOrderSteps";
import { FormProvider, useForm } from "react-hook-form";
import { useRestaurantContext } from "@context/RestaurantContext/RestaurantContext";
import { MultistepOrderFormContainerProps } from "./defs";
import { FinalRestaurantOrderStep, OrderSteps } from "@features/restaurant/types";

const MultistepOrderFormContainer = ({ restaurantStep }: MultistepOrderFormContainerProps) => {
	const STEPS_LENGTH = Object.keys(restaurantStep).length;
	const { currentStep } = useRestaurantContext();

	function toCamelCase(str: string) {
		return str
			.toLowerCase()
			.split(" ")
			.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
			.join("");
	}

	const personalInfoData = restaurantStep[OrderSteps.PersonalInfo].reduce((acc, current) => {
		// Typeguard aby mieć pewność, że label jest stringiem oraz że value istnieje w current
		if (typeof current.label !== "string" || !("value" in current)) return;
		return { ...acc, [toCamelCase(current.label)]: current.value };
	}, {});

	const methods = useForm({
		mode: "all",
		defaultValues: {
			personalInfo: personalInfoData,
		},
	});
	const { stepKeys, handlePaginationChange } = useRestaurantStepper();

	const { steps } = getRestaurantOrderSteps();
	const { component: RestaurantOrderStep } = steps[currentStep];
	const labels = stepKeys.map((stepKey) => steps[stepKey].label);
	const currentStepIndex = stepKeys.indexOf(currentStep) + 1;

	// TODO update method for backend - function will be fired probably only on the last step
	const saveFinalRestaurantOrder: FinalRestaurantOrderStep["onRestaurantOrderSubmit"] = async (
		stepValues: any,
	) => {
		if (!restaurantStep) throw new Error("No data");
	};

	return (
		<Container maxWidth="md" sx={{ p: 0 }}>
			<S.RestaurantFormWrapper>
				<RestaurantOrderStepper active={currentStep} steps={stepKeys} labels={labels} />
				<RestaurantStepsPagination
					currentPage={currentStepIndex}
					steps={STEPS_LENGTH}
					handleChange={handlePaginationChange}
				/>
				<FormProvider {...methods}>
					<Box mb={6}>{<RestaurantOrderStep onRestaurantOrderSubmit={saveFinalRestaurantOrder} />}</Box>
				</FormProvider>
			</S.RestaurantFormWrapper>
		</Container>
	);
};

export default MultistepOrderFormContainer;
