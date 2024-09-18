import {
	Card,
	CardContent,
	Box,
	Typography,
	Divider,
	CardActions,
	Button,
	CardHeader,
	IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { JobCardProps } from "./defs";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const JobCard = ({ job, onDelete, isDeleting }: JobCardProps) => {
	if (isDeleting === "pending") return <div>Card is deleting...</div>;
	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				flexGrow: 1,
				p: 2,
			}}
		>
			<CardHeader
				action={
					<>
						<IconButton aria-label="edit job details">
							<VisibilityIcon />
						</IconButton>
						<IconButton onClick={() => onDelete(job.id)} aria-label="delete icon">
							<DeleteIcon />
						</IconButton>
					</>
				}
				title={job.title}
			/>
			<CardContent>
				<Box
					sx={{
						mb: 1,
						display: "flex",
						alignItems: "center",
					}}
				></Box>
				<Divider
					sx={{
						my: 2,
						opacity: 0.2,
						borderColor: "grey.500",
					}}
				/>
				<Box
					sx={{
						py: 1,
						display: "flex",
						gap: 1.5,
						alignItems: "center",
					}}
				>
					<Typography component="p" variant="subtitle2">
						{job.description}
					</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<Button fullWidth variant="outlined" component={Link} to={job.id}>
					Read more
				</Button>
			</CardActions>
		</Card>
	);
};

export default JobCard;
