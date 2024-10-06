import { Nationality } from "types/defs";

export type NationalitySelectContainerProps = {
	value: string;
	onChange: (nationality: Nationality) => void;
};
