import {
	Box,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { QuizContentProps } from "./defs";
import { useCallback, useState, useMemo } from "react";
import QuizComplete from "../QuizComplete";
import QuestionTimer from "../QuestionTimer";

const QuizContent = ({ quizzes }: QuizContentProps) => {
	const [userAnswers, setUserAnswers] = useState<string[]>([]);
	const activeQuestionIndex = userAnswers.length;

	const quizComplete = activeQuestionIndex === quizzes.length;

	const handleSelectedAnswer = useCallback((selectedAnswer: string) => {
		setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
	}, []);

	const handleSkipAnswer = useCallback(() => {
		handleSelectedAnswer("");
	}, [handleSelectedAnswer]);

	const shuffledAnswers = useMemo(() => {
		if (quizComplete) return [];
		return [...quizzes[activeQuestionIndex].answers].sort(() => Math.random() - 0.5);
	}, [quizzes, activeQuestionIndex, quizComplete]);

	if (quizComplete) {
		return <QuizComplete />;
	}

	return (
		<Box sx={{ minWidth: 275, marginBottom: "40px" }}>
			<Card sx={{ maxWidth: 800, margin: "0 auto" }}>
				<CardContent>
					<QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
					<Typography variant="h5">{quizzes[activeQuestionIndex].questionText}</Typography>
					<List>
						{shuffledAnswers.map((answer) => (
							<ListItem key={answer.answerText}>
								<ListItemButton onClick={() => handleSelectedAnswer(answer.answerText)}>
									<ListItemText primary={answer.answerText} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</CardContent>
			</Card>
		</Box>
	);
};

export default QuizContent;
