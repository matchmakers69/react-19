import { OrderStepItem, OrderMealStepValues } from "@services/api/types";

export const transformMealOrdeStepsToObject = (arr: OrderStepItem[]): OrderMealStepValues => {
	return arr.reduce((acc, item) => {
		const { name, ...rest } = item;
		return { ...acc, [name]: rest };
	}, {} as OrderMealStepValues);
};

export const transformMealOrderObjectToArray = (obj: OrderMealStepValues): OrderStepItem[] => {
	const result: OrderStepItem[] = [];

	if (obj.order) {
		result.push({
			...obj.order,
			name: "order",
		});
	}

	if (obj.addressDetails) {
		result.push({
			...obj.addressDetails,
			name: "addressDetails",
		});
	}

	if (obj.deliveryMethods) {
		result.push({
			name: "deliveryMethods",
			...obj.deliveryMethods,
		});
	}

	return result;
};
