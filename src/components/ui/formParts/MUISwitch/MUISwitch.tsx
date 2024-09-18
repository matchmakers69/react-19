import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { MUISwitchProps } from "./defs";
import { FormControlLabel, Switch } from "@mui/material";

const MUISwitch = <T extends FieldValues>({ name, label }: MUISwitchProps<T>) => {
	const { control } = useFormContext<T>();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FormControlLabel label={label} control={<Switch {...field} checked={field.value} />} />
			)}
		/>
	);
};

export default MUISwitch;
