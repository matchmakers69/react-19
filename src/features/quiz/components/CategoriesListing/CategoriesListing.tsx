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
import ComputerIcon from "@mui/icons-material/Computer";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import BiotechIcon from "@mui/icons-material/Biotech";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { CategoriesListingProps } from "./defs";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

enum Icons {
	Technology = "Technology",
	Nature = "Nature",
	Discovery = "Discovery",
	Coding = "Coding",
}

const DEFAULT_ICON = <HelpOutlineIcon />;

type IconsMapper = {
	[key in Icons | string]: React.ReactElement;
};

const iconsMapper: IconsMapper = {
	[Icons.Technology]: <BiotechIcon />,
	[Icons.Nature]: <NaturePeopleIcon />,
	[Icons.Discovery]: <TipsAndUpdatesIcon />,
	[Icons.Coding]: <ComputerIcon />,
};

const CategoriesListing = ({ categories, onDelete, pending }: CategoriesListingProps) => {
	const [pendingDeletions, setPendingDeletions] = useState<{ [key: string]: boolean }>({});
	const navigate = useNavigate();

	const handleCategoryQuizDelete = (id: string) => {
		setPendingDeletions((prevDeleting) => ({
			...prevDeleting,
			[id]: true,
		}));
		onDelete(id);
	};
	return (
		<Container maxWidth="sm">
			<List>
				{categories.map((category) => (
					<ListItem sx={{ alignItems: "flex-start" }} key={category.id}>
						{<ListItemIcon>{iconsMapper[category.title as Icons] || DEFAULT_ICON}</ListItemIcon>}
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

							{pending && pendingDeletions[category.id] ? (
								<Typography variant="body1">Is deleting quiz category...</Typography>
							) : (
								<IconButton onClick={() => handleCategoryQuizDelete(category.id)} aria-label="delete">
									<DeleteIcon />
								</IconButton>
							)}
						</Stack>
					</ListItem>
				))}
			</List>
		</Container>
	);
};

export default CategoriesListing;
