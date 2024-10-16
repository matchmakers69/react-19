import { QuizCategory } from "@services/api/types";

export type ButtonLikeProps = {
	id: string;
	quizCategoryDetails: QuizCategory;
	onAdd: () => void;
};
