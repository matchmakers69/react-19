import { OrderSteps } from "@features/restaurant/types";

export interface RestaurantOrderStepperProps {
	steps: Array<string>;
	labels: Array<string>;
	active: OrderSteps;
}
