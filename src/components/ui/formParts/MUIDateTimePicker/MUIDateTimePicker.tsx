import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { MUIDateTimePickerProps } from "./defs";
import { DateTimePicker } from "@mui/x-date-pickers";

const MUIDateTimePicker = <T extends FieldValues>({ name, label }: MUIDateTimePickerProps<T>) => {
	const { control } = useFormContext<T>();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				// LocalizationProvider could be used in  higher component i.e App.tsx
				<DateTimePicker views={["day", "month", "year"]} label={label} {...field} />
			)}
		/>
	);
};

export default MUIDateTimePicker;
