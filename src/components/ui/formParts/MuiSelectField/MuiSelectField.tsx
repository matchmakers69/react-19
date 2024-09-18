import { MuiSelectFieldProps, OptionType } from "./defs";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

function MuiSelectField<T extends OptionType>({
	id,
	inputLabelId,
	options,
	value,
	onChange,
	label,
	placeholder,
	emptyLabel,
	displayEmpty,
	error,
	"data-testid": dataTestid,
}: MuiSelectFieldProps<T>) {
	const handleChange = (e: SelectChangeEvent<OptionType>) => {
		const selectedValue = options.find((option) =>
			typeof option === "number" || typeof option === "string"
				? option === e.target.value
				: option.value === e.target.value,
		);

		if (selectedValue) {
			onChange(selectedValue as T);
		}
	};

	return (
		<FormControl
			data-testid="form-control"
			error={!!error}
			sx={{
				m: 0,
				width: "100%",
			}}
		>
			{label && <InputLabel id={inputLabelId}>{label}</InputLabel>}
			<Select
				id={id}
				value={value || ""}
				onChange={handleChange}
				data-hj-suppress
				data-testid={dataTestid}
				displayEmpty={displayEmpty}
				SelectDisplayProps={{
					role: "combobox",
					"aria-controls": "select-field-menu",
				}}
				MenuProps={{
					MenuListProps: { id: "select-field-menu" },
					PaperProps: {
						sx: {
							borderRadius: 0,
							bgcolor: "background.default",
						},
					},
				}}
			>
				{displayEmpty && (
					<MenuItem value="" disabled>
						{emptyLabel}
					</MenuItem>
				)}
				{placeholder && (
					<MenuItem value="" disabled>
						{placeholder}
					</MenuItem>
				)}
				{options.map((option) => {
					if (typeof option === "object") {
						return (
							<MenuItem data-hj-suppress disabled={option.disabled} value={option.value} key={option.label}>
								{option.value}
							</MenuItem>
						);
					}

					return (
						<MenuItem data-hj-suppress value={option} key={option}>
							{option}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
}

export default MuiSelectField;
