import { Pagination, PaginationItem, Stack } from "@mui/material";
import { RestaurantStepsPaginationProps } from "./defs";

const RestaurantStepsPagination = ({ handleChange, steps, currentPage }: RestaurantStepsPaginationProps) => {
	return (
		<Stack gap={2} marginBottom={4} flexDirection="row" alignItems="center" justifyContent="center">
			<Pagination
				renderItem={(item) => <PaginationItem {...item} />}
				page={currentPage}
				count={steps}
				onChange={handleChange}
				color="secondary"
				hideNextButton
				hidePrevButton
			/>
		</Stack>
	);
};

export default RestaurantStepsPagination;
