import PageTitle from "@components/ui/PageTitle";
import BenefitsTable from "@features/workers/components/BenefitsTable";
import { useBenefitsQuery } from "@features/workers/hooks/useBenefitsQuery";
import { workersQuery } from "@features/workers/hooks/useWorkersQuery";
import { benefitCosts, saleriesCosts } from "@features/workers/services/budget";
import { useQuery } from "@tanstack/react-query";

const BudgetPage = () => {
	const { data: workerData } = useQuery(workersQuery({ page: 1 }));
	const { data: benefitsData } = useBenefitsQuery();
	const salaries = workerData && saleriesCosts(workerData);
	const benefits = benefitsData && benefitCosts(benefitsData);
	return (
		<>
			<PageTitle title="Budgets" />
			<BenefitsTable salaries={salaries} benefits={benefits} />
		</>
	);
};

export default BudgetPage;
