import { FieldValues, Path } from "react-hook-form";

export type MUISliderProps<T extends FieldValues> = {
	name: Path<T>; // we cannot pass string - thats why we use generic type
	label: string;
};
