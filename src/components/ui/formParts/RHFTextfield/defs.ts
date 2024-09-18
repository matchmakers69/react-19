import { TextFieldProps } from "@mui/material/TextField";
import { FieldValues, Path } from "react-hook-form";

export interface RHFTextfieldProps<T extends FieldValues> extends Omit<TextFieldProps, "name"> {
	name: Path<T>;
	id?: string;
	maxWidth?: number;
	minWidth?: number;
	["data-testid"]?: string;
	["aria-label"]?: string;
}
