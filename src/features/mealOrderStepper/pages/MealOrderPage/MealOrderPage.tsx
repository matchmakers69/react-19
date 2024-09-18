import PageTitle from "@components/ui/PageTitle";
import { useFoodOrderContext } from "@context/FoodOrderContext/FoodOrderContext";
import MealOrderWizard from "@features/mealOrderStepper/components/MealOrderWizard";
import { useMealOrderSteps } from "@features/mealOrderStepper/queries/useMealOrderSteps";
import { useEffect } from "react";

const FoodPage = () => {
	const { data: mealOrderSteps, isLoading, isError } = useMealOrderSteps();
	const { dispatch } = useFoodOrderContext();

	useEffect(() => {
		if (mealOrderSteps) {
			dispatch({ type: "SET_MEAL_ORDER", payload: mealOrderSteps.order });
			dispatch({ type: "SET_ADDRESS_DETAILS", payload: mealOrderSteps.addressDetails });
			dispatch({ type: "SET_DELIVERY_METHODS", payload: mealOrderSteps.deliveryMethods });
		}
	}, [mealOrderSteps, dispatch]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error loading meal order steps</div>;
	return (
		<>
			<PageTitle title="Order your meal with us!" />
			<MealOrderWizard />
		</>
	);
};

export default FoodPage;
