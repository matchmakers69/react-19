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
import { useCallback, useEffect } from "react";
import useSetMealOrderSteps from "@features/mealOrderStepper/hooks/useSetMealOrderSteps";
import { useSaveMealOrder } from "@features/mealOrderStepper/queries/useSaveMealOrder";

const schemas = {
	mealOrder: mealOrderSchema,
	addressDetails: addressDetailsSchema,
	deliveryMethods: deliveryMethodsSchema,
};

// const isCompleteMealOrder = (order: Partial<OrderMealStepValues>): order is OrderMealStepValues => {
// 	return !!order.order && !!order.addressDetails && !!order.deliveryMethods;
// };

const MealOrderWizard = () => {
	const { mealOrderStep, addressDetailsStep, deliveryMethodsStep } = useFoodOrderContext();
	const { currentStep, handleGoToNextStep, handleGoToPrevStep } = useFoodOrderStepper();
	const { accumulatedFormStepsData, handleSetMealOrderFormValues } = useSetMealOrderSteps();
	const updateMealOrderMutation = useSaveMealOrder();

	const methods = useForm({
		mode: "all",
		resolver: zodResolver(schemas[currentStep]),
		defaultValues: {
			order: mealOrderStep,
			addressDetails: addressDetailsStep,
			deliveryMethods: deliveryMethodsStep,
		},
	});

	const { Component: MealStepperComponent, isLastStep } = useGetMealOrderStep(currentStep);

	// Make sure fields will be populated when data is loaded
	useEffect(() => {
		methods.reset({
			order: mealOrderStep,
			addressDetails: addressDetailsStep,
			deliveryMethods: deliveryMethodsStep,
		});
	}, [mealOrderStep, addressDetailsStep, deliveryMethodsStep, methods]);

	const handleSubmitMealOrder = useCallback(
		(stepValues: Partial<OrderMealStepValues>) => {
			const updatedMealFormSteps = { ...accumulatedFormStepsData, ...stepValues } as OrderMealStepValues;
			handleSetMealOrderFormValues(updatedMealFormSteps);

			if (!isLastStep(currentStep)) {
				handleGoToNextStep();
			} else {
				updateMealOrderMutation.mutate(updatedMealFormSteps);
			}
		},
		[currentStep, isLastStep, handleGoToNextStep, mealOrderStep, addressDetailsStep, deliveryMethodsStep],
	);

	return (
		<FormProvider {...methods}>
			<LocationProvider>
				<MealStepperComponent handleSubmitStep={handleSubmitMealOrder} onPrev={handleGoToPrevStep} />
			</LocationProvider>
		</FormProvider>
	);
};

export default MealOrderWizard;
