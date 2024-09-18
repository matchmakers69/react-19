import { ReactNode } from "react";

export type BaseProps<T = ReactNode> = {
	children?: T;
	["data-testid"]?: string;
};

export type Option = {
	id: string;
	label: string;
};
