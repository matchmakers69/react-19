import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { MUICheckboxProps } from "./defs";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@mui/material";

const MUICheckbox = <T extends FieldValues>({ name, label, options }: MUICheckboxProps<T>) => {
	const { control } = useFormContext<T>();
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<FormControl error={!!error}>
					<FormLabel>{label}</FormLabel>
					<FormGroup>
						{options?.map((option) => (
							<FormControlLabel
								control={
									<Checkbox
										checked={value.includes(option.id)}
										onChange={() => {
											if (value.includes(option.id)) {
												onChange((value as string[]).filter((item) => item !== option.id));
											} else {
												onChange([...value, option.id]);
											}
										}}
										key={option.id}
									/>
								}
								label={option.label}
								key={option.id}
							/>
						))}
					</FormGroup>
					<FormHelperText>{error?.message}</FormHelperText>
				</FormControl>
			)}
		/>
	);
};

export default MUICheckbox;
