import { useContext } from "react";
import { JobsContext } from "../JobsContext";

export const useJobsContext = () => {
	const context = useContext(JobsContext);
	if (!context) {
		throw Error("You overlooked wrapping with FilesUploadContextProvider");
	}
	return context;
};
