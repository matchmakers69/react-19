import { ApiClient } from "@services/api/apiClient";
import { useQueries } from "@tanstack/react-query";
import { queryKey } from "@config/constants/queryKeys";
import { STALE_TIME } from "@config/constants/staleTime";

const getStates = async () => {
	return await ApiClient("/states").getStates();
};

const getLanguages = async () => {
	return await ApiClient("/languages").getLanguages();
};

const getGenders = async () => {
	return await ApiClient("/genders").getGenders();
};

const getSkills = async () => {
	return await ApiClient("/skills").getSkills();
};

// https://stackoverflow.com/questions/66427968/how-to-handle-multiple-queries-with-react-query
export const useFetchEmployeesFormOptions = () => {
	const [statesQuery, languagesQuery, gendersQuery, skillsQuery] = useQueries({
		queries: [
			{
				queryKey: [queryKey.states],
				queryFn: getStates,
				staleTime: STALE_TIME,
			},
			{
				queryKey: [queryKey.languages],
				queryFn: getLanguages,
				staleTime: STALE_TIME,
			},
			{
				queryKey: [queryKey.genders],
				queryFn: getGenders,
				staleTime: STALE_TIME,
			},
			{
				queryKey: [queryKey.skills],
				queryFn: getSkills,
				staleTime: STALE_TIME,
			},
		],
	});
	return {
		statesQuery,
		languagesQuery,
		gendersQuery,
		skillsQuery,
	};
};
