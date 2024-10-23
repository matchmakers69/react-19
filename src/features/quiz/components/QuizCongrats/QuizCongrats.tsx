import { Box, Typography } from "@mui/material";

const QuizCongrats = () => {
	return (
		<>
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
			<Typography variant="h4">Congrant! No more questions!</Typography>
		</>
	);
};

export default QuizCongrats;
