import { ApiClient } from "@services/api/apiClient";
import { queryOptions, useQuery } from "@tanstack/react-query";

const fetchSingleCategory = async (id: string) => {
	const response = await ApiClient("/quizCategories").getQuizCategoryById(id);
	return response;
};

export const quizSingleCategoryQuery = (id: string) =>
	queryOptions({
		queryKey: ["quizCategories", id],
		queryFn: () => fetchSingleCategory(id),
		staleTime: 1000 * 20,
	});

export const useQuizSingleCategoryQuery = (id: string) => {
	return useQuery(quizSingleCategoryQuery(id));
};
