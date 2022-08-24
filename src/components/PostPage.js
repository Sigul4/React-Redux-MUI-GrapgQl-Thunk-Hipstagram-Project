import { Button, Card, TextField }      from "@mui/material";
import { Box }                          from "@mui/system";
import React, { useEffect, useState }   from "react";
import actionNewComment                 from "../actions/actionNewComment";
import CreatePost                       from "./ChangePost.js";
import Comments                         from "./Comments";
import Post                             from "./Post";

export default function PostPage({match: {params: {_id}}, post, aboutMe, postLike, postUnlike, changePostsToDelete, recoverPost, onLoad}) {
    const [changer, switchChange       ] = useState(true);
    const [postData, changeData        ] = useState(post);
    const [deletedPost, changeDeletness] = useState(false)
    const [myComments, changeComments] = useState();
    const [commentText,    ChangeText] = useState('');



    useEffect(()=>{
        onLoad(_id)
    },[_id])

    useEffect(()=>{
        changeData(post)
        changeComments(post?.comments)
        // console.log('postData',postData)
    },[post])

    useEffect(()=>{
        // console.log('postData',postData,postData?.comments)
    },[postData])


    const showData = async (data) => {
        switchChange(!changer);
        changeData(await data);
        // console.log('data',data)
    };
    return (
        <Box sx={{width:"100%", display:"flex", justifyContent: "center", paddingTop:"100px"}}>
        {!!changer 
        ? ( <>
                <Post
                    className="post"
                    userId={aboutMe?._id}
                    postId={postData?._id}
                    title={`${postData?.title}`}
                    text={`${postData?.text}`}
                    createdAt={`${postData?.createdAt}`}
                    owner={postData?.owner}
                    images={postData?.images}
                    likes={postData?.likes}
                    postLike={postLike}
                    postUnlike={postUnlike}
                    onChangePost={() => switchChange(!changer)}
                    commentAdditionality={false}
                />
                <Card sx={{flexDirection: "column", maxHeight:606,}}>    
                    <Box sx={{display:"flex",flexDirection: "column", overflow:"scroll",maxHeight:450,maxWidth:450, margin:"0 40px"}}>
                        <Comments updateComments={onLoad} comments={postData?.comments}/>
                    </Box>
                    <Box sx={{}}>
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
                            await actionNewComment(commentText, postData?._id)
                            onLoad(_id)
                            ChangeText('')
                        }} >Add Comments</Button>
                    </Box>
                </Card>
            </>
        ) 
        : (
            <CreatePost
                _id={postData?._id}
                defaultTitle={postData?.title}
                defaultText={postData?.text}
                defaultImages={postData?.images}
                onChange={showData}
                onStopChange={() => switchChange(!changer)}
            />
        )}
        </Box>
    );
}
