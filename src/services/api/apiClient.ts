import { WorkerSearchParams, Geo } from "types/defs";
import { requests } from "../../config/axios";
import {
	Benefit,
	BookingInfo,
	EmployeeCreate,
	EmployeeEdit,
	EmployeeGet,
	FoodOrder,
	Gender,
	Job,
	Language,
	QuizCategory,
	RestaurantOrder,
	Skill,
	State,
	WorkerData,
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

	getWorkers: (filters: WorkerSearchParams): Promise<WorkerData> => {
		const query = applyQueryString({ ...filters });
		const fullUrl = `${url}${query ? `${query}` : ""}`;
		return requests.get(fullUrl);
	},
	getBenefits: (): Promise<Benefit[]> => requests.get(url),
	getGeo: (): Promise<Geo> => requests.get(url),
	getRestaurantOrder: (): Promise<RestaurantOrder> => requests.get(url),
	getQuizCategories: (): Promise<QuizCategory[]> => requests.get(url),
	getQuizCategoryById: (id: string): Promise<any> => requests.get(`${url}/${id}`),
	createQuizCategory: (quizCategory: QuizCategory): Promise<QuizCategory> => requests.post(url, quizCategory),
	updateQuizCategory: (id: string, updatedQuizCategory: Partial<QuizCategory>): Promise<QuizCategory> =>
		requests.put(`${url}/${id}`, updatedQuizCategory),
	deleteQuizCategory: (id: string): Promise<QuizCategory> => requests.delete(`${url}/${id}`),
});
