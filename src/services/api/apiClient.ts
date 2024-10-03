import { EmployeeSearchParams } from "types/defs";
import { requests } from "../../config/axios";
import {
	BookingInfo,
	EmployeeCreate,
	EmployeeEdit,
	EmployeeGet,
	FoodOrder,
	Gender,
	Job,
	Language,
	Skill,
	State,
	Worker,
} from "./types";
import { applyQueryString } from "@utils/queryString";

export const ApiClient = (url: string) => ({
	getJobs: (signal: AbortController["signal"]): Promise<Job[]> => requests.get(url, { signal }),
	getJob: (id: string, signal: AbortController["signal"]): Promise<Job> =>
		requests.get(`${url}/${id}`, { signal }),
	deleteJob: (id: string): Promise<Job> => requests.delete(`${url}/${id}`),
	postJob: (post: Job): Promise<Job> => requests.post(url, post),

	getStates: (): Promise<State[]> => requests.get(url),
	getLanguages: (): Promise<Language[]> => requests.get(url),
	getGenders: (): Promise<Gender[]> => requests.get(url),
	getSkills: (): Promise<Skill[]> => requests.get(url),
	getEmployees: (): Promise<EmployeeGet[]> => requests.get(url),
	getEmployee: (id: string): Promise<EmployeeGet> => requests.get(`${url}/${id}`),
	updateEmployee: (employee: EmployeeEdit): Promise<EmployeeGet> =>
		requests.put(`${url}/${employee.id}`, employee),
	postEmployee: (employee: EmployeeCreate): Promise<EmployeeGet> => requests.post(url, employee),
	getMealBookingInformation: (): Promise<BookingInfo> => requests.get(url),
	updateMealBookingInformation: (bookingInfo: BookingInfo): Promise<BookingInfo> =>
		requests.put(url, bookingInfo),
	getMealOrder: (): Promise<FoodOrder[]> => requests.get(url),
	saveMealOrder: (mealOrder: FoodOrder): Promise<FoodOrder> =>
		requests.put(`${url}/${mealOrder.id}`, mealOrder),

	getWorkers: (filters: EmployeeSearchParams = {}, page = 1): Promise<Worker[]> => {
		const query = applyQueryString({ ...filters, _page: page });
		const fullUrl = `${url}${query ? `${query}` : ""}`;
		return requests.get(fullUrl);
	},
});
