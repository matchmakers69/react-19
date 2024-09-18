import { OrderMealStepValues } from "@services/api/types";

export type AddressDetailsProps = {
	handleSubmitStep: (stepValues: Partial<OrderMealStepValues>) => void;
	onPrev: () => void;
};
