import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LocationProvider from "@app/LocationProvider";
import { useFoodOrderContext } from "@context/FoodOrderContext/FoodOrderContext";
import { useFoodOrderStepper } from "@features/mealOrderStepper/hooks/useFoodOrderStepper";
import {
	mealOrderSchema,
	addressDetailsSchema,
	deliveryMethodsSchema,
} from "../MealOrderWizard/schema/mealOrderSchema";
import { useGetMealOrderStep } from "@features/mealOrderStepper/hooks/useGetMealOrderStep";
import { OrderMealStepValues } from "@services/api/types";
import { useEffect } from "react";
import { useSaveMealOrder } from "@features/mealOrderStepper/queries/useSaveMealOrder";
import { FinalBookingOrderStep } from "@features/mealOrderStepper/types";
import { useBookingInfo } from "@features/mealOrderStepper/queries/useBookingInfo";
import { Box } from "@mui/material";
import { useUpdateBookingInfo } from "@features/mealOrderStepper/queries/useUpdateBookingInfo";
import { MealOrderWizardProps } from "./defs";

const schemas = {
	mealOrder: mealOrderSchema,
	addressDetails: addressDetailsSchema,
	deliveryMethods: deliveryMethodsSchema,
};

// const isCompleteMealOrder = (order: Partial<OrderMealStepValues>): order is OrderMealStepValues => {
// 	return !!order.order && !!order.addressDetails && !!order.deliveryMethods;
// };

const MealOrderWizard = ({ mealOrderSteps }: MealOrderWizardProps) => {
	const { mealOrderStep, addressDetailsStep } = useFoodOrderContext();
	const { data: bookingInfo } = useBookingInfo();
	const { updateBookingInfoMutation } = useUpdateBookingInfo();
	const { currentStep, handleGoToPrevStep } = useFoodOrderStepper();
	const { isLoadingSaveMealSteps, saveMealOrderStepsMutation } = useSaveMealOrder();

	const methods = useForm({
		mode: "all",
		resolver: zodResolver(schemas[currentStep]),
		defaultValues: {
			order: mealOrderSteps?.order ?? undefined,
			addressDetails: mealOrderSteps?.addressDetails ?? undefined,
			deliveryMethods: mealOrderSteps?.deliveryMethods ?? undefined,
		},
	});

	// Make sure fields will be populated when data is loaded
	// Will populate fields with data if data exists
	useEffect(() => {
		if (mealOrderSteps) {
			methods.reset(mealOrderSteps);
		}
	}, [methods]);

	const { Component: MealStepperComponent } = useGetMealOrderStep(currentStep);

	const handleSubmitMealOrder: FinalBookingOrderStep["onSubmit"] = async (stepValues) => {
		if (!mealOrderStep || !addressDetailsStep) {
			throw new Error("No data");
		}
		const mealOrderSteps: OrderMealStepValues = {
			order: mealOrderStep,
			addressDetails: addressDetailsStep,
			deliveryMethods: stepValues.deliveryMethods,
		};

		saveMealOrderStepsMutation(mealOrderSteps);

		if (!bookingInfo?.isAlreadyBooked) {
			updateBookingInfoMutation({ isAlreadyBooked: true });
		} // user fills the form first time and we want to let backend know status will be true now
	};
	if (isLoadingSaveMealSteps) {
		return <Box>Steps are updating</Box>;
	}

	return (
		<FormProvider {...methods}>
			<LocationProvider>
				<MealStepperComponent onSubmit={handleSubmitMealOrder} onPrev={handleGoToPrevStep} />
			</LocationProvider>
		</FormProvider>
	);
};

export default MealOrderWizard;
