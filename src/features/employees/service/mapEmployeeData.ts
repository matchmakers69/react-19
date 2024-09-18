import { EmployeeCreate, EmployeeEdit } from "@services/api/types";
import { EmployeesSchema } from "../components/EmployeesForm/schema";

const mapCommonProperties = (data: EmployeesSchema) => {
	return {
		email: data.email,
		formerEmploymentPeriod: [
			data.formerEmploymentPeriod[0].toString(),
			data.formerEmploymentPeriod[1].toString(),
		] as const,
		name: data.name,
		gender: data.gender,
		languagesSpoken: data.languagesSpoken,
		registrationDateAndTime: data.registrationDateAndTime.toString(),
		salaryRange: [data.salaryRange[0], data.salaryRange[1]],
		skills: data.skills,
		states: data.states,
		isTeacher: data.isTeacher,
		students: data.isTeacher === true ? data.students : [],
	};
};

export const mapEmployeeCreate = (data: EmployeesSchema): EmployeeCreate => {
	return {
		...mapCommonProperties(data),
		variant: "create" as const,
	};
};
export const mapEmployeeEdit = (data: EmployeesSchema): EmployeeEdit => {
	if (data.variant !== "edit") {
		throw new Error("not supported");
	}
	return {
		...mapCommonProperties(data),
		id: data.id,
		variant: "edit" as const,
	};
};
// export const mapEmployeeData = (data: EmployeesSchema): EmployeeCreate | EmployeeEdit => {
// 	const common: Employee = {
// 		email: data.email,
// 		formerEmploymentPeriod: [
// 			data.formerEmploymentPeriod[0].toString(),
// 			data.formerEmploymentPeriod[1].toString(),
// 		],
// 		name: data.name,
// 		gender: data.gender,
// 		languagesSpoken: data.languagesSpoken,
// 		registrationDateAndTime: data.registrationDateAndTime.toString(),
// 		salaryRange: [data.salaryRange[0], data.salaryRange[1]],
// 		skills: data.skills,
// 		states: data.states,
// 		isTeacher: data.isTeacher,
// 		students: data.isTeacher === true ? data.students : [],
// 	};

// 	if (data.variant === "create") {
// 		return { ...common, variant: data.variant };
// 	} else if (data.variant === "edit") {
// 		return { ...common, id: data.id, variant: data.variant };
// 	}
// 	throw new Error("no variant");
// };
