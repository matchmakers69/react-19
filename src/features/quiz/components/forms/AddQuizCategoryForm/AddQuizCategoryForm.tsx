import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { categoriesFormSchema, CategoriesValidationSchema } from "../schema/categoriesFormSchema";
import { Container, Box, Stack, FormHelperText, Button, Typography } from "@mui/material";
import { MuiTextField } from "@components/ui/formParts/MuiTextField";
import { useCreateQuizCategory } from "@features/quiz/queries/createQuizCategoryMutation";
import { AddQuizCategoryFormProps } from "./defs";
import { useEffect, useState } from "react";
import { useQuizImagesQuery } from "@features/quiz/queries/fetchQuizImagesQuery";
import ImagePicker from "../../ImagePicker";

const AddQuizCategoryForm = ({ onClose }: AddQuizCategoryFormProps) => {
	const { mutate } = useCreateQuizCategory();
	const [selectedImage, setSelectedImage] = useState<string>();
	const { data: quizCategoryImages, isPending, isError, error } = useQuizImagesQuery();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isSubmitting, isValid, isSubmitSuccessful },
	} = useForm<CategoriesValidationSchema>({
		mode: "all",
		resolver: zodResolver(categoriesFormSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const handleSelectImage = (imagePath: string) => {
		setSelectedImage(imagePath);
	};

	const handleSubmitQuizQuery: SubmitHandler<CategoriesValidationSchema> = (data) => {
		const newCreatedQuizCategory = {
			id: uuidv4(),
			image: selectedImage,
			...data,
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
		<>
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
								<ImagePicker
									selectedImage={selectedImage}
									images={quizCategoryImages}
									onSelect={handleSelectImage}
								/>
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
						<Button disabled={isSubmitting || !isValid || !isDirty} variant="contained" type="submit">
							Add quiz category
						</Button>
					</Stack>
				</Box>
			</Container>
		</>
	);
};

export default AddQuizCategoryForm;