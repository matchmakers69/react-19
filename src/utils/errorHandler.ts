import { ErrorInfo } from "react";

export const handleError = (error: Error, info: ErrorInfo) => {
	// Log the error to an error reporting service
	console.error("Caught an error:", error, info);
};
