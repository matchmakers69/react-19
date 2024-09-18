import React, { useRef } from "react";
import { State, PromiseFn } from "./types";

export const useApiWithState = <T,>() => {
	// We assigning AbortController to the ref because we need to use
	// abort function in consumer component/hook.
	const ctrl = useRef<AbortController | null>(null);
	const [state, setState] = React.useState<State<T>>({ type: "idle" });

	const abort = () => {
		ctrl.current?.abort();
	};

	const handleFetch = async (promiseFn: PromiseFn<T>, abortable = false) => {
		abortable && abort(); // Aborts previous request if pending.

		// Recreating AbortController per request.
		ctrl.current = new AbortController();

		setState({ type: "pending" });

		try {
			const data = await promiseFn(ctrl.current.signal);
			setState({ type: "done", data });
		} catch (error: unknown) {
			if (ctrl.current.signal.aborted) {
				console.warn("Request aborted");
				return;
			}

			setState({ type: "fail", error });
		}
	};

	return [state, handleFetch, abort, setState] as const;
};
