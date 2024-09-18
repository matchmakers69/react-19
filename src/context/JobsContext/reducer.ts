import { JobsAction, JobsState } from "./defs";

export const reducer = (state: JobsState, action: JobsAction): JobsState => {
	switch (action.type) {
		case "IS_LOADING":
			return {
				...state,
				isLoading: "pending",
				fetchingError: null,
			};
		case "IS_DELETING":
			return {
				...state,
				isDeleting: "pending",
				deletingError: null,
			};
		case "SET_JOBS":
			return {
				...state,
				jobs: action.payload,
				isLoading: "succeess",
				fetchingError: null,
			};

		case "SET_JOB":
			return {
				...state,
				job: action.payload,
				isLoading: "succeess",
				fetchingError: null,
			};
		case "ADDED_JOB_SUCCESS":
			return {
				...state,
				jobs: [...state.jobs, action.payload],
			};
		case "UPDATED_JOB_SUCCESS":
			return {
				...state,
				jobs: state.jobs.map((job) => (job.id === action.payload.id ? action.payload : job)),
			};
		case "DELETE_JOB_SUCCESS":
			return {
				...state,
				jobs: state.jobs.filter((job) => job.id !== action.payload),
				isDeleting: "succeess",
				deletingError: null,
			};
		case "FETCHING_ERROR":
			return {
				...state,
				isLoading: "failed",
				fetchingError: action.payload,
			};
		case "DELETING_ERROR":
			return {
				...state,
				isLoading: "failed",
				deletingError: action.payload,
			};
		default:
			return state;
	}
};
