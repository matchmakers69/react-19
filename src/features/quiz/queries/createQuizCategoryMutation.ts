import { ApiClient } from "@services/api/apiClient";
import { QuizCategory } from "@services/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createQuizCategory = async (quizCategory: QuizCategory) => {
	return await ApiClient("/quizCategories").createQuizCategory(quizCategory);
};

export const useCreateQuizCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createQuizCategory,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["quizCategories"] });
		},
		onError: (error) => {
			console.error(error);
			if (error) {
				// Add possible toaster here
			}
		},
	});
};
