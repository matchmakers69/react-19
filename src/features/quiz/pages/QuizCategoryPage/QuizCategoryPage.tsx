import PageTitle from "@components/ui/PageTitle";
import { useQuizSingleCategoryQuery } from "@features/quiz/queries/fetchSingleQuizCategoryQuery";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

type Likes = {
	[likeID: string]: number;
};

const QuizCategoryPage = () => {
	const [likes, setLikes] = useState<Likes>({});
	const [hasLikes, setHasLikes] = useState<boolean>(false);

	const { id } = useParams<{ id: string }>();
	if (!id) {
		return <Typography variant="h6">Invalid category ID</Typography>;
	}

	const handleAddLikes = () => {
		if (!hasLikes) {
			setLikes((prevLikes) => ({
				...prevLikes,
				[id]: (prevLikes[id] || 0) + 1,
			}));
		}

		setHasLikes(true);
	};
	const { isError, isPending, isLoading, error, data: quizCategoryDetails } = useQuizSingleCategoryQuery(id);

	if (isPending || isLoading) {
		return <Typography variant="h6">Quiz category is loading...</Typography>;
	}

	if (isError) {
		return <Typography variant="h6">{error.message || "Something went wrong!"}</Typography>;
	}

	console.log(likes, "likes");
	return (
		<>
			<PageTitle title={`Category - ${quizCategoryDetails.title}`} />
			<Button
				disabled={hasLikes}
				onClick={handleAddLikes}
				sx={{
					display: "flex",
					gap: 1,
					alignItems: "center",
				}}
				variant="contained"
				type="button"
			>
				<Box component="span">{likes[id] || 0}</Box>
				Like
			</Button>
		</>
	);
};

export default QuizCategoryPage;
