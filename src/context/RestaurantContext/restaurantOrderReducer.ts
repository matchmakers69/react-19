import { RestaurantOrderActions, RestaurantOrderState } from "./defs";

export const restaurantOrderReducer = (state: RestaurantOrderState, action: RestaurantOrderActions) => {
	switch (action.type) {
		case "SET_ORDER_STEP":
			return {
				...state,
				currentStep: action.payload,
			};
		default:
			return state;
	}
};
