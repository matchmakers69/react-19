import { ApiClient } from "@services/api/apiClient";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getBenefits = async () => {
	const response = await ApiClient("/benefits").getBenefits();
	return response;
};

export const benefitsQuery = queryOptions({
	queryKey: ["benefits", "list"],
	queryFn: getBenefits,
});

export const useBenefitsQuery = () => {
	return useQuery(benefitsQuery);
};
