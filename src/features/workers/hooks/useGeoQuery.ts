import { ApiClient } from "@services/api/apiClient";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getGeo = async () => {
	const response = await ApiClient("/geo").getGeo();
	return response;
};

export const geoQuery = queryOptions({
	queryKey: ["geo"],
	queryFn: getGeo,
	staleTime: 1000 * 15,
});

export const useGeoQuery = () => {
	return useQuery(geoQuery);
};
