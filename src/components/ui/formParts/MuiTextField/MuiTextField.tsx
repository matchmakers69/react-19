import { TextField } from "@mui/material";
import { MuiTextFieldProps } from "./defs";

function MuiTextField({
	variant,
	label,
	name,
	id = "",
	"data-testid": dataTestid,
	"aria-label": ariaLabel,
	...props // Is required because now we can use TextFieldProps i.e label variant etc
}: MuiTextFieldProps) {
	return (
		<>
			<TextField
				data-testid={dataTestid}
				aria-label={ariaLabel}
				id={id}
				label={label}
				name={name}
				variant={variant}
				inputProps={{
					autoComplete: "off",
					"aria-label": "text-field",
				}}
				{...props}
			/>
		</>
	);
}

export default MuiTextField;
