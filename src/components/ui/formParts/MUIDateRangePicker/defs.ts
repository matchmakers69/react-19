import { FieldValues, Path } from "react-hook-form";

export type MUIDateRangePickerProps<T extends FieldValues> = {
	name: Path<T>; // we cannot pass string - thats why we use generic type
};
