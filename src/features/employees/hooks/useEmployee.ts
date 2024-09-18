import { queryKey } from "@config/constants/queryKeys";
import { ApiClient } from "@services/api/apiClient";
import { useQuery } from "@tanstack/react-query";

const getEmployee = (id: string) => async () => {
	const response = await ApiClient("/employees").getEmployee(id);
	const { formerEmploymentPeriod, salaryRange, registrationDateAndTime, ...rest } = response;
	return {
		...rest,
		id,
		variant: "edit",
		formerEmploymentPeriod: formerEmploymentPeriod.map((date) => new Date(date)),
		registrationDateAndTime: new Date(registrationDateAndTime),
		salaryRange: [...salaryRange],
	};
};
export const useEmployee = (id: string) => {
	return useQuery({
		queryKey: [queryKey.employee, { id }],
		queryFn: getEmployee(id),
		enabled: !!id, // Call only when id property is truthy
		staleTime: 2 * 60 * 1000,
	});
};
