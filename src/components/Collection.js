import { Button, CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "../App.css";
import deletePost from "../helpers/deletePost";
import PostWrapper from "./PostWrapper";
import actionDeletePostFromCollection from "../actions/actionDeletePostFromCollection"; 
import actionRemoveLike from "../actions/actionRemoveLike";
import actionAddLike from "../actions/actionAddLike";
import actionPostsByCollection from "../actions/actionPostsByCollection";

const Collection = ({
    match: {
        params: { _id },
    },
    posts = [],
    onLoadUserPosts,
    postLike,
    postUnlike,
    }) => {

    let   [SmthToView, ChangeView] = useState([]);
    const [takingData, SetTakingData] = useState(false);
    const [postsToDelete, changePostsToDelete] = useState([]);

    const addPostToDelete = (id) => {
        changePostsToDelete(postsToDelete.push(id));
    };

    const recoverPost = (id) => {
        changePostsToDelete(postsToDelete.filter(posts !== id));
    };
    

    const aboutMe = useSelector(state => state?.promise?.aboutMe?.payload)
    const collection = useSelector(state => state?.promise?.PostsByCollection?.payload)
    const dispatch = useDispatch()
    

    useEffect(() => {
        
        return () =>
        console.log(
            postsToDelete,
            "Posts To Delete",
            postsToDelete.map((id) => deletePost(id))
        );
    }, []);

    useEffect(() => {
        onLoadUserPosts(_id, true);
    }, [_id]);

    useEffect(() => {
        onLoadUserPosts(_id);
    }, [takingData]);

    useEffect(() => {
        document.addEventListener("scroll", onScroll);

        return function () {
        document.removeEventListener("scroll", onScroll);
        };
    }, []);



    useEffect(() => {
        console.log('SmthToView',SmthToView)
    }, [SmthToView]);

    useEffect(() => {
        ChangeView(
            posts?.posts?.map((post) => {
            // console.log('post',post)
            return(
            <Box sx={{display:"flex", flexDirection:"column", marginBottom:"20px"}}>
            {collection.owner._id === aboutMe._id ? <Button onClick={async () => {await dispatch(actionDeletePostFromCollection(_id,post._id));onLoadUserPosts(_id, true)}}>Remove “👇“ from this collection</Button>:''}
                <PostWrapper
                    key={post._id}
                    post={post}
                    aboutMe={aboutMe}
                    postLike={postLike}
                    postUnlike={postUnlike}
                    changePostsToDelete={addPostToDelete}
                    recoverPost={recoverPost}
                    className="post"
                />
            </Box>
            )})
        );
    }, [posts]);

    function onScroll(e) {
        if (
        e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <1
        && posts?.posts.lenght > 5) {
        SetTakingData((takingData) => (takingData = !takingData));
        }
    }

    return (
        <>
        {SmthToView?.length
            ?<Box sx={{ width: "100%", paddingTop:"100px", display: "flex", justifyContent: "center" }}>
                <div className="PostList">
                    {SmthToView}
                </div>
            </Box>
            : <Box sx={{ width: "100%", paddingTop:"100px", display: "flex", justifyContent: "center" }}>
                <div className="PostList">
                    <h1>Постов нима, расходимся</h1>
                    <CardMedia
                        image={`https://i.pinimg.com/736x/44/b8/3c/44b83c691eff2e0f31ef5e5a80088dd6.jpg`}
                        component="img"
                        sx={{margin:"10px", width:"55%"}}
                    />
                </div>
            </Box>
        }
        </>
    );
    }

export const CCollectionsPage  = connect(state => ({posts: state?.promise?.PostsByCollection?.payload, aboutMe: state?.promise?.aboutMe?.payload, collections: state?.promise?.ProfileCollections?.payload}), {onLoadUserPosts:actionPostsByCollection, postLike:actionAddLike, postUnlike:actionRemoveLike})(Collection);
