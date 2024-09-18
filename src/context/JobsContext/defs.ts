import { Job } from "@services/api/types";
import { Dispatch } from "react";

export type LoadingState = "idle" | "pending" | "succeess" | "failed";

export interface JobsState {
	jobs: Job[];
	job: Job | null;
	isLoading: LoadingState;
	isDeleting: LoadingState;
	fetchingError: string | null;
	deletingError: string | null;
}

export type JobsAction =
	| { type: "IS_LOADING" }
	| { type: "IS_DELETING" }
	| { type: "SET_JOB"; payload: Job }
	| { type: "SET_JOBS"; payload: Job[] }
	| { type: "ADDED_JOB_SUCCESS"; payload: Job }
	| { type: "UPDATED_JOB_SUCCESS"; payload: Job }
	| { type: "DELETE_JOB_SUCCESS"; payload: string }
	| { type: "FETCHING_ERROR"; payload: string }
	| { type: "DELETING_ERROR"; payload: string };

export type JobsInit = JobsState & {
	dispatch: Dispatch<JobsAction>;
};
