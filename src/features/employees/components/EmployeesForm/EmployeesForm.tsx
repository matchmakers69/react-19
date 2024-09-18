import { Button, Container, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MuiAutocomplete from "@components/ui/formParts/MuiAutocomplete";
import { type SubmitHandler, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { defaultValues, EmployeesSchema } from "./schema";
import { Fragment, useEffect } from "react";
import { EmployeesFormProps } from "./defs";
import MUIToggleButtonGroup from "@components/ui/formParts/MUIToggleButtonGroup";
import MUIRadioGroup from "@components/ui/formParts/MUIRadioGroup";
import MUICheckbox from "@components/ui/formParts/MUICheckbox";
import MUIDateTimePicker from "@components/ui/formParts/MUIDateTimePicker";
import MUIDateRangePicker from "@components/ui/formParts/MUIDateRangePicker";
import MUISlider from "@components/ui/formParts/MUISlider";
import MUISwitch from "@components/ui/formParts/MUISwitch";
import RHFTextfield from "@components/ui/formParts/RHFTextfield";
import { useCreateEmployee } from "@features/employees/hooks/useCreateEmployee";
import EmployeesList from "../EmployeesList";
import { useEmployee } from "@features/employees/hooks/useEmployee";
import { useEditEmployee } from "@features/employees/hooks/useEditEmployee";

const EmployeesForm = ({ option }: EmployeesFormProps) => {
	const { control, unregister, reset, handleSubmit, setValue } = useFormContext<EmployeesSchema>();
	const createEmployeeMutation = useCreateEmployee();
	const editEmployeeMutation = useEditEmployee();

	const userId = useWatch({ control, name: "id" });
	const employeeQuery = useEmployee(userId);

	const variant = useWatch({
		control,
		name: "variant",
	});

	// useEffect(() => {
	// 	const sub = watch((value) => {
	// 		console.log(value);
	// 	});

	// 	return () => sub.unsubscribe();
	// }, [watch]);

	const isTeacher = useWatch({ control, name: "isTeacher" });

	const { append, fields, remove, replace } = useFieldArray({
		control,
		// which field we are going to control
		name: "students",
	});

	useEffect(() => {
		if (!isTeacher) {
			replace([]);
			unregister("students");
		}
	}, [isTeacher, replace, unregister]);

	useEffect(() => {
		if (employeeQuery.data) {
			reset(employeeQuery.data as EmployeesSchema); // due to issue Types of property 'isTeacher' are incompatible. Type 'boolean' is not assignable to type 'true'.ts assertion is required
		}
	}, [reset, employeeQuery.data]);

	const handleReset = () => {
		reset(defaultValues);
	};

	const handleEmployeeListButton = (id: string) => {
		setValue("id", id);
	};

	const handleSubmitCreateEmployee: SubmitHandler<EmployeesSchema> = (data) => {
		if (variant === "create") {
			createEmployeeMutation.mutate(data);
		} else {
			editEmployeeMutation.mutate(data);
		}
	};

	return (
		<Container maxWidth="sm">
			<Stack sx={{ flexDirection: "row", gap: 3 }}>
				<EmployeesList userId={userId} onClick={handleEmployeeListButton} />
				<Box
					width="100%"
					autoComplete="off"
					noValidate
					component="form"
					onSubmit={handleSubmit(handleSubmitCreateEmployee)}
				>
					<Stack gap={3}>
						<RHFTextfield<EmployeesSchema>
							label="Enter your name"
							name="name"
							fullWidth
							variant="outlined"
							type="text"
						/>
						<RHFTextfield<EmployeesSchema>
							label="Enter your email"
							name="email"
							fullWidth
							variant="outlined"
							type="email"
						/>
						{option.statesLoading ? (
							<Box>States are loading...</Box>
						) : (
							<MuiAutocomplete<EmployeesSchema> name="states" label="States" options={option?.states ?? []} />
						)}
						{option.languagesLoading ? (
							<Box>Languages are loading...</Box>
						) : (
							<MUIToggleButtonGroup<EmployeesSchema>
								name="languagesSpoken"
								options={option?.languages ?? []}
							/>
						)}
						{option.gendersLoading ? (
							<Box>Genders are loading...</Box>
						) : (
							<MUIRadioGroup<EmployeesSchema> label="Gender" name="gender" options={option.genders ?? []} />
						)}
						{option.skillsLoading ? (
							<Box>Skills are loading...</Box>
						) : (
							<MUICheckbox<EmployeesSchema> label="Skills" name="skills" options={option.skills ?? []} />
						)}
						<MUIDateTimePicker<EmployeesSchema>
							label="Registration day & time"
							name="registrationDateAndTime"
						/>
						<Typography>Former Employment period:</Typography>
						<MUIDateRangePicker<EmployeesSchema> name="formerEmploymentPeriod" />
						<MUISlider<EmployeesSchema> name="salaryRange" label="Salary range" />
						<MUISwitch<EmployeesSchema> name="isTeacher" label="Are you a teacher?" />
						{isTeacher && (
							<Button
								onClick={() =>
									append({
										name: "",
									})
								}
								type="button"
							>
								Add new student
							</Button>
						)}
						{fields.map((field, index) => (
							<Fragment key={field.id}>
								{/* Follow schema students */}
								<RHFTextfield label="Name" name={`students.${index}.name`} />
								<Button type="button" onClick={() => remove(index)} color="error">
									Remove
								</Button>
							</Fragment>
						))}
					</Stack>
					<Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
						<Button variant="contained" type="submit">
							{variant === "create" ? "Create employee" : "Save employee"}
						</Button>
						<Button variant="contained" onClick={handleReset}>
							Reset form
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
};

export default EmployeesForm;
