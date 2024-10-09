import {
	PersonalInfoStep,
	OrderedFoodItemsStep,
	CheckoutDetailsStep,
	DeliveryAddressStep,
} from "../components/RestaurantOrderSteps";
import { OrderSteps } from "../types";

type StepComponentProps = {
	onRestaurantOrderSubmit: (values: any) => void; // TODO add type for falues
};

type StepComponent = {
	label: string;
	component: React.FC<StepComponentProps>;
};

type StepsMapper = {
	[key in OrderSteps]: StepComponent;
};

export const getRestaurantOrderSteps = () => {
	const stepComponents: StepsMapper = {
		[OrderSteps.PersonalInfo]: {
			label: "Personal info",
			component: PersonalInfoStep,
		},
		[OrderSteps.OrderedFoodItems]: {
			label: "Ordered food items",
			component: OrderedFoodItemsStep,
		},
		[OrderSteps.CheckoutDetails]: {
			label: "Checkout details",
			component: CheckoutDetailsStep,
		},
		[OrderSteps.DeliveryAddress]: {
			label: "Delivery methods",
			component: DeliveryAddressStep,
		},
	};

	return {
		steps: stepComponents,
	};
};
