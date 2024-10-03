import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import { WorkerRowProps } from "./defs";

const WorkerRow = ({ worker, children }: WorkerRowProps) => {
	return (
		<>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
				</ListItemAvatar>
				<ListItemText
					primary="Summer BBQ"
					secondary={
						<>
							<Typography component="span" variant="body2" sx={{ color: "text.primary", display: "inline" }}>
								to Scott, Alex, Jennifer
							</Typography>
							{" — Wish I could come, but I'm out of town this…"}
						</>
					}
				/>
				{children}
			</ListItem>
		</>
	);
};

export default WorkerRow;
