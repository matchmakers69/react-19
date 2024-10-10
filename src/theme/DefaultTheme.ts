import { alpha, createTheme } from "@mui/material/styles";

import { brand, gray, palette } from "./palette";
import { typography } from "./typography";
import { muiButton } from "./components/muiButton";
import { breakpoints } from "./breakpoints";

// declare modules for custom palette colors
declare module "@mui/material/styles/createPalette" {
	interface Palette {
		grid: { main: string; dark: string };
	}

	interface PaletteOptions {
		grid?: { main: string; dark: string };
	}
}

// declare module for custom button variant
declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		beautiful: true;
	}
}

// declare module for extra breakpoint
declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		xs: true;
		sm: true;
		lg: true;
		sl: true;
		xl: true;
	}
}

const DefaultTheme = createTheme({
	palette,
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				"html, body": {
					width: "100%",
					height: "100%",
				},
				html: {
					MozOsxFontSmoothing: "grayscale",
					WebkitFontSmoothing: "antialiased",
				},
				body: {
					padding: 0,
					width: "100%",
					flex: 1,
					overflowX: "hidden",
				},
				"#root": {
					width: "100%",
					display: "flex",
					flex: 1,
					flexDirection: "column",
				},
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableTouchRipple: true,
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					boxSizing: "border-box",
					transition: "all 100ms ease-in",
					"&.MuiButton-root": {
						"&.Mui-disabled": {
							color: "white",
						},
					},
					"&.Mui-disabled": {
						opacity: 0.3,
					},
					"&:focus-visible": {
						outline: `3px solid ${alpha(brand[500], 0.5)}`,
						outlineOffset: "2px",
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: ({ ownerState }) => ({
					backgroundColor: gray[50],
					borderRadius: 10,
					border: `1px solid ${alpha(gray[200], 0.8)}`,
					boxShadow: "none",
					transition: "background-color, border, 80ms ease",
					...(ownerState.variant === "outlined" && {
						background: `linear-gradient(to bottom, #FFF, ${gray[50]})`,
						"&:hover": {
							borderColor: brand[300],
							boxShadow: `0 0 24px ${brand[100]}`,
						},
					}),
				}),
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: () => ({
					borderColor: `${alpha(gray[200], 0.8)}`,
				}),
			},
		},
		MuiLink: {
			defaultProps: {
				underline: "none",
			},
			styleOverrides: {
				root: () => ({
					color: brand[600],
					fontWeight: 500,
					position: "relative",
					textDecoration: "none",
					"&::before": {
						content: '""',
						position: "absolute",
						width: 0,
						height: "1px",
						bottom: 0,
						left: 0,
						backgroundColor: brand[200],
						opacity: 0.7,
						transition: "width 0.3s ease, opacity 0.3s ease",
					},
					"&:hover::before": {
						width: "100%",
						opacity: 1,
					},
				}),
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: () => ({
					borderRadius: 0,
					color: gray[500],
					fontWeight: 500,
					"&.Mui-disabled": {
						color: gray[200],
						opacity: 0.9,
					},
					"&.Mui-selected.Mui-disabled": {
						backgroundColor: "transparent",
					},
				}),
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: () => ({
					backgroundImage: "none",
					backgroundColor: gray[100],
				}),
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					"&:focus": {
						background: "transparent",
					},
				},
				root: {
					"&.MuiOutlinedInput-root": {
						borderRadius: "10px",
						border: "1px solid",
						borderColor: gray[200],
						transition: "border-color 120ms ease-in",
						background: `${alpha("#FFF", 0.3)}`,

						"& fieldset": {
							border: "none",
							boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
						},
						"&:hover": {
							borderColor: brand[300],
						},
						"&.Mui-focused": {
							borderColor: brand[400],
							outline: "4px solid",
							outlineColor: brand[200],
						},

						"&:before": {
							borderBottom: "none",
						},
						"&:focus": {
							background: "transparent",
						},
					},
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: () => ({
					"& label .Mui-focused": {
						color: "white",
					},
					"& .MuiInputBase-input": {
						"&::placeholder": {
							opacity: 0.8,
						},
					},

					"& .MuiOutlinedInput-root": {
						boxSizing: "border-box",
						height: "100%",
						borderRadius: "10px",
						transition: "border-color 120ms ease-in",
						"& fieldset": {
							border: "1px solid",
							borderColor: gray[200],
							boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
							background: `${alpha("#FFF", 0.3)}`,
						},
						"&:hover": {
							borderColor: brand[200],
						},
						"&:hover fieldset": {
							borderColor: brand[200],
						},
						"&.Mui-focused fieldset": {
							borderColor: brand[300],
						},
					},
				}),
			},
		},
		...muiButton,
		MuiListItemButton: {
			styleOverrides: {
				root: {
					padding: "7px 14px",
					borderRadius: "999px",
					color: `${alpha(brand[700], 1)}`,
					"&.Mui-selected, &.Mui-selected:hover": {
						backgroundColor: palette.primary.light,
						color: palette.text.light,
					},
					"&:hover": {
						backgroundColor: palette.primary.light,
						color: palette.text.light,
					},
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					padding: 0,
					margin: 0,
				},
			},
		},
	},
	typography,
	breakpoints,
	zIndex: {
		appBar: 1150,
	},
	spacing: 8,
});

export { DefaultTheme };
