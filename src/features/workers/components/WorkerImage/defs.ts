import { BaseProps } from "types/defs";

export interface WorkerImageProps extends BaseProps {
	width?: number;
	height?: number;
	alt?: string;
	imgUrl: string;
}
