import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { forwardRef, useMemo } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { RouterLinkProps } from "./defs";

const RouterLink = (props: RouterLinkProps) => {
	type CustomNavLinkProps = Omit<NavLinkProps, "to">;
	const CustomNavLink = useMemo(
		() =>
			forwardRef<HTMLAnchorElement, CustomNavLinkProps>((navLinkProps, ref) => {
				const { className: previousClasses, ...rest } = navLinkProps;
				const elementClasses = previousClasses?.toString() ?? "";
				return (
					<NavLink
						{...rest}
						ref={ref}
						to={props.to}
						end
						className={({ isActive }) => (isActive ? elementClasses + " Mui-selected" : elementClasses)}
					/>
				);
			}),
		[props.to],
	);
	return (
		<ListItemButton component={CustomNavLink}>
			{props.icon ? (
				<ListItemIcon
					sx={{
						".Mui-selected > &": {
							color: (theme) => theme.palette.text.secondary,
						},
					}}
				>
					{props.icon}
				</ListItemIcon>
			) : null}

			<ListItemText primary={props.text} color="text.primary" />
		</ListItemButton>
	);
};
export default RouterLink;
