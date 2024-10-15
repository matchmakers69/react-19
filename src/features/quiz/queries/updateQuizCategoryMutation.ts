import { ApiClient } from "@services/api/apiClient";
import { QuizCategory } from "@services/api/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const updateQuizCategory = async ({ id, ...updatedQuizCategory }: QuizCategory) => {
	return await ApiClient("/quizCategories").updateQuizCategory(id, updatedQuizCategory);
};

export const useUpdateQuizCategoryMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: updateQuizCategory,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["quizCategories"] });
			navigate("/quiz");
		},
		onError: (error) => {
			console.error(error);
			if (error) {
				// Add possible toaster here
			}
		},
	});
};
