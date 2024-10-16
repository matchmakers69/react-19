import PageTitle from "@components/ui/PageTitle";
import Spinner from "@components/ui/Spinner";
import CategoriesListing from "@features/quiz/components/CategoriesListing";
import AddQuizCategoryForm from "@features/quiz/components/forms/AddQuizCategoryForm";
import { useDeleteQuizCategoryMutation } from "@features/quiz/queries/deleteQuizCategoryMutation";
import { useQuizCategoriesQuery } from "@features/quiz/queries/fetchCategoriesQuery";
import { Alert, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const QuizCategoriesPage = () => {
	const [isFormInview, setIsFormInView] = useState(false);
	const { data: quizCategories, isError, isLoading, error, isPending } = useQuizCategoriesQuery();
	const { mutate, isPending: isPendingDelete } = useDeleteQuizCategoryMutation();
	const queryClient = useQueryClient();

	const handleToggleOpenAddQuizCategoryForm = () => {
		setIsFormInView(!isFormInview);
	};

	const handleCloseAddQuizCategoryForm = () => {
		setIsFormInView(false);
	};

	const handleDeleteQuizCategory = (id: string) => {
		mutate(id, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["quizCategories"] });
			},
		});
	};

	if (isPending || isLoading) {
		return <Spinner color="warning" />;
	}

	if (isError) {
		return <Typography variant="h6">{error.message || "Something went wrong!"}</Typography>;
	}

	return (
		<>
			<PageTitle title="Quiz categories" />
			<Button variant="outlined" onClick={handleToggleOpenAddQuizCategoryForm} type="button">
				{isFormInview ? "Close form" : "Open form"}
			</Button>
			{isFormInview && <AddQuizCategoryForm onClose={handleCloseAddQuizCategoryForm} />}

			{quizCategories && quizCategories.length ? (
				<CategoriesListing
					categories={quizCategories}
					onDelete={handleDeleteQuizCategory}
					pending={isPendingDelete}
				/>
			) : (
				<Alert severity="warning">Sorry there are no quiz categories</Alert>
			)}
		</>
	);
};

export default QuizCategoriesPage;
