import { FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { CheckMealOrderBookingFormProps } from "./defs";
import { bookingInfoSchema, BookingValidationSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Stack } from "@mui/material";
import MUISwitch from "@components/ui/formParts/MUISwitch";
import { useEffect } from "react";
import { useUpdateBookingInfo } from "@features/mealOrderStepper/queries/useUpdateBookingInfo";

const CheckMealOrderBookingForm = ({ bookingInfo }: CheckMealOrderBookingFormProps) => {
	const { updateBookingInfoMutation } = useUpdateBookingInfo();

	const methods = useForm<BookingValidationSchema>({
		mode: "onSubmit",
		resolver: zodResolver(bookingInfoSchema),
		defaultValues: {
			isAlreadyBooked: bookingInfo?.isAlreadyBooked ?? false,
		},
	});

	// Just in case
	useEffect(() => {
		methods.trigger();
	}, [methods]);

	const {
		handleSubmit,
		formState: { isDirty, isValid },
		control,
	} = methods;

	const isReturningClient = useWatch({ control, name: "isAlreadyBooked" });

	const handleSubmitUpdateBookingInfo: SubmitHandler<BookingValidationSchema> = (data) => {
		updateBookingInfoMutation(data, {
			onSuccess: () => {
				methods.reset(data); // Reset form state after successful update
			},
		});
	};

	return (
		<Container maxWidth="sm">
			<FormProvider {...methods}>
				<Box onSubmit={handleSubmit(handleSubmitUpdateBookingInfo)} component="form">
					<Stack gap={4}>
						<MUISwitch<BookingValidationSchema>
							name="isAlreadyBooked"
							label={isReturningClient ? "Already booked" : "First time client"}
						/>

						<Button disabled={!isValid || !isDirty} variant="contained" type="submit">
							Change status
						</Button>
					</Stack>
				</Box>
			</FormProvider>
		</Container>
	);
};

export default CheckMealOrderBookingForm;
