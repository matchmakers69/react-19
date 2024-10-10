import { useFieldArray, useFormContext } from "react-hook-form";
import RestaurantOrderIndicatorButtons from "../../RestaurantOrderIndicatorButtons";
import useRestaurantStepper from "@features/restaurant/hooks/useRestaurantStepper";
import { OrderedFoodItem } from "@features/restaurant/types";
import {
	Box,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import RHFTextfield from "@components/ui/formParts/RHFTextfield";

export const OrderedFoodItemsStep = () => {
	const { handleSubmit } = useFormContext<OrderedFoodItem>();
	const { handleGoToNextStep, handleGoToPrevStep } = useRestaurantStepper();

	const handleSubmitOrderedFoodValues = () => {
		handleGoToNextStep();
	};

	const { fields } = useFieldArray({ name: "orderedFoodItem.drinks" });
	return (
		<>
			<Typography variant="h3">Your food order</Typography>

			<Box
				onSubmit={handleSubmit(handleSubmitOrderedFoodValues)}
				autoComplete="off"
				component="form"
				noValidate
			>
				<Stack gap={5} marginBottom={8}>
					<Stack flexDirection="row" gap={4}>
						<RHFTextfield
							label="Starter drink"
							name="orderedFoodItem.starters.0.label"
							fullWidth
							variant="outlined"
							type="text"
						/>

						<RHFTextfield
							label="Chosen snack"
							name="orderedFoodItem.starters.1.label"
							fullWidth
							variant="outlined"
							type="text"
						/>
					</Stack>
					<TableContainer>
						<Table sx={{ minWidth: 300 }} aria-label="ordered meal table">
							<TableHead>
								<TableRow>
									<TableCell>
										<Typography variant="h5">Drink name</Typography>
									</TableCell>
									<TableCell align="left">
										<Typography variant="h5">Quantity</Typography>
									</TableCell>
									<TableCell align="left">
										<Typography variant="h5">Price</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{fields.map((field, index) => (
									<TableRow key={field.id}>
										<TableCell>
											<RHFTextfield
												name={`orderedFoodItem.drinks.${index}.label`}
												fullWidth
												variant="outlined"
												type="text"
											/>
										</TableCell>

										<TableCell>
											<RHFTextfield
												name={`orderedFoodItem.drinks.${index}.qnt`}
												fullWidth
												variant="outlined"
												type="number"
											/>
										</TableCell>

										<TableCell>
											<RHFTextfield
												name={`orderedFoodItem.drinks.${index}.price`}
												fullWidth
												variant="outlined"
												type="text"
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Stack>
				<RestaurantOrderIndicatorButtons onPrev={handleGoToPrevStep} />
			</Box>
		</>
	);
};
