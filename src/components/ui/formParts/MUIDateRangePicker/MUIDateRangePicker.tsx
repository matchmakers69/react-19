import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { MUIDateRangePickerProps } from "./defs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const MUIDateRangePicker = <T extends FieldValues>({ name }: MUIDateRangePickerProps<T>) => {
	const { control } = useFormContext<T>();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, ...restField } }) => (
				<DateRangePicker value={Array.isArray(value) ? value : [null, null]} {...restField} />
			)}
		/>
	);
};

export default MUIDateRangePicker;
