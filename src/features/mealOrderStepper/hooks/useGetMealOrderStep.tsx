import { OrderMealStepValues } from "@services/api/types";
import AddressDetails from "../components/MealOrderWizard/AddressDetails";
import DeliveryMethods from "../components/MealOrderWizard/DeliveryMethods";
import MealOrder from "../components/MealOrderWizard/MealOrder";
import { FoodOrderStep } from "../types";

type StpeComponentPros = {
	//handleSubmitAndSaveOrderStep: (values: OrderMealStepValues) => void;
	onSubmitAndSave: (values: OrderMealStepValues) => void;
	onPrev: () => void;
};

type StepComponent = {
	Component: React.FC<StpeComponentPros>;
};

type MealOrderStep = {
	[key in FoodOrderStep]: StepComponent;
};

export const useGetMealOrderStep = (currentMealComponentStepKey: FoodOrderStep) => {
	const mealOrderStepperMap = {
		[FoodOrderStep.MealOrderStep]: { Component: MealOrder },
		[FoodOrderStep.AddressDetails]: { Component: AddressDetails },
		[FoodOrderStep.DeliveryMethods]: { Component: DeliveryMethods },
	};

	const { Component } = mealOrderStepperMap[currentMealComponentStepKey];

	return { Component };
};
