import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import JobsPage from "../features/jobs/pages/JobsPage";
import AddJobPage from "../features/jobs/pages/AddJobPage";
import JobPage from "../features/jobs/pages/JobPage";
import EmployeesPage from "../features/employees/pages/EmployeesPage";
import PagesLayout from "../layouts/PagesLayout";
import JobsContextProvider from "../context/JobsContext/JobsContext";
import FoodOrderProvider from "../context/FoodOrderContext/FoodOrderContext";
import MealOrderPage from "@features/mealOrderStepper/pages/MealOrderPage";
import WorkersPage from "@features/workers/pages/WorkersPage";
import BudgetPage from "@features/workers/pages/BudgetPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route element={<MainLayout />}>
				<Route index element={<HomePage />} />
			</Route>

			<Route element={<PagesLayout />}>
				<Route path="/employees" element={<EmployeesPage />} />
				<Route
					path="/food-order"
					element={
						<FoodOrderProvider>
							<MealOrderPage />
						</FoodOrderProvider>
					}
				/>
				<Route
					path="/jobs"
					element={
						<JobsContextProvider>
							<JobsPage />
						</JobsContextProvider>
					}
				/>
				<Route
					path="/jobs/add"
					element={
						<JobsContextProvider>
							<AddJobPage />
						</JobsContextProvider>
					}
				/>
				<Route
					path="/jobs/:id"
					element={
						<JobsContextProvider>
							<JobPage />
						</JobsContextProvider>
					}
				/>
				<Route path="/workers" element={<WorkersPage />} />
				<Route path="/budgets" element={<BudgetPage />} />

				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Route>,
	),
);
