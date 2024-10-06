import Avatar from "@mui/material/Avatar";
import { WorkerImageProps } from "./defs";

const WorkerImage = ({ alt, imgUrl, width, height }: WorkerImageProps) => {
	return <Avatar alt={alt} src={`/assets/avatars/${imgUrl}`} sx={{ width, height }} />;
};

export default WorkerImage;
