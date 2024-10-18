import { QuizCategoryImage } from "@services/api/types";

export type ImagePickerProps = {
	images: QuizCategoryImage[];
	onSelect: (image: string) => void;
	selectedImage?: string;
};
