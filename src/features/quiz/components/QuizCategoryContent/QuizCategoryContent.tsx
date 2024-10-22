import {
	Card,
	CardHeader,
	IconButton,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Stack,
	Button,
	Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { QuizCategoryContentProps } from "./defs";
import { useNavigate } from "react-router-dom";
import { useDeleteQuizCategoryMutation } from "@features/quiz/queries/deleteQuizCategoryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "@components/ui/Modal";

const QuizCategoryContent = ({ quizCategoryDetails, children }: QuizCategoryContentProps) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		mutate,
		isPending: isPendingDeletion,
		isError: isErrorDeleting,
		error: deleteError,
	} = useDeleteQuizCategoryMutation();

	const handleDeleteQuizCategory = (id: string) => {
		mutate(id, {
			onSuccess: () => {
				queryClient.invalidateQueries({ refetchType: "none" }); // refetchType: "none" Will prevent refetch when we leave site
				navigate("/quiz");
			},
		});
	};

	const handleStartDelete = () => {
		setIsDeleting(true);
	};

	const handleStopDelete = () => {
		setIsDeleting(false);
	};

	return (
		<>
			<Card sx={{ maxWidth: 800, margin: "0 auto" }}>
				<Stack
					gap={2}
					marginBottom="20px"
					alignItems="center"
					justifyContent="space-between"
					flexDirection="row"
					paddingRight={2}
				>
					<CardHeader title={quizCategoryDetails.title} subheader="September 14, 2024"></CardHeader>
					{children}
				</Stack>

				<CardMedia
					component="img"
					height="194"
					image={`/assets/images/${quizCategoryDetails?.image}`}
					alt={quizCategoryDetails?.title}
				/>
				<CardContent>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						{quizCategoryDetails.description}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton onClick={() => navigate(`/quiz/${quizCategoryDetails.id}/edit`)} aria-label="edit">
						<EditIcon />
					</IconButton>
					<IconButton onClick={handleStartDelete} aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</CardActions>
			</Card>
			{isDeleting && (
				<Modal onClose={handleStopDelete} open={isDeleting} title="Would you like to delete?">
					<Box
						sx={{
							marginBottom: "30px",
						}}
					>
						<Typography variant="h5">
							Do you really want to delete this quiz category? This action cannot be undone.
						</Typography>
					</Box>
					<Stack gap={2} flexDirection="row" alignItems="center" justifyContent="center">
						{isPendingDeletion && <Typography variant="body2">Deleting, please wait...</Typography>}
						{!isPendingDeletion && (
							<>
								<Button onClick={handleStopDelete} type="button" variant="text">
									Cancel
								</Button>
								<Button
									onClick={() => handleDeleteQuizCategory(quizCategoryDetails.id)}
									type="button"
									variant="danger"
								>
									Delete
								</Button>
							</>
						)}
					</Stack>
					{isErrorDeleting && <Typography variant="body1">{deleteError.message}</Typography>}
				</Modal>
			)}
		</>
	);
};

export default QuizCategoryContent;
