import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { MUISliderProps } from "./defs";
import { Slider, Typography } from "@mui/material";

const MUISlider = <T extends FieldValues>({ name, label }: MUISliderProps<T>) => {
	const { control } = useFormContext<T>();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<>
					<Typography>{label}</Typography>
					<Slider {...field} valueLabelDisplay="auto" />
				</>
			)}
		/>
	);
};

export default MUISlider;
