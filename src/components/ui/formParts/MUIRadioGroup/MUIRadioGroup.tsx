import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { MUIRadioGroupProps } from "./defs";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const MUIRadioGroup = <T extends FieldValues>({ name, label, options }: MUIRadioGroupProps<T>) => {
	const { control } = useFormContext<T>();
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<FormControl {...field} error={!!error}>
					<FormLabel>{label}</FormLabel>
					<RadioGroup>
						{options?.map((option) => (
							<FormControlLabel
								label={option.label}
								control={<Radio checked={field.value === option.id} />}
								value={option.id}
								key={option.id}
							/>
						))}
					</RadioGroup>
				</FormControl>
			)}
		/>
	);
};

export default MUIRadioGroup;
