import { ApiClient } from "@services/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transformMealOrderObjectToArray } from "../service/formatMergedFoodItemIntoArray";
import { OrderMealStepValues } from "@services/api/types";

const saveMealOrder = async (mealOrderSteps: OrderMealStepValues) => {
	const orderSteps = transformMealOrderObjectToArray(mealOrderSteps);
	const finalShapeData = {
		id: "1",
		orderSteps: orderSteps,
	};
	return await ApiClient("/foodOrders").saveMealOrder(finalShapeData);
};

export const useSaveMealOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (mealOrderSteps: OrderMealStepValues) => saveMealOrder(mealOrderSteps),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["food"],
			});
		},
	});
};
