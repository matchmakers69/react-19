import { Benefit, Worker } from "@services/api/types";

export const saleriesCosts = (workers: Worker[]) => {
	const monthly = workers.reduce((total, worker) => total + worker.salary, 0);
	const yearly = monthly * 12;
	return {
		monthly,
		yearly,
	};
};

export const benefitCosts = (benefits: Benefit[]) => {
	const monthly = benefits.reduce((total, benefit) => total + benefit.monthlyFee, 0);
	const yearly = monthly * 12;
	return {
		monthly,
		yearly,
	};
};
