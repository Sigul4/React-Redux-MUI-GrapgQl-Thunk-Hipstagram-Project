import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import newPost from '../helpers/newPost.js';
import newPostWithImages from '../helpers/newPostWithImages.js';
import uploadFile from '../helpers/uploadFile.js';
import Drop from './DropZone.js';



export default function CreatePost ({_id, defaultTitle='', defaultText='', defaultImages = [],onStopChange, onChange}){
    
    const [images, ChangeImages] = useState(defaultImages)
    const [imagesIds, ChangeImagesIds] = useState(defaultImages.map(img => {return {_id: img._id}}))
    
    const [title, ChangeTitle] = useState(defaultTitle)
    const [text, ChangeText] = useState(defaultText)

    useEffect(()=>{
        console.log(images)
    },[images])

    
    console.log("imagesIds",imagesIds)

    return (
            <Card sx={{textAlign: "left", padding: "40px", marginBottom: "20px"}}>
                <Button onClick={onStopChange}>
                    Back To Default
                </Button>
                <form>
                    <Input 
                        sx={{width: "100%", marginBottom: "10px"}} 
                        placeholder='Title' 
                        onChange = {(e) => ChangeTitle(title => title = e.target.value)}
                        value={title}
                    />
                    <TextField
                        sx={{width: '100%', margin: '20px 0'}}
                        id="standard-multiline-static"
                        multiline
                        rows={3}
                        variant="standard"
                        placeholder="Post text"
                        onChange = {(e) => ChangeText(text => text = e.target.value)}
                        value={text}
                        />
                    <Drop imageData={(image) => {
                        console.log('!!!!!',image)
                        ChangeImages(prevArray => prevArray ? prevArray.concat(image.map((img) => {return {url: `${URL}${img.url}`}})): image.map((img) => {return {url: `${URL}${img.url}`}}))
                        ChangeImagesIds(prevArray => prevArray ? prevArray.concat(image.map((img) => {return {_id: img._id}})): image.map((img) => {return {_id: img._id}}))
                        }} onUpload={uploadFile}/>
                    <div style={{display: "flex"}}>
                        {Array.isArray(images) ? images.map((image, index) => 
                            <CardMedia
                                // onClick={ChangeImagesIds(images => images.filter())}
                                component="img"
                                height="50px"
                                width ="50px"
                                image={image.url}
                                sx={{width: "10%"}}
                            />) : ''}
                    </div>
                    {/* Select images: {images?.length}{images?.length === 0}{console.log('imagesssss',images?.length === 0)} */}
                    {/* <Button onClick={()=>{}}><h3>Drop to start values</h3></Button> */}
                    <Button onClick={() => {images?.length === 0 ? onChange(newPost(title, text, _id)): onChange(newPostWithImages(title, text, imagesIds, _id));}}><h3>Add post</h3></Button>
                </form> 
            </Card>
    )
}
