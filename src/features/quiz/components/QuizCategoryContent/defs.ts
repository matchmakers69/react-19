import { QuizCategory } from "@services/api/types";
import { BaseProps } from "types/defs";

export type QuizCategoryContentProps = {
	quizCategoryDetails: QuizCategory;
} & BaseProps;
