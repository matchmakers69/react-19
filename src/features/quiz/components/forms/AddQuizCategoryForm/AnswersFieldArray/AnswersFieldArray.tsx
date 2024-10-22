import RHFTextfield from "@components/ui/formParts/RHFTextfield";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

const AnswersFieldArray = (props: { nestIndex: number }) => {
	const { nestIndex } = props;
	const { control } = useFormContext();

	const { fields, remove, append } = useFieldArray({
		control,
		name: `quizzes.${nestIndex}.answers`,
	});
	return (
		<Box
			sx={{
				marginBottom: "20px",
			}}
		>
			{fields.map((field, index) => (
				<Box
					sx={{
						marginBottom: "10px",
					}}
					key={field.id}
					display="flex"
					alignItems="center"
				>
					<RHFTextfield
						placeholder="Enter answer"
						fullWidth
						name={`quizzes.${nestIndex}.answers.${index}.answerText`}
					/>
					<IconButton onClick={() => remove(index)} color="error" aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</Box>
			))}
			<Button
				sx={{
					maxWidth: "150px",
				}}
				variant="outlined"
				type="button"
				onClick={() => append({ answerText: "" })}
			>
				Add Answer
			</Button>
		</Box>
	);
};

export default AnswersFieldArray;
