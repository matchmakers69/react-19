import { ApiClient } from "@services/api/apiClient";
import { queryOptions, useQuery } from "@tanstack/react-query";

const fetchQuizCategoryImages = async () => {
	const response = await ApiClient("/quizCategoriesImages").getQuizCategoryImages();
	return response;
};

const quizImagesQuery = queryOptions({
	queryKey: ["quizCategoryImages", "list"],
	queryFn: fetchQuizCategoryImages,
	staleTime: 1000 * 20,
});

export const useQuizImagesQuery = () => {
	return useQuery(quizImagesQuery);
};
