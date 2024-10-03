import { ApiClient } from "@services/api/apiClient";
import { useQuery } from "@tanstack/react-query";

const getWorkers = async () => {
	return await ApiClient("/workers").getWorkers();
};

export const useWorkers = () => {
	return useQuery({
		queryKey: ["workers", "list"],
		queryFn: getWorkers,
		staleTime: 2 * 60 * 1000,
	});
};
