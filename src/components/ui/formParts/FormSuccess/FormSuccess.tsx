import { Box, Typography } from "@mui/material";
import { type FormSuccessProps } from "./defs";

const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) return null;

	return (
		<Box>
			<Typography color="error.success" variant="body2" aria-live="polite">
				{message}
			</Typography>
		</Box>
	);
};

export default FormSuccess;
