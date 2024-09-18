import { Box, Container, IconButton, Link, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import * as S from "./StickyFooter.styled";

const StickyFooter = () => {
	return (
		<S.Footer component="footer">
			<Container>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						pt: { xs: 4, sm: 8 },
						width: "100%",
						borderTop: "1px solid",
						borderColor: "divider",
					}}
				>
					<div>
						<Link color="text.secondary" href="#">
							Privacy Policy
						</Link>
						<Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
							&nbsp;•&nbsp;
						</Typography>
						<Link color="text.secondary" href="#">
							Terms of Service
						</Link>
						<Typography variant="body2" color="text.secondary" mt={1}>
							{"Copyright © "}
							<Link target="_blank" href="https://react.dev/blog/2024/04/25/react-19">
								React 19 RC&nbsp;
							</Link>
							{new Date().getFullYear()}
						</Typography>
					</div>
					<Stack
						direction="row"
						justifyContent="left"
						spacing={1}
						useFlexGap
						sx={{
							color: "text.secondary",
						}}
					>
						<IconButton
							color="inherit"
							href="https://github.com/mui"
							aria-label="GitHub"
							sx={{ alignSelf: "center" }}
						>
							<FacebookIcon />
						</IconButton>
						<IconButton
							color="inherit"
							href="https://x.com/MaterialUI"
							aria-label="X"
							sx={{ alignSelf: "center" }}
						>
							<TwitterIcon />
						</IconButton>
						<IconButton
							color="inherit"
							href="https://www.linkedin.com/company/mui/"
							aria-label="LinkedIn"
							sx={{ alignSelf: "center" }}
						>
							<LinkedInIcon />
						</IconButton>
					</Stack>
				</Box>
			</Container>
		</S.Footer>
	);
};

export default StickyFooter;
