import { ImageList, ImageListItem } from "@mui/material";
import { ImagePickerProps } from "./defs";

const ImagePicker = ({ images, selectedImage, onSelect }: ImagePickerProps) => {
	return (
		<ImageList sx={{ width: "100%", height: 226 }} cols={3} rowHeight={80}>
			{images.map((image) => (
				<ImageListItem key={image.id} onClick={() => onSelect(image.path)}>
					<img
						src={`/assets/images/${image.path}?w=164&h=80&fit=crop&auto=format`}
						srcSet={`/assets/images/${image.path}?w=164&h=80&fit=crop&auto=format&dpr=2 2x`}
						alt={image.caption}
						loading="lazy"
						style={{
							cursor: "pointer",
							border: selectedImage === image.path ? `4px solid #ff0026` : "none",
						}}
					/>
				</ImageListItem>
			))}
		</ImageList>
	);
};

export default ImagePicker;
