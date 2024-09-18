import { LoadingState } from "@/context/JobsContext/defs";
import { Job } from "@/services/api/types";

export interface JobCardProps {
	job: Job;
	onDelete: (id: string) => void;
	isDeleting: LoadingState;
}
