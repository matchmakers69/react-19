import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/ui/Navbar";
import * as S from "../common.styled";
import Hero from "../../components/ui/Hero";
import Container from "@mui/material/Container";
import StickyFooter from "../../components/ui/StickyFooter";

function MainLayout() {
	return (
		<S.RootWrapper>
			<Navbar />
			<S.MainWrapper component="main">
				<Hero />
				<Container>
					<Outlet />
				</Container>
			</S.MainWrapper>
			<StickyFooter />
			<ToastContainer />
		</S.RootWrapper>
	);
}

export default MainLayout;
