import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import AppProvider from "@app/AppProvider";
import ReactQueryProvider from "@app/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
	return (
		<AppProvider>
			<ReactQueryProvider>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</ReactQueryProvider>
		</AppProvider>
	);
}

export default App;
