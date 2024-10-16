import { ApiClient } from "@services/api/apiClient";
import { useMutation } from "@tanstack/react-query";

const deleteQuizCategory = async (id: string) => {
	return await ApiClient("/quizCategories").deleteQuizCategory(id);
};

export const useDeleteQuizCategoryMutation = () => {
	return useMutation({
		mutationFn: deleteQuizCategory,

		onError: (error) => {
			console.error(error);
			if (error) {
				// Add possible toaster here
			}
		},
	});
};
