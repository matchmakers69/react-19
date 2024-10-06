import { MuiTextField } from "@components/ui/formParts/MuiTextField";
import PageTitle from "@components/ui/PageTitle";
import NationalitySelectContainer from "@features/workers/components/NationalitySelectContainer";
import WorkerListing from "@features/workers/components/WorkerListing";
import { workersQuery } from "@features/workers/hooks/useWorkersQuery";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Nationality } from "types/defs";

const WorkersPage = () => {
	const [searchName, setSearchName] = useState("");
	const [searchNationality, setSearchNationality] = useState<Nationality>();
	const [currentPage, setCurrentPage] = useState(1);
	// const { data: worker, isPending, error } = useWorkersQuery();
	// Additionally we can use useQuery hook like
	const {
		data: workers,
		isPending,
		isFetching,
		error,
	} = useQuery(
		workersQuery({
			lastName: searchName,
			nationality: searchNationality,
			page: currentPage,
		}),
	);

	// isPending - no data available with the query, there is no data for this component to display
	// isFetching - the request was sent from client to the server, but response has not arrived yet
	// isLoading  = isPending + isFetching

	// Be aware we dont use client filtering anymore
	// const clientSideFilteredWorkers = useMemo(() => {
	// 	return worker?.data.filter(
	// 		(worker) =>
	// 			worker.lastName.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()) ||
	// 			worker.firstName.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()),
	// 	);
	// }, [worker?.data, searchName]);

	const handleSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearchName(value);
	};

	const handleGoToNextPage = () => {
		if (!workers) return;
		if (currentPage <= workers.length - 1) {
			setCurrentPage((prevState) => prevState + 1);
		}
	};

	const handleGoToPrevPage = () => {
		if (!workers) return;
		if (currentPage > 1) {
			setCurrentPage((prevState) => prevState - 1);
		}
	};

	return (
		<>
			<PageTitle title="Workers" />
			<Stack
				flexDirection="row"
				gap={4}
				sx={{
					marginBottom: "40px",
					maxWidth: "42rem",
				}}
			>
				<MuiTextField
					fullWidth
					placeholder="Search worker by name..."
					name="searchWorkers"
					value={searchName}
					onChange={handleSearchNameChange}
				/>
				<NationalitySelectContainer onChange={setSearchNationality} value={searchNationality ?? ""} />
			</Stack>
			<Stack justifyContent="center" flexDirection="row" alignItems="center" gap={2}>
				<Button onClick={handleGoToPrevPage} type="button" variant="contained">
					Prev
				</Button>
				{currentPage}
				<Button onClick={handleGoToNextPage} type="button" variant="contained">
					Next
				</Button>
			</Stack>
			{isFetching && <Box>loading...</Box>}
			{isPending ? (
				<Box>There is no workers data to display...</Box>
			) : error ? (
				<Box>{error.message || "Something went wrong!"}</Box>
			) : (
				<WorkerListing workers={workers} />
			)}

			{/* {clientSideFilteredWorkers && <WorkerListing workers={clientSideFilteredWorkers} />} */}
		</>
	);
};

export default WorkersPage;
