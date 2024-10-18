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
			questions: [
				{
					questionText: "",
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
		name: "questions",
	});

	const handleSelectImage = (imagePath: string) => {
		setValue("image", imagePath, { shouldValidate: true });
		// setSelectedImage(imagePath);
	};

	const handleSubmitQuizQuery: SubmitHandler<CategoriesValidationSchema> = (data) => {
		const newCreatedQuizCategory = {
			id: uuidv4(),
			//image: selectedImage,
			...data,
		};

		console.log(newCreatedQuizCategory, "newCreatedQuizCategory");

		// mutate(newCreatedQuizCategory);
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
									<Box
										sx={{
											marginBottom: "20px",
										}}
									>
										<RHFTextfield
											placeholder="Enter your question"
											fullWidth
											label="Add question"
											name={`questions.${index}.questionText`}
										/>
									</Box>
									<Button type="button" onClick={() => remove(index)} color="error">
										Remove
									</Button>
								</Fragment>
							))}

							<Button
								onClick={() =>
									append({
										questionText: "",
									})
								}
								type="button"
							>
								Add new question
							</Button>
						</Box>
						<Button disabled={isSubmitting || !isValid || !isDirty} variant="contained" type="submit">
							Add quiz category
						</Button>
					</Stack>
				</Box>
			</Container>
		</FormProvider>
	);
};

export default AddQuizCategoryForm;
