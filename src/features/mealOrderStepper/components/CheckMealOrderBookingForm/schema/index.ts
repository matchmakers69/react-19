import { z } from "zod";

export const bookingInfoSchema = z.object({
	isAlreadyBooked: z.boolean().optional(),
});

export type BookingValidationSchema = z.infer<typeof bookingInfoSchema>;
