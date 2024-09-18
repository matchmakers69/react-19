import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";

function Hero() {
	return (
		<Box id="hero" width="100%">
			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					pt: { xs: 8, sm: 16 },
					pb: { xs: 2, sm: 4 },
				}}
			>
				<Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
					<Typography
						variant="h1"
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							alignSelf: "center",
							textAlign: "center",
							fontSize: "clamp(3.5rem, 10vw, 4rem)",
						}}
					>
						Training&nbsp;
						<Typography
							component="span"
							variant="h1"
							sx={{
								fontSize: "clamp(3rem, 10vw, 4rem)",
								color: "primary.main",
							}}
						>
							with React
						</Typography>
					</Typography>
					<Typography
						textAlign="center"
						color="text.secondary"
						sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
					>
						In React, we’re adding support for using async functions in transitions to handle pending states,
						errors, forms, and optimistic updates automatically.
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}

export default Hero;
