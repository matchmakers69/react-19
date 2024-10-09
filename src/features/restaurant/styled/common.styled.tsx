import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";

export const RestaurantFormWrapper = styled(Paper)(({ theme }) => ({
	background: theme.palette.common.white,
	boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.16)",
	border: "none",
	padding: theme.spacing(4, 2),
}));
