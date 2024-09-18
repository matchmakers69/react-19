// import PageTitle from "@/components/ui/PageTitle";
// import { useJobsContext } from "@/context/JobsContext/hooks/useJobsContext";
// import JobsContextProvider, {
//   JobsContext,
// } from "@/context/JobsContext/JobsContext";
// import { useAsyncOperationOnMount, useAsyncOperation } from "@/hooks/use-api";
// import { ApiClient } from "@/services/api/apiClient";
// import { Job } from "@/services/api/types";
// import { useContext } from "react";

// const JobsPage = () => {
//   // const [state] = useGet<Job[]>((signal) =>
//   //   ApiClient("/jobs").getJobs(signal)
//   // );

//   // const ctx = use(JobsContext);
//   // useAsyncOperationOnMount((signal) =>
//   //   ApiClient("/jobs")
//   //     .getJobs(signal)
//   //     .then((payload) => {
//   //       ctx?.dispatch({ type: "SET_JOBS", payload });
//   //     })
//   //     .catch(() => {
//   //       // ctx?.dispatch({ type: "ERROR", payload });
//   //     })
//   // );

//   // const [addJob] = useAsyncOperation();

//   // const handleClick = () => {
//   //   addJob((signal) =>
//   //     ApiClient("/jobs")
//   //       .postJob(signal)
//   //       .then((payload) => {
//   //         ctx?.dispatch({ type: "ADD_JOB", payload });
//   //       })
//   //       .catch(() => {
//   //         // ctx?.dispatch({ type: "ERROR", payload });
//   //       })
//   //   );
//   // };

//   // if (state.type === `idle` || state.type === `pending`)
//   //   return <div>Loading...</div>;
//   // if (state.type === `fail`)
//   //   return <div>Error: {(state.error as Error).message}</div>;
//   console.log(ctx?.jobs, "pobrane jobs");
//   return (
//     <>
//       {/* {state.data.jobs} */}
//       <PageTitle title="View all jobs" />
//     </>
//   );
// };

// export default JobsPage;
