import { Box, Stack, Typography } from "@mui/material";
import { PageTitleProps } from "./defs";

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
				<Typography
					variant="h1"
					mb="3rem"
					sx={{
						fontSize: "clamp(3rem, 10vw, 4rem)",
						color: "primary.main",
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						alignSelf: "center",
						textAlign: "center",
					}}
				>
					{title}
				</Typography>

				{subtitle && (
					<Typography
						textAlign="center"
						color="text.secondary"
						sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
					>
						{subtitle}
					</Typography>
				)}
			</Stack>
		</Box>
	);
};

export default PageTitle;
