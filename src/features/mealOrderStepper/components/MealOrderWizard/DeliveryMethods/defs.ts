import { FinalBookingOrderStep } from "@features/mealOrderStepper/types";

export type DeliveryMethodsProps = {
	onPrev: () => void;
} & FinalBookingOrderStep;
