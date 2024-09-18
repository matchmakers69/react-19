import { OrderMealStepValues } from "@services/api/types";
import { useState } from "react";

const useSetMealOrderSteps = () => {
	const [accumulatedFormStepsData, setAccumulatedFormStepsData] = useState<Partial<OrderMealStepValues>>({});

	const handleSetMealOrderFormValues = (formValues: Partial<OrderMealStepValues>) => {
		setAccumulatedFormStepsData(formValues);
	};

	return { accumulatedFormStepsData, handleSetMealOrderFormValues };
};

export default useSetMealOrderSteps;
