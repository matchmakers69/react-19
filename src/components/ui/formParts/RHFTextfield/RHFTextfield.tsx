import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { RHFTextfieldProps } from "./defs";
import { TextField } from "@mui/material";

const RHFTextfield = <T extends FieldValues>({
	name,
	id = "",
	"data-testid": dataTestid = "text-field-input",
	"aria-label": ariaLabel,
	...props
}: RHFTextfieldProps<T>) => {
	const { control } = useFormContext<T>();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<TextField
					helperText={error?.message}
					error={!!error}
					data-testid={dataTestid}
					aria-label={ariaLabel}
					id={id}
					{...props}
					{...field}
				/>
			)}
		/>
	);
};

export default RHFTextfield;
