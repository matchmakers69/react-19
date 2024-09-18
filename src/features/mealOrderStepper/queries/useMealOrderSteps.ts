import { ApiClient } from "@services/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { transformMealOrdeStepsToObject } from "../service/formatMergedFoodItemIntoArray";
import { OrderStepItem } from "@services/api/types";

const fetchFoodOrderSteps = async () => {
	const mealOrderSteps = await ApiClient("/foodOrders").getMealOrder();

	const orderSteps = mealOrderSteps[0].orderSteps;
	const orderStepByKeyName = transformMealOrdeStepsToObject(orderSteps as OrderStepItem[]);

	return orderStepByKeyName;
};

export const useMealOrderSteps = () => {
	return useQuery({
		queryKey: ["food"],
		queryFn: fetchFoodOrderSteps,
		staleTime: 2 * 60 * 1000,
	});
};
