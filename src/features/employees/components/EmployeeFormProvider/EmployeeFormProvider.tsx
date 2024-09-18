import { FormProvider, useForm } from "react-hook-form";
import EmployeesForm from "../EmployeesForm";
import { zodResolver } from "@hookform/resolvers/zod";
import LocationProvider from "@app/LocationProvider";
import { defaultValues, employeesSchema, EmployeesSchema } from "../EmployeesForm/schema";
import { useFetchEmployeesFormOptions } from "@features/employees/hooks/useEmloyeeFormOptionsQueries";

const EmployeeFormProvider = () => {
	const {
		statesQuery: { data: states, isLoading: statesLoading },
		languagesQuery: { data: languages, isLoading: languagesLoading },
		gendersQuery: { data: genders, isLoading: gendersLoading },
		skillsQuery: { data: skills, isLoading: skillsLoading },
	} = useFetchEmployeesFormOptions();

	const methods = useForm<EmployeesSchema>({
		mode: "all",
		resolver: zodResolver(employeesSchema),
		defaultValues,
	});

	const option = {
		states,
		languages,
		genders,
		skills,
		statesLoading,
		languagesLoading,
		gendersLoading,
		skillsLoading,
	};

	return (
		<FormProvider {...methods}>
			<LocationProvider>
				<EmployeesForm option={option} />
			</LocationProvider>
			{/* <DevTool control={methods.control} /> */}
		</FormProvider>
	);
};

export default EmployeeFormProvider;
