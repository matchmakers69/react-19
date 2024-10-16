import { DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./Modal.styled";
import { type ModalProps } from "./defs";

function Modal({ children, open, onClose = () => undefined, title = "" }: ModalProps) {
	return (
		<>
			<S.BootstrapDialogContent onClose={onClose} aria-labelledby="modal-content" open={open}>
				<S.ModalTitle id="modal-title">{title}</S.ModalTitle>

				<IconButton
					aria-label="close"
					onClick={onClose}
					disableRipple
					size="large"
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						"&.MuiButtonBase-root:hover": {
							bgcolor: "transparent",
						},
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent dividers>{children}</DialogContent>
			</S.BootstrapDialogContent>
		</>
	);
}

export default Modal;
