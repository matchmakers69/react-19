import PageTitle from "@components/ui/PageTitle";
import EmployeeFormProvider from "@features/employees/components/EmployeeFormProvider";

const EmployeesPage = () => {
	return (
		<>
			<PageTitle title="Employees" />
			<EmployeeFormProvider />
		</>
	);
};

export default EmployeesPage;
