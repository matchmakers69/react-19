import PageTitle from "@components/ui/PageTitle";
import Spinner from "@components/ui/Spinner";
import UpdateQuizCategoryForm from "@features/quiz/components/forms/UpdateQuizCategoryForm";
import { useQuizSingleCategoryQuery } from "@features/quiz/queries/fetchSingleQuizCategoryQuery";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const QuizCategoryPageEdit = () => {
	const { id } = useParams<{ id: string }>();
	if (!id) {
		return <Typography variant="h6">Invalid category ID</Typography>;
	}
	const { isError, isPending, isLoading, error, data: quizCategoryDetails } = useQuizSingleCategoryQuery(id);

	if (isPending || isLoading) {
		return <Spinner color="warning" />;
	}

	if (isError) {
		return <Typography variant="h6">{error.message || "Something went wrong!"}</Typography>;
	}

	return (
		<>
			<PageTitle title={`This is a category - ${quizCategoryDetails.title}`} />
			<UpdateQuizCategoryForm quizCategory={quizCategoryDetails} />
		</>
	);
};

export default QuizCategoryPageEdit;
