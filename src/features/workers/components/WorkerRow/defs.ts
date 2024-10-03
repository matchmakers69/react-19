import { Worker } from "@services/api/types";
import { BaseProps } from "types/defs";

export interface WorkerRowProps extends BaseProps {
	worker: Worker;
}
