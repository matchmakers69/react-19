import { ApiClient } from "@services/api/apiClient";
import { useQuery } from "@tanstack/react-query";

const fetchBookingOrderInformation = async () => {
	const bookingInfo = await ApiClient("/meal-booking-information").getMealBookingInformation();
	return bookingInfo;
};

export const useBookingInfo = () => {
	return useQuery({
		queryKey: ["userBookingStatus"],
		queryFn: fetchBookingOrderInformation,
		staleTime: 2 * 60 * 1000,
	});
};
