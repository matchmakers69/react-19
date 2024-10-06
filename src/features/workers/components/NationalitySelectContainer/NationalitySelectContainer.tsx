import { useMemo } from "react";
import MuiSelectField from "@components/ui/formParts/MuiSelectField";
import { useGeoQuery } from "@features/workers/hooks/useGeoQuery";
import { Box } from "@mui/material";
import { NationalitySelectContainerProps } from "./defs";
import { Nationality } from "types/defs";

const NationalitySelectContainer = ({ value, onChange }: NationalitySelectContainerProps) => {
	const { data: geo, isLoading, error } = useGeoQuery();

	const nationalityOptions = useMemo(() => {
		if (!geo) return [];
		return Object.keys(geo) as Nationality[];
	}, [geo]);

	if (!geo || isLoading) {
		return <Box>Loading geo...</Box>;
	}

	if (error) {
		return <Box>{error.message ?? "Cannot fetch geo"}</Box>;
	}

	return (
		<>
			<MuiSelectField
				id="geo"
				inputLabelId="geo"
				onChange={onChange}
				value={value}
				name="jobType"
				displayEmpty
				emptyLabel="Select nationality"
				options={nationalityOptions}
			/>
		</>
	);
};

export default NationalitySelectContainer;
