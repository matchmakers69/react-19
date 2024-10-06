import { ApiClient } from "@services/api/apiClient";
import { Worker } from "@services/api/types";
import { queryOptions } from "@tanstack/react-query";

type WorkerQueryParams = Partial<Pick<Worker, "nationality" | "lastName">> & { page: number };

// const getWorkers = async (_params: WorkerQueryParams) => {
// 	return await ApiClient("/workers").getWorkers();
// };

// Server side filtering using React Query
export const workersQuery = (params: WorkerQueryParams = { page: 1 }) =>
	queryOptions({
		queryKey: ["workers", "list", params],
		queryFn: async () => {
			const response = await ApiClient("/workers").getWorkers(params);
			return response.data;
		},
		staleTime: 1000 * 15,
		gcTime: 1000 * 3,
	});

// export const useWorkersQuery = () => {
// 	return useQuery(workersQuery);
// };
