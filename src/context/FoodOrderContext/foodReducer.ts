import { FoodOrderActions, FoodOrderState } from "./defs";

export const foodReducer = (state: FoodOrderState, action: FoodOrderActions): FoodOrderState => {
	switch (action.type) {
		case "SET_MEAL_ORDER":
			return {
				...state,
				mealOrderStep: action.payload,
			};
		case "SET_ADDRESS_DETAILS":
			return {
				...state,
				addressDetailsStep: action.payload,
			};

		case "SET_DELIVERY_METHODS":
			return {
				...state,
				deliveryMethodsStep: action.payload,
			};
		default:
			return state;
	}
};
