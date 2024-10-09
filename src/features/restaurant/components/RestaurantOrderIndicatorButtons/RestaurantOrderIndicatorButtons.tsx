import { Stack, Button } from "@mui/material";
import { RestaurantOrderIndicatorButtonsProps } from "./defs";

const RestaurantOrderIndicatorButtons = ({ onPrev, onSubmit }: RestaurantOrderIndicatorButtonsProps) => {
	return (
		<Stack flexDirection="row" gap={3}>
			<Button variant="contained" onClick={onPrev} type="button">
				Go back
			</Button>
			<Button variant="contained" onClick={onSubmit} type="button">
				Save and continue
			</Button>
		</Stack>
	);
};

export default RestaurantOrderIndicatorButtons;
