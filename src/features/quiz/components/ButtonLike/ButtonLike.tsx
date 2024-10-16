import Button from "@mui/material/Button";
import { ButtonLikeProps } from "./defs";
import { Box } from "@mui/material";

const ButtonLike = ({ quizCategoryDetails, onAdd, id }: ButtonLikeProps) => {
	return (
		<Button
			disabled={quizCategoryDetails.hasLikes ?? false}
			onClick={onAdd}
			sx={{
				display: "flex",
				gap: 1,
				alignItems: "center",
			}}
			variant="contained"
			type="button"
		>
			<Box component="span">{quizCategoryDetails.likes?.[id] ?? 0}</Box>
			{quizCategoryDetails.hasLikes ? "Liked" : "Like"}
		</Button>
	);
};

export default ButtonLike;
