import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import AppProvider from "@app/AppProvider";
import ReactQueryProvider from "@app/ReactQueryProvider";

function App() {
	return (
		<AppProvider>
			<ReactQueryProvider>
				<RouterProvider router={router} />
			</ReactQueryProvider>
		</AppProvider>
	);
}

export default App;
