import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/ui/Navbar";
import * as S from "../common.styled";
import Container from "@mui/material/Container";
import StickyFooter from "../../components/ui/StickyFooter";

function PagesLayout() {
	return (
		<S.RootWrapper>
			<Navbar />
			<S.MainWrapper component="main">
				<Container
					sx={{
						pt: { xs: 8, sm: 16 },
						pb: { xs: 2, sm: 4 },
					}}
				>
					<Outlet />
				</Container>
			</S.MainWrapper>
			<StickyFooter />
			<ToastContainer />
		</S.RootWrapper>
	);
}

export default PagesLayout;
