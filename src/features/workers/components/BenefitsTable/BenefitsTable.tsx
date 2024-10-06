import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BenefitsTableProps } from "./defs";
import CurrencyFormat from "react-currency-format";

const BenefitsTable = ({ salaries, benefits }: BenefitsTableProps) => {
	return (
		<TableContainer>
			<Table sx={{ minWidth: 300 }} aria-label="benefits table">
				<TableHead>
					<TableRow>
						<TableCell>
							<strong>Costs</strong>
						</TableCell>
						<TableCell align="left">
							<strong>Monthly</strong>
						</TableCell>
						<TableCell align="left">
							<strong>Yearly</strong>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell component="th" scope="row">
							Salaries
						</TableCell>
						{salaries ? (
							<>
								<TableCell>
									<CurrencyFormat
										value={salaries.monthly}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"£"}
									/>
								</TableCell>
								<TableCell>
									<CurrencyFormat
										value={salaries.yearly}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"£"}
									/>
								</TableCell>
							</>
						) : (
							<TableCell colSpan={2}>Loadiding...</TableCell>
						)}
					</TableRow>

					<TableRow>
						<TableCell component="th" scope="row">
							Benefits
						</TableCell>
						{benefits ? (
							<>
								<TableCell>
									<CurrencyFormat
										value={benefits.monthly}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"£"}
									/>
								</TableCell>
								<TableCell>
									<CurrencyFormat
										value={benefits.yearly}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"£"}
									/>
								</TableCell>
							</>
						) : (
							<TableCell colSpan={2}>Loadiding...</TableCell>
						)}
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default BenefitsTable;
