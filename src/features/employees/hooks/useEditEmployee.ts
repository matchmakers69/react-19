import { queryKey } from "@config/constants/queryKeys";
import { ApiClient } from "@services/api/apiClient";
import { EmployeeGet } from "@services/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeesSchema } from "../components/EmployeesForm/schema";
import { mapEmployeeEdit } from "../service/mapEmployeeData";
import { omit } from "lodash";

const saveEmployee = async (employee: EmployeesSchema): Promise<EmployeeGet> => {
	if (employee.variant !== "edit") {
		throw new Error("Invalid employee data for edit operation");
	}
	const employeeDataToSend = omit(mapEmployeeEdit(employee), "variant"); // omit required - we dont want to sent variant prop to backend
	return await ApiClient("/employees").updateEmployee(employeeDataToSend);
};

export const useEditEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: saveEmployee,
		onSuccess: async (_, variables) => {
			await queryClient.invalidateQueries({
				queryKey: [queryKey.employees],
			});
			if (variables.variant === "edit") {
				await queryClient.invalidateQueries({
					queryKey: [queryKey.employee, { id: variables.id }],
				});
			}
		},
	});
};
