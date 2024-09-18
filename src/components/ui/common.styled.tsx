import { AppBar as MUIAppBar, Toolbar as MUIToolbar } from "@mui/material";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const FlexRight = styled(Box)({
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
});

export const FlexBetween = styled(Box)({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
});

export const AppBar = styled(MUIAppBar)({
	marginTop: 20,
	backgroundColor: "transparent",
	backgroundImage: "none",
	boxShadow: "none",
});

export const Toolbar = styled(MUIToolbar)({
	display: "flex",
	alignItems: "center",
	flexShrink: 0,
	borderRadius: "999px",
	backgroundColor: "rgba(255, 255, 255, 0.4)",
	backdropFilter: "blur(24px)",
	maxHeight: 40,
	border: "1px solid",
	borderColor: "divider",
	boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
});
