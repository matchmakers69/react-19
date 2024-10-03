import { useCallback } from "react";
import { WorkerListingProps } from "./defs";
import { Worker } from "@services/api/types";

const WorkerListing = ({ workers }: WorkerListingProps) => {
	const handleWorkerDismiss = useCallback((worker: Worker) => {
		console.log("dismiss worker", worker);
	}, []);

	const handleEmployeeRaise = useCallback((worker: Worker) => {
		console.log("give raise to worker", worker);
	}, []);

	return <div>WorkerListing</div>;
};

export default WorkerListing;
