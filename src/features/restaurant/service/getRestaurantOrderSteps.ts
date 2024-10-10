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
		[OrderSteps.personalInfo]: {
			label: "Personal info",
			component: PersonalInfoStep,
		},
		[OrderSteps.orderedFoodItems]: {
			label: "Ordered food items",
			component: OrderedFoodItemsStep,
		},
		[OrderSteps.checkoutDetails]: {
			label: "Checkout details",
			component: CheckoutDetailsStep,
		},
		[OrderSteps.deliveryAddress]: {
			label: "Delivery methods",
			component: DeliveryAddressStep,
		},
	};

	return {
		steps: stepComponents,
	};
};
