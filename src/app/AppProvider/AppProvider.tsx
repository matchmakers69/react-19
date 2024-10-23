import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { PropsWithChildren } from "react";
import { DefaultTheme } from "../../theme/DefaultTheme";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@features/quiz/components/ErrorFallback";
import { handleError } from "@utils/errorHandler";

const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<ThemeProvider theme={DefaultTheme}>
			<CssBaseline />
			<ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
				{children}
			</ErrorBoundary>
		</ThemeProvider>
	);
};

export default AppProvider;
