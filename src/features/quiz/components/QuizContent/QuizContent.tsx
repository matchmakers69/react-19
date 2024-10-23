import { Box, Card, CardContent, List, ListItemText, Typography } from "@mui/material";
import * as S from "./QuizContent.styled";
import { QuizContentProps } from "./defs";
import { useCallback, useState, useMemo } from "react";
import QuestionTimer from "../QuestionTimer";
import QuizSummary from "../QuizSummary";

const QuizContent = ({ quizzes }: QuizContentProps) => {
	const [userAnswers, setUserAnswers] = useState<string[]>([]);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [isSkipped, setIsSkipped] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const activeQuestionIndex = userAnswers.length;

	const quizComplete = activeQuestionIndex === quizzes.length;

	const { shuffledAnswers, correctAnswer } = useMemo(() => {
		if (quizComplete) return { shuffledAnswers: [], correctAnswer: "" };
		const currentQuestion = quizzes[activeQuestionIndex];
		const correct = currentQuestion.answers[0].answerText; // Store the correct answer text
		const shuffled = [...currentQuestion.answers].sort(() => Math.random() - 0.5);
		return { shuffledAnswers: shuffled, correctAnswer: correct };
	}, [quizzes, activeQuestionIndex, quizComplete]);

	const handleSelectedAnswer = useCallback(
		(pickedAnswer: string) => {
			setSelectedAnswer(pickedAnswer);
			if (pickedAnswer === "") {
				setIsSkipped(true);
				setIsCorrect(null);
			} else {
				const isAnswerCorrect = pickedAnswer === correctAnswer;
				setIsCorrect(isAnswerCorrect);
				setIsSkipped(false);
			}

			// Delay moving to the next question to show feedback
			setTimeout(() => {
				setUserAnswers((prevUserAnswers) => [...prevUserAnswers, pickedAnswer]); // we populate aswers array
				setIsCorrect(null);
				setIsSkipped(false);
				setSelectedAnswer(null);
			}, 800);
		},
		[correctAnswer],
	);

	const handleSkipAnswer = useCallback(() => {
		handleSelectedAnswer("");
	}, [handleSelectedAnswer]);

	if (quizComplete) {
		return <QuizSummary questions={quizzes} userAnswers={userAnswers} />;
	}

	return (
		<Box sx={{ minWidth: 275, marginBottom: "40px" }}>
			<Card sx={{ maxWidth: 800, margin: "0 auto" }}>
				<CardContent>
					<QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
					<Typography variant="h5">{quizzes[activeQuestionIndex].questionText}</Typography>
					<List>
						{shuffledAnswers.map((answer) => {
							let colorStatus = "default";
							if (selectedAnswer === answer.answerText) {
								if (isCorrect === true) colorStatus = "correct";
								else if (isCorrect === false) colorStatus = "incorrect";
							}
							if (isSkipped) colorStatus = "skipped";
							return (
								<S.StyledListItem disablePadding key={answer.answerText}>
									<S.StyledListItemButton
										colorStatus={colorStatus}
										onClick={() => handleSelectedAnswer(answer.answerText)}
										disabled={isCorrect !== null || isSkipped}
									>
										<ListItemText primary={answer.answerText} />
									</S.StyledListItemButton>
								</S.StyledListItem>
							);
						})}
					</List>
				</CardContent>
			</Card>
		</Box>
	);
};

export default QuizContent;
