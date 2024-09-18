import { Grid } from "@mui/material";
import JobCard from "../JobCard/JobCard";
import { useDeleteJob } from "../../hooks/useDeleteJob";
import { useFetchJobs } from "../../hooks/useFetchJobs";
import { useJobsContext } from "@context/JobsContext/hooks/useJobsContext";

const JobsContainer = () => {
	const { jobs } = useFetchJobs();
	const { deleteJob } = useDeleteJob();
	const { isDeleting, isLoading } = useJobsContext();

	const handleDeleteJob = async (jobId: string) => {
		await deleteJob(jobId);
	};

	if (isLoading === "pending") return <div>Loading jobs data...</div>;

	return (
		<>
			<Grid container spacing={2}>
				{jobs.map((job) => (
					<Grid item xs={12} sm={6} md={4} key={job.id} sx={{ display: "flex" }}>
						<JobCard job={job} onDelete={handleDeleteJob} isDeleting={isDeleting} />
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default JobsContainer;
