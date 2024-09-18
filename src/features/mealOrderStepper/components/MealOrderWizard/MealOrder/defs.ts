import { OrderMealStepValues } from "@services/api/types";

export type MealOrderProps = {
	handleSubmitStep: (stepValues: Partial<OrderMealStepValues>) => void;
};
