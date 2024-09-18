import { useEmployees } from "@features/employees/hooks/useEmployees";
import { Box, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography } from "@mui/material";
import { EmployeesListProps } from "./defs";

const EmployeesList = ({ onClick, userId }: EmployeesListProps) => {
	const { isError, isLoading: employeesLoading, data: employees, error } = useEmployees();

	if (employeesLoading) {
		return <Box>Employees data is loading...</Box>;
	}

	if (isError) {
		return <Box>{error.message}</Box>;
	}

	if (!employees?.length || !employees) {
		return <Box>Sorry no employees</Box>;
	}
	return (
		<List
			subheader={
				<ListSubheader>
					<Typography variant="h6">Employees</Typography>
				</ListSubheader>
			}
		>
			{employees?.map((employee) => (
				<ListItem disablePadding key={employee.id}>
					<ListItemButton selected={userId === employee.id} onClick={() => onClick(employee.id)}>
						<ListItemText>{employee.label}</ListItemText>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};

export default EmployeesList;
