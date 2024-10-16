import * as S from "./Spinner.styled";
import { CircularProgress } from "@mui/material";
import { SpinnerProps } from "./types";

const Spinner = ({ color }: SpinnerProps) => {
	return (
		<S.SpinnerBackground>
			<CircularProgress color={color} aria-label="loading-spinner" />
		</S.SpinnerBackground>
	);
};

export default Spinner;
