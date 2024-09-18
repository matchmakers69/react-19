import { useJobsContext } from "@context/JobsContext/hooks/useJobsContext";
import { ApiClient } from "@services/api/apiClient";
import { useCallback } from "react";

export const useFetchJob = (url: string) => {
	const { dispatch } = useJobsContext();

	const fetchJob = useCallback(
		async (id: string) => {
			dispatch({ type: "IS_LOADING" });
			const abortController = new AbortController();
			try {
				const job = await ApiClient(url).getJob(id, abortController.signal);
				dispatch({ type: "SET_JOB", payload: job });
			} catch (error: unknown) {
				if (error instanceof Error) {
					dispatch({ type: "FETCHING_ERROR", payload: error.message });
				} else {
					dispatch({ type: "FETCHING_ERROR", payload: "An unknown error occured" });
				}
			}

			return () => {
				abortController.abort();
			};
		},
		[url, dispatch],
	);

	return { fetchJob };
};
