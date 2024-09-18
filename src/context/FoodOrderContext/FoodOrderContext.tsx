import { createContext, useContext, useMemo, useReducer } from "react";
import { FoodOrderInit, FoodOrderProps } from "./defs";
import { foodReducer } from "./foodReducer";

export const FoodOrderContext = createContext<FoodOrderInit | null>(null);

export const useFoodOrderContext = () => {
	const ctx = useContext(FoodOrderContext);
	if (!ctx) {
		throw Error("You overlooked wrapping with FoodOrderContextProvider");
	}

	return ctx;
};

const initialState = {
	mealOrderStep: {
		orderNumber: "",
		email: "",
		telephone: "",
		paymentOptions: [] as string[],
	},
	addressDetailsStep: {
		addressLine: "",
		postCode: "",
		city: "",
	},
	deliveryMethodsStep: {
		quickDelivery: "",
		nextDayDelivery: "",
	},
};

const FoodOrderProvider = ({ children }: FoodOrderProps) => {
	const [state, dispatch] = useReducer(foodReducer, initialState);

	const value = useMemo(() => ({ ...state, dispatch }), [state]);

	return <FoodOrderContext.Provider value={value}>{children}</FoodOrderContext.Provider>;
};

export default FoodOrderProvider;
