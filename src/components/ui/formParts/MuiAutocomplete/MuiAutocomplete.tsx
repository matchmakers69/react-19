import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { MuiAutocompleteProps } from "./defs";

const MuiAutocomplete = <T extends FieldValues>({ name, options, label }: MuiAutocompleteProps<T>) => {
	const { control } = useFormContext<T>();

	const foundOptionById = (id: string) => {
		const foundOption = options?.find((option) => option.id === id);
		return foundOption;
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
				<Autocomplete
					multiple // important to be added for iterration
					value={value.map((id: string) => foundOptionById(id))}
					// on the first iterration value is undefined causes error, defaultValue would be required
					options={options || []}
					getOptionLabel={(option) => options?.find((item) => item.id === option.id)?.label ?? ""}
					isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
					onChange={(_, newValue) => {
						onChange(newValue.map((item) => item.id));
					}}
					disableCloseOnSelect
					renderInput={(params) => (
						<TextField
							{...params}
							fullWidth
							inputRef={ref}
							error={!!error}
							helperText={error?.message}
							label={label}
						/>
					)}
					// additional for checkboxes
					renderOption={(props, option, { selected }) => (
						<Box component="li" {...props} key={props.id}>
							<Checkbox
								icon={<CheckBoxOutlineBlankIcon />}
								checkedIcon={<CheckBoxIcon />}
								checked={selected}
							/>
							{option.label}
						</Box>
					)}
				/>
			)}
		/>
	);
};

export default MuiAutocomplete;
