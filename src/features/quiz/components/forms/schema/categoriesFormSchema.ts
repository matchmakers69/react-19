import { z } from "zod";

export const categoriesFormSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }),
	description: z
		.string()
		.min(10, { message: "Description is required" })
		.max(100, { message: "Your description cannot be longer then 100 characters" }),
});

export type CategoriesValidationSchema = z.infer<typeof categoriesFormSchema>;
