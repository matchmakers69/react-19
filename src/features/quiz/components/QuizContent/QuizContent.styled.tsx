import { ListItem, ListItemButton, styled } from "@mui/material";

export const StyledListItem = styled(ListItem)({
	marginBottom: 12,
	"&:last-child": {
		marginBottom: 0,
	},
});

export const StyledListItemButton = styled(ListItemButton, {
	shouldForwardProp: (prop) => prop !== "colorStatus",
})<{ colorStatus: string }>(({ colorStatus }) => ({
	backgroundColor:
		colorStatus === "correct"
			? "lightgreen"
			: colorStatus === "incorrect"
				? "lightcoral"
				: colorStatus === "skipped"
					? "lightyellow"
					: "inherit",
	"&:hover": {
		backgroundColor:
			colorStatus === "correct"
				? "lightgreen"
				: colorStatus === "incorrect"
					? "lightcoral"
					: colorStatus === "skipped"
						? "lightyellow"
						: "rgba(0, 0, 0, 0.04)",
	},
	"&.Mui-disabled": {
		backgroundColor:
			colorStatus === "correct"
				? "lightgreen"
				: colorStatus === "incorrect"
					? "lightcoral"
					: colorStatus === "skipped"
						? "lightyellow"
						: "rgba(0, 0, 0, 0.12)",
	},
}));
