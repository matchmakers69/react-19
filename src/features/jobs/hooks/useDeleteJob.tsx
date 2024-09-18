import { useJobsContext } from "@context/JobsContext/hooks/useJobsContext";
import { ApiClient } from "@services/api/apiClient";
import { useCallback } from "react";

export const useDeleteJob = () => {
	const { dispatch } = useJobsContext();

	const deleteJob = useCallback(
		async (jobId: string) => {
			dispatch({ type: "IS_DELETING" });
			try {
				await ApiClient("/jobs").deleteJob(jobId);

				dispatch({ type: "DELETE_JOB_SUCCESS", payload: jobId });
			} catch (error) {
				console.warn("Delete request was aborted or failed:", error);
			}
		},
		[dispatch],
	);

	return {
		deleteJob,
	};
};
