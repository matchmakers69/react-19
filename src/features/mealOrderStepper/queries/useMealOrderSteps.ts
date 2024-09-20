import { ApiClient } from "@services/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { transformMealOrdeStepsToObject } from "../service/formatMergedFoodItemIntoArray";
import { BookingInfo, OrderStepItem } from "@services/api/types";

const fetchFoodOrderSteps = async () => {
	const mealOrderSteps = await ApiClient("/meal-booking").getMealOrder();

	const orderSteps = mealOrderSteps[0].orderSteps;
	const orderStepByKeyName = transformMealOrdeStepsToObject(orderSteps as OrderStepItem[]);

	return orderStepByKeyName;
};

export const useMealOrderSteps = (bookingStatus: BookingInfo | null) => {
	return useQuery({
		queryKey: ["food", bookingStatus?.isAlreadyBooked],
		queryFn: fetchFoodOrderSteps,
		enabled: !!bookingStatus?.isAlreadyBooked,
		staleTime: 2 * 60 * 1000,
	});
};
