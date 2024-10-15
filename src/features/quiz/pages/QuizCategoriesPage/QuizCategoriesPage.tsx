import PageTitle from "@components/ui/PageTitle";
import CategoriesListing from "@features/quiz/components/CategoriesListing";
import AddQuizCategoryForm from "@features/quiz/components/forms/AddQuizCategoryForm";
import { useDeleteQuizCategoryMutation } from "@features/quiz/queries/deleteQuizCategoryMutation";
import { useQuizCategoriesQuery } from "@features/quiz/queries/fetchCategoriesQuery";
import { Alert, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const QuizCategoriesPage = () => {
	const [isFormInview, setIsFormInView] = useState(false);
	const { data: quizCategories, isError, isLoading, error, isPending } = useQuizCategoriesQuery();
	const deleteQuizCategoryMutation = useDeleteQuizCategoryMutation();

	const handleToggleOpenAddQuizCategoryForm = () => {
		setIsFormInView(!isFormInview);
	};

	const handleCloseAddQuizCategoryForm = () => {
		setIsFormInView(false);
	};

	const handleDeleteQuizCategory = (id: string) => {
		deleteQuizCategoryMutation.mutate(id);
	};

	if (isPending || isLoading) {
		return <Typography variant="h6">Quiz categories are loading...</Typography>;
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
					loading={isLoading}
				/>
			) : (
				<Alert severity="warning">Sorry there are no quiz categories</Alert>
			)}
		</>
	);
};

export default QuizCategoriesPage;
