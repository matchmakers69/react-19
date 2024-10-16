import { styled } from "@mui/material";

export const SpinnerBackground = styled("div")(({ theme }) => ({
	position: "fixed",
	left: 0,
	top: 0,
	width: "100vw",
	height: "100vh",
	backgroundColor: theme.palette.common.white,
	opacity: 0.6,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 2,
}));
