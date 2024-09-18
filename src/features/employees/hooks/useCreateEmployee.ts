import { queryKey } from "@config/constants/queryKeys";
import { ApiClient } from "@services/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeesSchema } from "../components/EmployeesForm/schema";
import { mapEmployeeCreate } from "../service/mapEmployeeData";
import { omit } from "lodash";

const addNewEmployee = async (employee: EmployeesSchema) => {
	const newEmployeeWithoutVariant = omit(mapEmployeeCreate(employee), "variant");
	return await ApiClient("/employees").postEmployee(newEmployeeWithoutVariant); // omit from lodash added to avoid adding "create to array"
};

export const useCreateEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addNewEmployee,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [queryKey.employees] });
		},
		onError: (error) => {
			console.error(error);
			if (error) {
				// Add possible toaster here
			}
		},
	});
};
