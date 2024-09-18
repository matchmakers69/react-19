import { useJobsContext } from "@context/JobsContext/hooks/useJobsContext";
import { ApiClient } from "@services/api/apiClient";
import { useEffect } from "react";

export const useFetchJobs = () => {
	const { dispatch, jobs } = useJobsContext();

	useEffect(() => {
		const abortController = new AbortController();

		const fetchJobs = async () => {
			dispatch({ type: "IS_LOADING" });

			try {
				const payload = await ApiClient("/jobs").getJobs(abortController.signal);

				dispatch({ type: "SET_JOBS", payload });
			} catch (error: any) {
				if (error.name === "AbortError") {
					console.log("aborted");
					return;
				}

				if (error instanceof Error) {
					dispatch({ type: "FETCHING_ERROR", payload: error.message });
				} else {
					dispatch({
						type: "FETCHING_ERROR",
						payload: "Ups something went wrong",
					});
				}
			}
		};

		fetchJobs();

		return () => {
			abortController.abort();
		};
	}, [dispatch]);

	return { jobs };
};
