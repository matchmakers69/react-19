import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { PropsWithChildren } from "react";
import { DefaultTheme } from "../../theme/DefaultTheme";

const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<ThemeProvider theme={DefaultTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default AppProvider;
