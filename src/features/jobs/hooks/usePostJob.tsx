import { ApiClient } from "@services/api/apiClient";
import { Job } from "@services/api/types";

export const usePostJob = () => {
	const postJob = async (job: Job) => {
		try {
			await ApiClient("/jobs").postJob(job);
			return { success: "Congrats! You added new job successfully!" };
		} catch (error: unknown) {
			console.error("Error creating health screening test:", error);
			return { error: "Something went wrong!" };
		}
	};

	return { postJob };
};
