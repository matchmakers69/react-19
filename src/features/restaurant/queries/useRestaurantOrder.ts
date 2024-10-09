import { ApiClient } from "@services/api/apiClient";
import { useQuery } from "@tanstack/react-query";

export const fetchRestaurantOrder = async () => {
	const response = await ApiClient("/restaurant").getRestaurantOrder();
	return response;
};

export const useRestaurantOrder = () => {
	return useQuery({
		queryKey: ["restaurant"],
		queryFn: fetchRestaurantOrder,
		staleTime: 2 * 60 * 1000,
	});
};
