import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const NotFoundPage = () => {
	return (
		<section className="text-center flex flex-col justify-center items-center h-96">
			<Typography
				variant="h1"
				sx={{
					fontSize: "clamp(3.5rem, 10vw, 4rem)",
				}}
			>
				404 Not Found
			</Typography>
			<Typography color="text.secondary">This page does not exist</Typography>
			<Link to="/" className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4">
				Go Back
			</Link>
		</section>
	);
};
export default NotFoundPage;
