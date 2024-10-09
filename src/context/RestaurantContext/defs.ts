import { OrderSteps } from "@features/restaurant/types";
import { Dispatch } from "react";
import { BaseProps } from "types/defs";

export type RestaurantContextProps = BaseProps;

export type RestaurantOrderState = {
	currentStep: OrderSteps;
};

export type RestaurantOrderActions = { type: "SET_ORDER_STEP"; payload: OrderSteps };

export type RestaurantOrderInit = RestaurantOrderState & {
	dispatch: Dispatch<RestaurantOrderActions>;
};
