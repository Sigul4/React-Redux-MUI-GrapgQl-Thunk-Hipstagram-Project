import { Box, Button, CardContent, Collapse, TextField, Typography } from "@mui/material";
import Comments from "./Comments";

export default function CardComments({expanded, commentAdditionality,ChangeText,commentText,postId,actionNewComment,myComments,changeComments}){
    return<Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography component={'span'} variant={'body2'} textAlign="left" paragraph>
            {/* comments{_id createdAt text likesCount owner{_id login} answerTo{_id}} */}
                {commentAdditionality
                ?<Box sx={{marginTop: 10}}>
                    <TextField
                        sx={{width: '100%'}}
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        onChange = {(e) => {ChangeText(e.target.value)}}
                        value={commentText}
                        />
                    <Button onClick={ async () => {
                        console.log(postId); 
                        const newComments = await actionNewComment(commentText, postId)
                        console.log('myComments',myComments, newComments)
                        changeComments(myComments => myComments = [...myComments, newComments])
                        // console.log('myComments',myComments);
                        ChangeText('')
                    }} >Add Comments</Button>
                </Box>
                :''}
                {!!myComments ? <Comments comments={myComments} postId={postId}/> : ''}
            </Typography>
            </CardContent>
        </Collapse>
}
