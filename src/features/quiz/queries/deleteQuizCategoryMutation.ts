import { ApiClient } from "@services/api/apiClient";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const deleteQuizCategory = async (id: string) => {
	return await ApiClient("/quizCategories").deleteQuizCategory(id);
};

export const useDeleteQuizCategoryMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteQuizCategory,
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
