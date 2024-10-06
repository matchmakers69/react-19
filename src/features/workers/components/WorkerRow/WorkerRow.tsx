import { Link, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { WorkerRowProps } from "./defs";
import WorkerImage from "../WorkerImage";
import CurrencyFormat from "react-currency-format";

const WorkerRow = ({ worker, children }: WorkerRowProps) => {
	return (
		<>
			<ListItem
				alignItems="flex-start"
				sx={{
					flexWrap: "wrap",
				}}
			>
				<Stack width="100%" gap={2} flexDirection="row">
					<ListItemAvatar>
						<WorkerImage
							imgUrl={`${worker.imgURL}`}
							width={45}
							height={45}
							alt={`${worker.firstName} ${worker.lastName}`}
						/>
					</ListItemAvatar>
					<ListItemText
						primary={
							<>
								<Link component={RouterLink} to="/">
									{worker.firstName} {worker.lastName},<em>position</em>: {worker.title}
								</Link>
							</>
						}
						secondary={
							<>
								<Typography variant="caption">
									<em>salary</em>:{" "}
									<CurrencyFormat
										value={worker.salary}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"£"}
									/>
								</Typography>
							</>
						}
					/>
				</Stack>
				<Stack flexDirection="row">{children}</Stack>
			</ListItem>
		</>
	);
};

export default WorkerRow;
