import { ApiClient } from "@services/api/apiClient";
import { queryOptions, useQuery } from "@tanstack/react-query";

const fetchQuizCategories = async () => {
	const response = await ApiClient("/quizCategories").getQuizCategories();
	return response;
};

export const quizCategoriesQuery = queryOptions({
	queryKey: ["quizCategories", "list"],
	queryFn: fetchQuizCategories,
	staleTime: 1000 * 20,
});

export const useQuizCategoriesQuery = () => {
	return useQuery(quizCategoriesQuery);
};
