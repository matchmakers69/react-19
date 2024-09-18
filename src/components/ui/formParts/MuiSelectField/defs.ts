import { FieldError } from "react-hook-form";

export type Value = string | number;

export type OptionType = Value | { label: string | null; value: Value; disabled?: boolean };

interface CustomSelectProps<T extends OptionType> {
	id: string;
	inputLabelId: string;
	label?: string;
	name: string;
	value: Value;
	onChange: (option: T) => void;
	options: T[];
	displayEmpty?: boolean;
	placeholder?: string;
	emptyLabel?: string;
	["data-testid"]?: string;
	["aria-label"]?: string;
	error?: FieldError | boolean;
}

export type MuiSelectFieldProps<T extends OptionType> = CustomSelectProps<T>;
