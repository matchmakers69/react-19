import Grid from "@mui/material/Grid";
import { useHomeCards } from "../hooks/useHomeCards";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { Box, Button, CardActions, CardContent, Divider, Typography } from "@mui/material";

const HomeCards = () => {
	const { HomeCardsList } = useHomeCards();

	return (
		<Grid container spacing={4}>
			{HomeCardsList.map((homeCard) => (
				<Grid item xs={12} sm={6} md={4} key={homeCard.id} sx={{ display: "flex" }}>
					<Card
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							flexGrow: 1,
							p: 1,
							gap: 3,
						}}
					>
						<CardContent>
							<Box
								sx={{
									mb: 1,
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography color="text.secondary" component="h2" variant="h5">
									{homeCard.title}
								</Typography>
							</Box>
							<Divider
								sx={{
									my: 2,
									opacity: 0.2,
									borderColor: "grey.500",
								}}
							/>
							<Box
								sx={{
									py: 1,
									display: "flex",
									gap: 1.5,
									alignItems: "center",
								}}
							>
								<Typography component="p" variant="subtitle2">
									{homeCard.paragraph}
								</Typography>
							</Box>
						</CardContent>
						<CardActions>
							<Button fullWidth variant="outlined" component={Link} to={homeCard.url}>
								{homeCard.linkText}
							</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default HomeCards;
