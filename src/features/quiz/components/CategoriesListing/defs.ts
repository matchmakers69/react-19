import { QuizCategory } from "@services/api/types";

export type CategoriesListingProps = {
	categories: QuizCategory[];
	onDelete: (id: string) => void;
	pending?: boolean | null;
};
