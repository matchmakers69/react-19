import { Box, Stack, Typography } from "@mui/material";

const QuizComplete = () => {
	return (
		<Stack maxWidth="500px" marginX="auto" marginBottom="20px" alignItems="center" justifyContent="center">
			<Box
				sx={{
					maxWidth: "100px",
					width: "100%",
					padding: 0,
				}}
				component="figure"
			>
				<Box
					alt="image-quiz-complete"
					sx={{
						maxWidth: "100%",
						height: "auto",
					}}
					component="img"
					src="/assets/images/quiz-complete.png"
				/>
			</Box>
			<Typography variant="h4">Congratulations!</Typography>
		</Stack>
	);
};

export default QuizComplete;
