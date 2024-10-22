import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { QuestionTimerProps } from "./defs";
import { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeout }: QuestionTimerProps) => {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		const timer = setTimeout(onTimeout, timeout);
		return () => {
			clearInterval(timer);
		};
	}, [onTimeout, timeout]);

	useEffect(() => {
		// Update every 10 miliseconds - function will execute
		const timer = setInterval(() => {
			setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Box sx={{ width: "100%" }}>
			<Box id="question-time" component="progress" value={remainingTime} max={timeout} />;
		</Box>
	);
};

export default QuestionTimer;
