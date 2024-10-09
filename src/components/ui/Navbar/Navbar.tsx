import { Container, Typography } from "@mui/material";
import * as S from "../common.styled";
import RouterLink from "../RouterLink";

const Navbar = () => {
	return (
		<S.AppBar>
			<Container maxWidth="lg">
				<S.Toolbar>
					<S.FlexBetween width="100%">
						<S.FlexBetween gap="0.75rem">
							<Typography
								color="primary.main"
								variant="h6"
								component="div"
								fontWeight="bold"
								sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
							>
								MUI v5 with RHF and
							</Typography>
							<Typography color="primary.main" fontWeight="bold" variant="h6">
								RQ
							</Typography>
						</S.FlexBetween>
						<S.FlexBetween gap="2rem">
							<RouterLink to="/" text="Home" />
							<RouterLink to="/jobs" text="Jobs" />
							<RouterLink to="/employees" text="Employees" />
							<RouterLink to="/food-order" text="Order your meal" />
							<RouterLink to="/restaurant" text="Restaurant" />
							<RouterLink to="/workers" text="Workers" />
							<RouterLink to="/budgets" text="Budgets" />
						</S.FlexBetween>
					</S.FlexBetween>
				</S.Toolbar>
			</Container>
		</S.AppBar>
	);
};

export default Navbar;
