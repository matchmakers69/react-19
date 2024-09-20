import { ApiClient } from "@services/api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingInfo } from "@services/api/types";

const updateBookingInfo = async (bookingInfo: BookingInfo) => {
	return await ApiClient("/meal-booking-information").updateMealBookingInformation(bookingInfo);
};

export const useUpdateBookingInfo = () => {
	const queryClient = useQueryClient();
	const { isPending: isLoadingUpdate, mutate: updateBookingInfoMutation } = useMutation({
		mutationFn: (bookingInfo: BookingInfo) => updateBookingInfo(bookingInfo),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["userBookingStatus"],
			});
		},
		onError: (error) => {
			console.error(error);
			if (error) {
				throw new Error("Update was not possible");
			}
		},
	});
	return {
		isLoadingUpdate,
		updateBookingInfoMutation,
	};
};
