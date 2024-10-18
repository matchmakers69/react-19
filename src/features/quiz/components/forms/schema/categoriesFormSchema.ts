import { z } from "zod";

// const questionSchema = z.object({
// 	questionText: z.string().min(1, { message: "Question is required" }),
// });

export const categoriesFormSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	description: z
		.string()
		.min(10, { message: "Description is required" })
		.max(100, { message: "Your description cannot be longer then 100 characters" }),
	image: z.string().min(1, { message: "Image is required" }),
	questions: z.array(z.object({ questionText: z.string() })).optional(),
});

export type CategoriesValidationSchema = z.infer<typeof categoriesFormSchema>;
