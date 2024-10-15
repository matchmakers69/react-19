import {
	Container,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import TheatersIcon from "@mui/icons-material/Theaters";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CategoriesListingProps } from "./defs";
import { Link as RouterLink, useNavigate } from "react-router-dom";

enum Icons {
	Pets = "Pets",
	Films = "Films",
	Music = "Music",
}

type IconsMapper = {
	[key in Icons]: React.ReactElement;
};

const iconsMapper: IconsMapper = {
	[Icons.Pets]: <PetsIcon />,
	[Icons.Films]: <TheatersIcon />,
	[Icons.Music]: <LibraryMusicIcon />,
};

const CategoriesListing = ({ categories, onDelete, loading }: CategoriesListingProps) => {
	const navigate = useNavigate();
	return (
		<Container maxWidth="sm">
			<nav aria-label="">
				<List>
					{categories.map((category) => (
						<ListItem sx={{ alignItems: "flex-start" }} key={category.id}>
							{category.title in Icons && <ListItemIcon>{iconsMapper[category.title as Icons]}</ListItemIcon>}
							<ListItemText
								primary={
									<>
										<Link
											underline="hover"
											sx={{ display: "block" }}
											component={RouterLink}
											to={`${category.id}`}
										>
											<Typography variant="subtitle1">{category.title}</Typography>
										</Link>
									</>
								}
								secondary={
									<>
										<Typography variant="caption">{category.description}</Typography>
									</>
								}
							/>
							<Stack flexDirection="row" gap={4}>
								<IconButton onClick={() => navigate(`/quiz/${category.id}/edit`)} aria-label="edit">
									<EditIcon />
								</IconButton>
								<IconButton onClick={() => onDelete(category.id)} aria-label="delete">
									{loading ? <span>loading...</span> : <DeleteIcon />}
								</IconButton>
							</Stack>
						</ListItem>
					))}
				</List>
			</nav>
		</Container>
	);
};

export default CategoriesListing;
