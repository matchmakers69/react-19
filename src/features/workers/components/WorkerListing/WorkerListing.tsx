import { useCallback } from "react";
import { WorkerListingProps } from "./defs";
import { Worker } from "@services/api/types";
import { Button, List } from "@mui/material";
import WorkerRow from "../WorkerRow";

const WorkerListing = ({ workers }: WorkerListingProps) => {
	const handleWorkerDismiss = useCallback((worker: Worker) => {
		console.log("dismiss worker", worker);
	}, []);

	const handleEmployeeRaise = useCallback((worker: Worker) => {
		console.log("give raise to worker", worker);
	}, []);

	return (
		<>
			<List sx={{ width: "100%", maxWidth: "600px" }}>
				{workers.map((worker) => (
					<WorkerRow key={worker.id} worker={worker}>
						<Button onClick={() => handleWorkerDismiss(worker)} type="button" variant="beautiful">
							🚪 dismiss
						</Button>

						<Button onClick={() => handleEmployeeRaise(worker)} type="button" variant="beautiful">
							💰 give raise
						</Button>
					</WorkerRow>
				))}
			</List>
		</>
	);
};

export default WorkerListing;
