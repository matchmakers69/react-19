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
	return await ApiClient("/meal-booking").saveMealOrder(finalShapeData);
};

export const useSaveMealOrder = () => {
	const queryClient = useQueryClient();
	const { mutate: saveMealOrderStepsMutation, isPaused: isLoadingSaveMealSteps } = useMutation({
		mutationFn: (mealOrderSteps: OrderMealStepValues) => saveMealOrder(mealOrderSteps),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["food"],
			});
		},
		onError: (error) => {
			console.error(error);
			if (error) {
				throw new Error("Saving went wrong");
			}
		},
	});

	return {
		saveMealOrderStepsMutation,
		isLoadingSaveMealSteps,
	};
};
