import { ChangeEvent } from "react";

export interface RestaurantStepsPaginationProps {
	steps: number;
	handleChange: (event: ChangeEvent<unknown>, value: number) => void;
	currentPage: number;
}
