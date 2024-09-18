import { OrderMealStepValues } from "@services/api/types";

export type DeliveryMethodsProps = {
	onPrev: () => void;
	handleSubmitStep: (stepValues: Partial<OrderMealStepValues>) => void;
};
