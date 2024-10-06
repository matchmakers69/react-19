type Cost = Record<"yearly" | "monthly", number>;

export type BenefitsTableProps = {
	salaries?: Cost;
	benefits?: Cost;
};
