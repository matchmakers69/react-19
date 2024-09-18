import { createContext, PropsWithChildren, useMemo, useReducer } from "react";
import { JobsInit, JobsState } from "./defs";
import { reducer } from "./reducer";

export const JobsContext = createContext<JobsInit | null>(null);

const initialState: JobsState = {
	jobs: [],
	job: null,
	isLoading: "idle",
	isDeleting: "idle",
	fetchingError: null,
	deletingError: null,
};

const JobsContextProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = useMemo(
		() => ({
			...state,
			dispatch,
		}),
		[state],
	);

	return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

export default JobsContextProvider;
