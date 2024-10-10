import { CheckoutDetail, DeliveryMethod, OrderedFoodItem, PersonalInfo } from "../types";

export const getDefaultValuesForRestaurantStepper = () => {
	// Person info  step default values
	const getPersonInfoValues = (data: PersonalInfo[]) => {
		return data.reduce((acc, item) => {
			return {
				...acc,
				[item.label]: item.value,
			};
		}, {});
	};

	// Food item  step default values
	const getFoodItemValues = (foodItems: OrderedFoodItem[]): OrderedFoodItem => {
		return foodItems.reduce((acc, foodItem) => {
			return {
				...acc,
				label: foodItem.label,
				starters: foodItem.starters,
				drinks: foodItem.drinks,
				sandwiches: foodItem.sandwiches,
			};
		}, {} as OrderedFoodItem);
	};
	// Checkout details step default values
	const getCheckoutDetailsValues = (checkoutDetails: CheckoutDetail[]) => {
		return checkoutDetails.reduce(
			(acc, checkoutItem) => ({
				...acc,
				[checkoutItem.label]: checkoutItem.paymentMethod || checkoutItem.deliveryWithin,
			}),
			{},
		);
	};

	// Delivery address detaills default values
	const getDeliveryAddressDetails = (deliveryMethods: DeliveryMethod[]) => {
		return deliveryMethods.reduce(
			(acc, deliveryMethodItem) => ({
				...acc,
				[deliveryMethodItem.label]: deliveryMethodItem.value,
			}),
			{},
		);
	};
	return { getPersonInfoValues, getFoodItemValues, getCheckoutDetailsValues, getDeliveryAddressDetails };
};
