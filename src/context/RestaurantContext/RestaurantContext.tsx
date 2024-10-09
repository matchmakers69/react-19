import { createContext, useContext, useMemo, useReducer } from "react";
import { RestaurantContextProps, RestaurantOrderInit } from "./defs";
import { OrderSteps } from "@features/restaurant/types";
import { restaurantOrderReducer } from "./restaurantOrderReducer";

const RestaurantContext = createContext<RestaurantOrderInit | null>(null);

const initialState = {
	currentStep: OrderSteps.PersonalInfo,
};

const RestaurantContextProvider = ({ children }: RestaurantContextProps) => {
	const [state, dispatch] = useReducer(restaurantOrderReducer, initialState);
	const value = useMemo(
		() => ({
			...state,
			dispatch,
		}),
		[state],
	);
	return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
};

export default RestaurantContextProvider;

export const useRestaurantContext = () => {
	const ctx = useContext(RestaurantContext);
	if (!ctx) {
		throw Error("You overlooked wrapping with RestaurantContextProvider");
	}

	return ctx;
};
