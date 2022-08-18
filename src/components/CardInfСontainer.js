import { CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UnfoldMoreIcon             from '@mui/icons-material/UnfoldMore';
import Carusel                    from './CaruselOfPictures';

export default function CardInfСontainer({images, postId,title,text}) {
    return (
        <CardContent
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
        {!!images ? <Carusel images={images} /> : ""}
        <Link
            to={`/post/${postId}`}
            sx={{ display: "flex", alignItems: "center" }}
        >
            <UnfoldMoreIcon sx={{ position: "relative" }} />
            Open Post
        </Link>
        <h3>{title === "null" ? "" : title}</h3>
        <Typography variant="body2" color="text.primary">
            {text}
        </Typography>
        </CardContent>
    );
}
