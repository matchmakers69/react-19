import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import RHFTextfield from "@components/ui/formParts/RHFTextfield";
import { categoriesFormSchema, CategoriesValidationSchema } from "../schema/categoriesFormSchema";
import { Container, Box, Stack, FormHelperText, Button, Typography } from "@mui/material";
import { MuiTextField } from "@components/ui/formParts/MuiTextField";
import { useCreateQuizCategory } from "@features/quiz/queries/createQuizCategoryMutation";
import { AddQuizCategoryFormProps } from "./defs";
import { Fragment, useEffect } from "react";
import { useQuizImagesQuery } from "@features/quiz/queries/fetchQuizImagesQuery";
import ImagePicker from "../../ImagePicker";
import AnswersFieldArray from "./AnswersFieldArray";
import { QuizCategory } from "@services/api/types";

const AddQuizCategoryForm = ({ onClose }: AddQuizCategoryFormProps) => {
	const { mutate } = useCreateQuizCategory();

	const { data: quizCategoryImages, isPending, isError, error } = useQuizImagesQuery();

	const methods = useForm<CategoriesValidationSchema>({
		mode: "all",
		resolver: zodResolver(categoriesFormSchema),
		defaultValues: {
			title: "",
			description: "",
			image: "",

			quizzes: [
				{
					questionText: "",
					answers: [{ answerText: "" }],
				},
			],
		},
	});

	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isDirty, isSubmitting, isValid, isSubmitSuccessful },
	} = methods;

	const { fields, append, remove } = useFieldArray({
		control,
		name: "quizzes",
	});

	const handleSelectImage = (imagePath: string) => {
		setValue("image", imagePath, { shouldValidate: true });
		// setSelectedImage(imagePath);
	};

	const handleSubmitQuizQuery: SubmitHandler<CategoriesValidationSchema> = (data) => {
		const newCreatedQuizCategory: QuizCategory = {
			id: uuidv4(),
			title: data.title,
			description: data.description,
			image: data.image,
			quizzes: data.quizzes
				? data.quizzes.map((quiz) => ({
						id: uuidv4(), // Add a unique id for each quiz
						questionText: quiz.questionText,
						answers: quiz.answers,
					}))
				: undefined,
		};

		mutate(newCreatedQuizCategory);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
			onClose();
		}
	}, [isSubmitSuccessful, reset, onClose]);

	return (
		<FormProvider {...methods}>
			<Container
				sx={{
					marginBottom: "40px",
				}}
				maxWidth="sm"
			>
				<Box
					width="100%"
					autoComplete="off"
					noValidate
					onSubmit={handleSubmit(handleSubmitQuizQuery)}
					component="form"
				>
					<Stack gap={2}>
						<Box>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<MuiTextField
										name="title"
										id="title-value"
										placeholder="Enter category title"
										fullWidth
										hiddenLabel
										data-testid="titleValue"
										aria-label="Enter category title"
										onChange={field.onChange}
										value={field.value}
										error={!!errors["title"]}
									/>
								)}
							/>
							{errors.title && <FormHelperText>{errors.title.message}</FormHelperText>}
						</Box>
						{isPending && <Typography variant="body2">Deleting, please wait...</Typography>}
						{!isPending && quizCategoryImages && (
							<Box>
								<Controller
									name="image"
									control={control}
									render={({ field }) => (
										<ImagePicker
											selectedImage={field.value}
											images={quizCategoryImages}
											onSelect={handleSelectImage}
										/>
									)}
								/>
								{errors.image && <FormHelperText error>{errors.image.message}</FormHelperText>}
							</Box>
						)}
						{isError && <Typography variant="body1">{error.message}</Typography>}
						<Box>
							<Controller
								name="description"
								control={control}
								render={({ field }) => (
									<MuiTextField
										id="description-value"
										placeholder="Enter category description"
										name="description"
										fullWidth
										hiddenLabel
										data-testid="descriptionValue"
										aria-label="Enter category description"
										onChange={field.onChange}
										multiline
										rows={4}
										value={field.value}
										error={!!errors["description"]}
									/>
								)}
							/>
							{errors.description && <FormHelperText>{errors.description.message}</FormHelperText>}
						</Box>
						<Box>
							{fields.map((field, index) => (
								<Fragment key={field.id}>
									<Typography
										sx={{ marginBottom: "10px" }}
										variant="h6"
									>{`Add question number ${index + 1}:`}</Typography>
									<Box
										sx={{
											marginBottom: "20px",
										}}
									>
										<RHFTextfield
											placeholder="Enter your question"
											fullWidth
											label="Add question"
											name={`quizzes.${index}.questionText`}
										/>
										{/* Answers Section */}
										<Box sx={{ marginLeft: "25px", marginTop: "10px" }}>
											<Typography sx={{ marginBottom: "10px" }} variant="h6">
												Answers
											</Typography>
											<Stack gap={1}>
												{/* Use nested useFieldArray for answers */}
												<AnswersFieldArray nestIndex={index} />
											</Stack>
										</Box>
									</Box>
									<Box
										sx={{
											width: "100%",
											maxWidth: "300px",
											marginBottom: "20px",
										}}
									>
										<Button
											fullWidth
											variant="contained"
											type="button"
											onClick={() => remove(index)}
											color="error"
										>
											Remove quiz question with answers
										</Button>
									</Box>
								</Fragment>
							))}

							<Box
								sx={{
									padding: "10px 0",
									paddingTop: 0,
									width: "100%",
									maxWidth: "300px",
								}}
							>
								<Button
									fullWidth
									variant="contained"
									onClick={() =>
										append({
											questionText: "",
											answers: [],
										})
									}
									type="button"
								>
									Add next quiz question with answers
								</Button>
							</Box>
						</Box>
						<Button disabled={isSubmitting || !isValid || !isDirty} variant="outlined" type="submit">
							Submit quiz category
						</Button>
					</Stack>
				</Box>
			</Container>
		</FormProvider>
	);
};

export default AddQuizCategoryForm;
