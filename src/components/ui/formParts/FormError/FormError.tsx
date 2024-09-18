import { Box, Typography } from "@mui/material";
import { type FormErrorProps } from "./defs";

const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<Box>
			<Typography color="error.main" variant="body2" aria-live="assertive">
				{message}
			</Typography>
		</Box>
	);
};

export default FormError;
