// schemas.ts

import { z } from "zod";

const ukMobileRegex = /^(?:(?:\+44\s?|0)7\d{3}\s?\d{3}\s?\d{3})$/;
const ukPostCodeRegex =
	/^(?:(?:[A-PR-UWYZ][A-HK-Y]?\d[A-HJKPSTUW\d]?|[A-PR-UWYZ][A-HK-Y]\d[A-Z]) {1,2}\d[ABD-HJLNP-UW-Z]{2}|GIR 0AA)$/i;

export const mealOrderSchema = z.object({
	order: z.object({
		orderNumber: z.string().regex(/^#\d{4,7}$/, "Order number must start with '#' followed by 4 to 7 digits"),
		email: z.string().email("Invalid email address"),
		telephone: z
			.string()
			.regex(ukMobileRegex, "Invalid UK mobile number. Please use format 07XXX XXX XXX or +447XXX XXX XXX"),
		paymentOptions: z.array(z.string()).optional(),
	}),
});

// Schema for the address details step
export const addressDetailsSchema = z.object({
	addressDetails: z.object({
		addressLine: z
			.string()
			.min(1, "Address line is required")
			.max(30, "Address line cannot be longer than 30 characters"),
		postCode: z.string().min(1, "Post code is required").regex(ukPostCodeRegex, "Invalid UK's postcode"),
		city: z.string().min(1, "City is required").max(20, "Town/City cannot be longer than 20 characters"),
	}),
});

// Schema for the delivery methods step
export const deliveryMethodsSchema = z.object({
	deliveryMethods: z.object({
		quickDelivery: z.string().min(1, "Field is required"),
		nextDayDelivery: z.string().min(1, "Field is required"),
	}),
});

export type MealOrderType = z.infer<typeof mealOrderSchema>;
export type AddressDetailsType = z.infer<typeof addressDetailsSchema>;
export type DeliveryMethodsType = z.infer<typeof deliveryMethodsSchema>;
