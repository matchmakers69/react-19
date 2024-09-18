import { useParams } from "react-router-dom";
import { useFetchJob } from "../../hooks/useFetchJob";
import { useEffect } from "react";
import { useJobsContext } from "@context/JobsContext/hooks/useJobsContext";

const JobPage = () => {
	const { id } = useParams<{ id: string }>();
	const { isLoading } = useJobsContext();
	const { fetchJob } = useFetchJob("/jobs");

	useEffect(() => {
		if (id) {
			fetchJob(id);
		}
	}, [fetchJob, id]);

	if (isLoading === "pending") {
		return <div>Loading...</div>;
	}
	return <div>JobPage</div>;
};

export default JobPage;
