import PageTitle from "@components/ui/PageTitle";
import MultistepOrderFormContainer from "@features/restaurant/components/MultistepOrderFormContainer";
import { useRestaurantOrder } from "@features/restaurant/queries/useRestaurantOrder";
import { Typography } from "@mui/material";

const RestaurantPage = () => {
	const { isPending, isLoading, error, data: restaurantOrderSteps } = useRestaurantOrder();

	if (isPending || isLoading) {
		return <Typography variant="h6">Restaurant order is loading...</Typography>;
	}

	if (error) {
		return <Typography variant="h6">{error.message || "Something went wrong!"}</Typography>;
	}
	return (
		<>
			<PageTitle title="'U Mariana'" />
			<MultistepOrderFormContainer restaurantStep={restaurantOrderSteps} />
		</>
	);
};

export default RestaurantPage;
