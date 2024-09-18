import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import { addJobSchema, AddJobValues } from "./addJobSchema";

import Box from "@mui/material/Box";
import { Button, Container, FormHelperText, Grid } from "@mui/material";
import { usePostJob } from "../../hooks/usePostJob";
import { useNavigate } from "react-router-dom";
import { MuiTextField } from "@components/ui/formParts/MuiTextField";
import FormError from "@components/ui/formParts/FormError";
import MuiSelectField from "@components/ui/formParts/MuiSelectField";
import FormSuccess from "@components/ui/formParts/FormSuccess";
import { useJobsContext } from "@context/JobsContext/hooks/useJobsContext";

const jobTypeOptions = ["Full-Time", "Part-Time", "Remote", "Internship"];
const salaryRangeOptions = ["£30K - £50K", "£50K - £70K", "£80K - £100K", "£100K - more"];

const AddJobForm = () => {
	const navigate = useNavigate();
	const { dispatch } = useJobsContext();
	const [isPending, startTransition] = useTransition();
	const [success, setSuccess] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");
	const { postJob } = usePostJob();

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm<AddJobValues>({
		mode: "onSubmit",
		resolver: zodResolver(addJobSchema),
		defaultValues: {
			title: "",
			description: "",
			location: "",
			jobType: undefined,
			salary: undefined,
		},
	});

	const handleAddJobSubmit: SubmitHandler<AddJobValues> = (data) => {
		const { jobType, ...restData } = data; // Exclude jobType from data
		const newJob = {
			...restData,
			id: uuidv4(),
			type: jobType,
			company: {
				name: "Veneer Solutions",
				description:
					"Veneer Solutions is a creative agency specializing in digital design and development. Our team is dedicated to pushing the boundaries of creativity and innovation to deliver exceptional results for our clients.",
				contactEmail: "contact@loremipsum.com",
				contactPhone: "555-555-5555",
			},
		};
		startTransition(() => {
			postJob(newJob)
				.then((data) => {
					if (data.success) {
						setSuccess(data?.success);
						dispatch({ type: "ADDED_JOB_SUCCESS", payload: newJob });
						toast.success("Job added successfully");
					}
				})
				.catch((err) => {
					if (err instanceof Error) {
						setError(err.message);
						toast.error("something went wrong!");
					} else {
						setError("An unknown error occurred");
					}
				});
		});
	};

	return (
		<Container maxWidth="md">
			<Box
				width="100%"
				autoComplete="off"
				noValidate
				onSubmit={handleSubmit(handleAddJobSubmit)}
				component="form"
			>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Controller
							name="jobType"
							control={control}
							render={({ field }) => (
								<MuiSelectField
									id="job-type"
									inputLabelId="job-type"
									onChange={field.onChange}
									value={field.value}
									name="jobType"
									error={errors.jobType}
									displayEmpty
									emptyLabel="Select job type"
									options={jobTypeOptions}
								/>
							)}
						/>
						{errors.jobType && <FormHelperText>{errors.jobType.message}</FormHelperText>}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							name="salary"
							control={control}
							render={({ field }) => (
								<MuiSelectField
									id="salary"
									inputLabelId="salary"
									onChange={field.onChange}
									value={field.value}
									name="jobType"
									error={errors.salary}
									displayEmpty
									emptyLabel="Select salary range"
									options={salaryRangeOptions}
								/>
							)}
						/>
						{errors.salary && <FormHelperText>{errors.salary.message}</FormHelperText>}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							name="title"
							control={control}
							render={({ field }) => (
								<MuiTextField
									name="title"
									id="title-value"
									placeholder="Enter title"
									fullWidth
									hiddenLabel
									data-testid="titleValue"
									aria-label="Enter title"
									onChange={field.onChange}
									value={field.value}
									error={!!errors["title"]}
								/>
							)}
						/>
						{errors.title && <FormHelperText>{errors.title.message}</FormHelperText>}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							name="location"
							control={control}
							render={({ field }) => (
								<MuiTextField
									name="location"
									id="location-value"
									placeholder="Enter location"
									fullWidth
									hiddenLabel
									data-testid="locationValue"
									aria-label="Enter location"
									onChange={field.onChange}
									value={field.value}
									error={!!errors["location"]}
								/>
							)}
						/>
						{errors.location && <FormHelperText>{errors.location.message}</FormHelperText>}
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<MuiTextField
									id="description-value"
									placeholder="Enter description"
									name="description"
									fullWidth
									hiddenLabel
									data-testid="descriptionValue"
									aria-label="Enter description"
									onChange={field.onChange}
									multiline
									rows={4}
									value={field.value}
									error={!!errors["description"]}
								/>
							)}
						/>
						{errors.description && <FormHelperText>{errors.description.message}</FormHelperText>}
					</Grid>
					<Grid item xs={12}>
						<FormError message={error} />
						<FormSuccess message={success} />
					</Grid>
					<Grid alignItems="center" display="flex" item xs={12}>
						<Button
							disabled={isSubmitting || isPending || !isValid || !isDirty}
							variant="contained"
							type="submit"
						>
							List your job
						</Button>
						{success && (
							<Box marginLeft={4}>
								<Button onClick={() => navigate("/jobs")} type="button" variant="outlined">
									Go to jobs page
								</Button>
							</Box>
						)}
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default AddJobForm;
