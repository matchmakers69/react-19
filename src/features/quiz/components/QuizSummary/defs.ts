import { Quiz } from "@services/api/types";

export type QuizSummaryProps = {
	userAnswers: Array<string>;
	questions: Quiz[];
};
