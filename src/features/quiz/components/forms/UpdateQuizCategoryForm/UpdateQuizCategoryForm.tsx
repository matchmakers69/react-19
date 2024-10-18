import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Container, Box, Stack, FormHelperText, Button, Typography } from "@mui/material";
import { MuiTextField } from "@components/ui/formParts/MuiTextField";
import { QuizCategoryUpdateFormProps } from "./defs";
import { CategoriesValidationSchema, categoriesFormSchema } from "../schema/categoriesFormSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateQuizCategoryMutation } from "@features/quiz/queries/updateQuizCategoryMutation";
import ImagePicker from "../../ImagePicker";
import { useQuizImagesQuery } from "@features/quiz/queries/fetchQuizImagesQuery";

const UpdateQuizCategoryForm = ({ quizCategory }: QuizCategoryUpdateFormProps) => {
	const [selectedImage, setSelectedImage] = useState<string>(quizCategory?.image || "");
	const updateQuizCategoryMutation = useUpdateQuizCategoryMutation();
	const navigate = useNavigate();
	const { id } = useParams();
	const { data: quizCategoryImages, isPending, isError, error } = useQuizImagesQuery();
	const {
		control,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isSubmitting, isValid },
	} = useForm<CategoriesValidationSchema>({
		mode: "all",
		resolver: zodResolver(categoriesFormSchema),
		defaultValues: {
			title: quizCategory?.title,
			description: quizCategory?.description,
			//image: quizCategory?.image
		},
	});

	const handleSelectQuizCategoryImage = (imagePath: string) => {
		setSelectedImage(imagePath);
	};

	const handleSubmitUpdateQuizQuery: SubmitHandler<CategoriesValidationSchema> = (updatedQuizCategory) => {
		updateQuizCategoryMutation.mutate(
			{
				id: id ?? "",
				image: selectedImage,
				...updatedQuizCategory,
			},
			{
				onSuccess: () => navigate("/quiz"),
			},
		);
	};

	useEffect(() => {
		if (quizCategory) {
			reset({
				title: quizCategory.title,
				description: quizCategory.description,
			});
		}
	}, [quizCategory, reset]);

	const hasValues = Object.values(getValues()).some((value) => value !== undefined && value !== "");

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
					onSubmit={handleSubmit(handleSubmitUpdateQuizQuery)}
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
									onSelect={handleSelectQuizCategoryImage}
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
						<Button disabled={isSubmitting || !isValid || !hasValues} variant="contained" type="submit">
							List your job
						</Button>
					</Stack>
				</Box>
			</Container>
		</>
	);
};

export default UpdateQuizCategoryForm;
