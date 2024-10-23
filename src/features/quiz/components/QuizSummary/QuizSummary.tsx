import { Box, List, Stack, Typography } from "@mui/material";
import * as S from "./QuizSummary.styled";
import { QuizSummaryProps } from "./defs";
import QuizCongrats from "../QuizCongrats";

const QuizSummary = ({ userAnswers, questions }: QuizSummaryProps) => {
	const skippedAnswers = userAnswers.filter((skipAnswer) => skipAnswer === "");
	const correctAnswers = userAnswers.filter(
		(correctAnswer, index) => correctAnswer === questions[index].answers[0].answerText,
	);

	const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
	const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
	const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

	return (
		<Stack
			maxWidth="600px"
			width="100%"
			flexWrap="wrap"
			gap={2}
			marginX="auto"
			marginBottom="23px"
			alignItems="center"
			justifyContent="center"
		>
			<QuizCongrats />
			<Stack
				flexWrap="wrap"
				alignItems="center"
				justifyContent="center"
				flexDirection="row"
				gap={5}
				id="summary-stats"
			>
				<Typography
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyItems: "center",
					}}
					variant="body1"
				>
					<Typography variant="h4" component="span">
						{skippedAnswersShare}%
					</Typography>
					<Typography variant="h6" component="span">
						skipped
					</Typography>
				</Typography>

				<Typography
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
					variant="subtitle2"
				>
					<Typography variant="h4" component="span">
						{correctAnswersShare}%
					</Typography>
					<Typography variant="h6" component="span">
						answered correctly
					</Typography>
				</Typography>

				<Typography
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
					variant="body1"
				>
					<Typography variant="h4" component="span">
						{wrongAnswersShare}%
					</Typography>
					<Typography variant="h6" component="span">
						answered incorrectly
					</Typography>
				</Typography>
			</Stack>
			<Box>
				<List sx={{ listStyle: "decimal", pl: 4 }}>
					{userAnswers.map((answer, index) => {
						let answerColor = "default";
						if (!answer) {
							answerColor = "skipped";
						} else if (answer === questions[index].answers[0].answerText) {
							answerColor = "correct";
						} else {
							answerColor = "incorrect";
						}

						return (
							<S.StyledListItem key={index} sx={{ display: "list-item" }}>
								<S.StyledListItemText
									answerColor={answerColor}
									primary={<Typography variant="subtitle1">{questions[index].questionText}</Typography>}
									secondary={<Typography variant="body2">{!answer ? "Skipped" : answer}</Typography>}
								/>
							</S.StyledListItem>
						);
					})}
				</List>
			</Box>
		</Stack>
	);
};

export default QuizSummary;
