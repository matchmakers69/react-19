import notification from "@/utils/notification";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useApiWithoutAbortController = <T,>(apiFunction: () => Promise<T>) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await apiFunction();
				setData(res);
			} catch (err) {
				console.error(err);
				const message = (err as AxiosError<{ message: string }>).response?.data?.message;

				notification(`Error while fetching data. ${message ?? ""}`, "error");

				setError(message || "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, loading, error };
};
