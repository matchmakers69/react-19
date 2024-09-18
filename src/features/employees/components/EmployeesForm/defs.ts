import { Gender, Language, Skill, State } from "@services/api/types";

type FormOptions = {
	states?: State[];
	languages?: Language[];
	genders?: Gender[];
	skills?: Skill[];
	statesLoading: boolean;
	languagesLoading: boolean;
	gendersLoading: boolean;
	skillsLoading: boolean;
};

export type EmployeesFormProps = {
	option: FormOptions;
};
