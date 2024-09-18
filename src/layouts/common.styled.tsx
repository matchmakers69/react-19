import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const RootWrapper = styled(Box)({
	display: "flex",
	minHeight: "100vh",
	flexDirection: "column",
	width: "100%",
	backgroundImage: "linear-gradient(180deg, #CEE5FD, #FFF)",
	backgroundSize: "100% 25rem",
	backgroundRepeat: "no-repeat",
});

export const MainWrapper = styled(Box)(({ theme }) => ({
	flexGrow: 1,
	minWidth: "1%",
	width: "100%",

	[theme.breakpoints.up("md")]: {
		marginTop: 0,
	},
}));
