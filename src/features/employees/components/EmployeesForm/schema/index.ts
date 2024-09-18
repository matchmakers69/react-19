import { emailRegex } from "@utils/patterns";
import { z } from "zod";

export const employeesSchema = z
	.intersection(
		z.object({
			name: z.string().min(2, { message: "Name is required field" }),
			email: z
				.string()
				.min(1, { message: "Email field is required" })
				.refine((text) => emailRegex.email.test(text), {
					message: "Email is not valid",
				}),
			states: z.array(z.string()).min(1, { message: "Select at least one state" }).max(2),
			languagesSpoken: z.array(z.string()),
			gender: z.string().min(1, { message: "Gender is required" }),
			skills: z.array(z.string()).max(2, { message: "Only 2 skills are available" }),
			registrationDateAndTime: z.coerce.date(),
			formerEmploymentPeriod: z.tuple([z.coerce.date(), z.coerce.date()]),
			salaryRange: z.array(z.number()).min(2).max(2),
		}),
		z.discriminatedUnion("variant", [
			z.object({ variant: z.literal("create") }),
			z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
		]),
	)
	.and(
		z.union([
			z.object({ isTeacher: z.literal(false) }),
			z.object({
				// if set to true add students
				isTeacher: z.literal(true),

				students: z.array(
					z.object({
						name: z.string().min(4),
					}),
				),
			}),
		]),
	);

export type EmployeesSchema = z.infer<typeof employeesSchema>;
export const defaultValues: EmployeesSchema = {
	email: "",
	name: "",
	states: [],
	languagesSpoken: [],
	gender: "",
	skills: [],
	registrationDateAndTime: new Date(),
	formerEmploymentPeriod: [new Date(), new Date()],
	salaryRange: [0, 2000],
	isTeacher: false,
	variant: "create", // Check example.ts - same concept to distinguish between
};
