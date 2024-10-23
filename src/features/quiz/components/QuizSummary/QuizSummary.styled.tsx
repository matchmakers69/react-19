import { ListItem, ListItemText, styled } from "@mui/material";

export const StyledListItem = styled(ListItem)({
	display: "list-item",
	paddingLeft: 0,
	paddingRight: 0,
});

export const StyledListItemText = styled(ListItemText, {
	shouldForwardProp: (prop) => prop !== "answerColor",
})<{ answerColor: string }>(({ theme, answerColor }) => ({
	"& .MuiTypography-body2": {
		color:
			answerColor === "correct"
				? theme.palette.success.main
				: answerColor === "incorrect"
					? theme.palette.error.main
					: answerColor === "skipped"
						? theme.palette.warning.main
						: theme.palette.text.primary,
		fontWeight: answerColor !== "default" ? "bold" : "normal",
	},
}));
