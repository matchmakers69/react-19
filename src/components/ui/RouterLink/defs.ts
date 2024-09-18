import { PropsWithChildren, ReactNode } from "react";

export type RouterLinkProps = PropsWithChildren<{
	to: string;
	text: string;
	icon?: ReactNode;
}>;
