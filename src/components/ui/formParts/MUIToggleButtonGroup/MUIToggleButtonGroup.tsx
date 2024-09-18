import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { MUIToggleButtonGroupProps } from "./defs";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const MUIToggleButtonGroup = <T extends FieldValues>({ name, options }: MUIToggleButtonGroupProps<T>) => {
	const { control } = useFormContext<T>();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value, ...restField } }) => (
				<ToggleButtonGroup
					onChange={(_, newValue) => {
						if (newValue.length) {
							onChange(newValue);
						}
					}}
					value={value.length ? value : [options?.[0].id]}
					{...restField}
				>
					{options?.map((option) => (
						<ToggleButton value={option.id} key={option.id}>
							{option.label}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			)}
		/>
	);
};

export default MUIToggleButtonGroup;
