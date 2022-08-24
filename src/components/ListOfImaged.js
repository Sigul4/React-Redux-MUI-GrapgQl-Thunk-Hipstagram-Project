import { CardMedia } from "@mui/material";

export default function ListOfImages({images, ChangeImagesIds, ChangeImages}){
                return (<div style={{display: "flex"}}>
                        {Array.isArray(images) ? images.map((image, index) => {
                            // console.log('image?.url',image?.url, image?.url.length)
                            const url = image?.url.length > 39 ? image?.url.slice(32): image?.url
                            return <CardMedia   
                                onClick={() =>{
                                    ChangeImagesIds(images => images.filter(normalImg => normalImg._id !== image._id));
                                    ChangeImages(images => images.filter(normalImg => normalImg.url !== image.url))
                                }}
                                component="img"
                                height="50px"
                                width ="50px"
                                image={`http://hipstagram.node.ed.asmer.org.ua/${url}`}
                                sx={{width: "10%"}}
                            />}) : ''}
                    </div>)
}
