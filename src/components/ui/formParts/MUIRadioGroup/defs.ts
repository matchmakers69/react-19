import { FieldValues, Path } from "react-hook-form";
import { Option } from "types/defs";

export type MUIRadioGroupProps<T extends FieldValues> = {
	name: Path<T>; // we cannot pass string - thats why we use generic type
	options: Option[];
	label: string;
};
