import { z } from "zod";

export const addJobSchema = z.object({
	title: z.string().min(3, "Minimum 3 characters are required").max(30, "Too many characters. Maximum is 30"),

	description: z
		.string()
		.min(10, "Minimum 10 characters are required")
		.max(200, "Too many characters. Maximum is 200"),

	location: z
		.string()
		.min(2, "Minimum 10 characters are required")
		.max(50, "Too many characters. Maximum is 200"),

	jobType: z.string({
		errorMap: () => {
			return { message: "You have to select job type" };
		},
	}),
	salary: z.string({
		errorMap: () => {
			return { message: "You have to select salary range" };
		},
	}),
});

export type AddJobValues = z.infer<typeof addJobSchema>;
