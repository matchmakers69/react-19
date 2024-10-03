import { Worker } from "@services/api/types";
import { ReactNode } from "react";

export type BaseProps<T = ReactNode> = {
	children?: T;
	["data-testid"]?: string;
};

export type Option = {
	id: string;
	label: string;
};

export type Nationality = "US" | "UK" | "FR" | "DE" | "NL" | "PL" | "IT" | "ES";

export type BenefitServiceType = "lunch-card" | "healthcare" | "sport-system" | "cafeteria.io";

export type DateString = string;
export type Email = string;
export type Phone = string;
export type Money = number;

export type EmployeeSearchParams = Partial<Pick<Worker, "nationality" | "lastName">>;
