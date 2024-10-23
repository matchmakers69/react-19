import { Box, Button, Typography } from "@mui/material";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<Box role="alert">
			<Typography component="h2" variant="h2">
				Something went wrong
			</Typography>
			<Typography component="h3" variant="h3">
				{error.message}
			</Typography>

			<Button variant="outlined" onClick={resetErrorBoundary}>
				Try again
			</Button>
		</Box>
	);
};

export default ErrorFallback;
