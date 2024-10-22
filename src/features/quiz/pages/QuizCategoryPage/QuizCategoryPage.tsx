import PageTitle from "@components/ui/PageTitle";
import Spinner from "@components/ui/Spinner";
import debounce from "lodash/debounce";
import ButtonLike from "@features/quiz/components/ButtonLike";
import QuizCategoryContent from "@features/quiz/components/QuizCategoryContent";
import QuizContent from "@features/quiz/components/QuizContent";
import { useQuizSingleCategoryQuery } from "@features/quiz/queries/fetchSingleQuizCategoryQuery";
import { useUpdateQuizCategoryMutation } from "@features/quiz/queries/updateQuizCategoryMutation";
import { Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";

const QuizCategoryPage = () => {
	const { id } = useParams<{ id: string }>();
	const [localLikes, setLocalLikes] = useState(0);

	if (!id) {
		return <Typography variant="h6">Invalid category ID</Typography>;
	}

	const { isError, isPending, isLoading, error, data: quizCategoryDetails } = useQuizSingleCategoryQuery(id);
	const { mutate } = useUpdateQuizCategoryMutation();

	const handleAddLikes = useCallback(
		debounce(() => {
			if (quizCategoryDetails) {
				mutate({
					...quizCategoryDetails,
					likes: { ...quizCategoryDetails.likes, [id]: (quizCategoryDetails.likes?.[id] || 0) + 1 },
				});
			}
		}, 500),

		[quizCategoryDetails, mutate, id],
	);

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
				<>
					{quizCategoryDetails.quizzes && <QuizContent quizzes={quizCategoryDetails.quizzes} />}
					<QuizCategoryContent quizCategoryDetails={quizCategoryDetails}>
						<ButtonLike id={id} quizCategoryDetails={quizCategoryDetails} onAdd={handleAddLikes} />
					</QuizCategoryContent>
				</>
			)}
		</>
	);
};

export default QuizCategoryPage;
