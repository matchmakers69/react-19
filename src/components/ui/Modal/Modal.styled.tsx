import { styled } from "@mui/material/styles";
import { Dialog as MUIDialog, DialogTitle as MUIDialogTitle } from "@mui/material";

export const BootstrapDialogContent = styled(MUIDialog, {
	name: "MuiCustomModal",
	slot: "MuiCustomModal",
	skipSx: false,
})((props) => ({
	"& .MuiPaper-root": {
		minWidth: 320,
		maxWidth: "700px",
		with: "100%",
		backgroundColor: "white",
		[props.theme.breakpoints.up("sm")]: {
			minWidth: 500,
		},
		[props.theme.breakpoints.up("md")]: {
			minWidth: 600,
		},
		[props.theme.breakpoints.up("lg")]: {
			minWidth: 700,
		},
	},
	"& .MuiDialogContent-root": {
		padding: props.theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: props.theme.spacing(1),
	},
}));

export const ModalTitle = styled(MUIDialogTitle, {
	name: "MuiCustomModalTitle",
	slot: "MuiCustomModalTitle",
	skipSx: true,
})((props) => ({
	margin: 0,
	fontSize: "2rem",
	[props.theme.breakpoints.up("sm")]: {
		fontSize: "2.4rem",
	},
}));
