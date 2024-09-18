import { queryKey } from "@config/constants/queryKeys";
import { ApiClient } from "@services/api/apiClient";
import { SimpleEmployee } from "@services/api/types";
import { useQuery } from "@tanstack/react-query";

const getEmployees = async () => {
	const response = await ApiClient("/employees").getEmployees();
	return response.map(
		(employee) =>
			({
				id: employee.id,
				label: employee.name,
			}) satisfies SimpleEmployee,
	);
};

export const useEmployees = () => {
	return useQuery({
		queryKey: [queryKey.employees],
		queryFn: getEmployees,
		staleTime: 2 * 60 * 1000,
	});
};
