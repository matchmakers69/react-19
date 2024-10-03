import PageTitle from "@components/ui/PageTitle";
import WorkerListing from "@features/workers/components/WorkerListing";
import { useWorkers } from "@features/workers/hooks/useFetchWorkers";

const WorkersPage = () => {
	const { data: workers } = useWorkers();

	return (
		<>
			<PageTitle title="Workers" />
			{workers && <WorkerListing workers={workers} />}
		</>
	);
};

export default WorkersPage;
