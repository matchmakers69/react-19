import PageTitle from "@components/ui/PageTitle";
import Spinner from "@components/ui/Spinner";
import ButtonLike from "@features/quiz/components/ButtonLike";
import QuizCategoryContent from "@features/quiz/components/QuizCategoryContent";
import { useQuizSingleCategoryQuery } from "@features/quiz/queries/fetchSingleQuizCategoryQuery";
import { useUpdateQuizCategoryMutation } from "@features/quiz/queries/updateQuizCategoryMutation";
import { Typography } from "@mui/material";

import { useParams } from "react-router-dom";

const QuizCategoryPage = () => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <Typography variant="h6">Invalid category ID</Typography>;
	}

	const { isError, isPending, isLoading, error, data: quizCategoryDetails } = useQuizSingleCategoryQuery(id);
	const { mutate } = useUpdateQuizCategoryMutation();

	const handleAddLikes = () => {
		if (quizCategoryDetails && !quizCategoryDetails?.hasLikes) {
			mutate({
				id,
				title: quizCategoryDetails.title,
				description: quizCategoryDetails.description,
				likes: { ...quizCategoryDetails.likes, [id]: (quizCategoryDetails.likes?.[id] || 0) + 1 },
				hasLikes: true,
			});
		}
	};

	if (isPending || isLoading) {
		return <Spinner color="warning" />;
	}

	if (isError) {
		return <Typography variant="h6">{error.message || "Something went wrong!"}</Typography>;
	}

	return (
		<>
			<PageTitle title={`Category - ${quizCategoryDetails.title}`} />
			{quizCategoryDetails && (
				<QuizCategoryContent quizCategoryDetails={quizCategoryDetails}>
					<ButtonLike id={id} quizCategoryDetails={quizCategoryDetails} onAdd={handleAddLikes} />
				</QuizCategoryContent>
			)}
		</>
	);
};

export default QuizCategoryPage;
