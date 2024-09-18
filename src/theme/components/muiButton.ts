import { Components } from "@mui/material/styles/components";

import { brand } from "../palette";
import { alpha } from "@mui/material";

export const muiButton: Components = {
	MuiButton: {
		styleOverrides: {
			root: ({ ownerState }) => ({
				boxSizing: "border-box",
				boxShadow: "none",
				borderRadius: "10px",
				textTransform: "none",
				"&:active": {
					transform: "scale(0.98)",
				},
				...(ownerState.size === "small" && {
					maxHeight: "32px",
				}),
				...(ownerState.size === "medium" && {
					height: "40px",
				}),
				...(ownerState.variant === "contained" &&
					ownerState.color === "primary" && {
						color: brand[50],
						background: brand[500],
						backgroundImage: `linear-gradient(to bottom, ${brand[400]}, ${brand[600]})`,
						boxShadow: `inset 0 1px ${alpha(brand[300], 0.4)}`,
						outline: `1px solid ${brand[700]}`,
						"&:hover": {
							background: brand[400],
							backgroundImage: "none",
							boxShadow: `0 0 0 1px  ${alpha(brand[300], 0.5)}`,
						},
					}),
				...(ownerState.variant === "outlined" && {
					backgroundColor: alpha(brand[300], 0.1),
					borderColor: brand[300],
					color: brand[500],
					"&:hover": {
						backgroundColor: alpha(brand[300], 0.3),
						borderColor: brand[200],
					},
				}),
				...(ownerState.variant === "text" && {
					color: brand[500],
					"&:hover": {
						backgroundColor: alpha(brand[300], 0.3),
						borderColor: brand[200],
					},
				}),
			}),
		},
	},
};
