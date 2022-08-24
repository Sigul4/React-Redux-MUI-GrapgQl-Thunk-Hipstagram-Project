import CardMedia                from '@mui/material/CardMedia';
import List                     from '@mui/material/List';
import { useEffect, useState }  from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import actionProfileCollections from '../actions/actionProfileCollections';
import '../App.css';
import deletePost               from "../helpers/deletePost";
import CreatePost               from './ChangePost.js';
import InfoCard                 from './infoCard.js';
import PostWrapper              from './PostWrapper';

function ContentPage({Post, aboutMe, onPostLoad}) {
    
    const [SmthToView, ChangeView] = useState('')
    const [takingData, SetTakingData] = useState('')
    const [postsToDelete, changePostsToDelete] = useState([]);
    const dispatch = useDispatch()
    const myId = useSelector(state => state.auth.payload.sub.id)
    
        
    const addPostToDelete = (id) =>{
        // console.log('postData',id)
        changePostsToDelete(postsToDelete.push(id))
        // console.log('postsToDelete',postsToDelete)
    }    

    const recoverPost = (id) =>{
        changePostsToDelete(postsToDelete.filter(Post !== id))
    }
    
    useEffect(() => {
        dispatch(actionProfileCollections(myId))
        return () => {console.log(postsToDelete,"Posts To Delete",postsToDelete.map(id => deletePost(id))); onPostLoad(true)}
    }, []);

    

    useEffect(()=>{
        // console.log('takingData',takingData)
        SetTakingData(false)
        if(takingData === false){onPostLoad()}
    },[takingData])

    useEffect(()=>{
        document.addEventListener('scroll', onScroll)
        return function(){
            document.removeEventListener('scroll', onScroll)
        }
    },[])
    
    useEffect(()=>{
        console.log('REAL POSTS', Post)
        if (Post && !!aboutMe) ChangeView(Post.map(post => {return <PostWrapper key={post._id} post={post} aboutMe={aboutMe} changePostsToDelete={addPostToDelete} recoverPost={recoverPost} className="post"/>}))
    },[Post])


    function onScroll(e) {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1){
            // console.log('Экшн ПОСЛЕ СКРОЛА =>',takingData,"<=")
            SetTakingData(true)
        }
    }
    
    return (
        <List className="ContentPage">
            <div className="PostList" style={{paddingTop:100}}>
                <CreatePost onChange={async (e)=>{Post.unshift(await e); ChangeView(Post.map(post => <PostWrapper key={post._id} post={post} aboutMe={aboutMe} changePostsToDelete={addPostToDelete} recoverPost={recoverPost} className="post"/> ))}}/>
                {SmthToView.length > 0 ? SmthToView: 
                <>
                <h1>There are no posts. <br/>Hold on brother.</h1>
                <CardMedia sx={{width: 400}}
                component="img"
                height="250"
                image="https://c.tenor.com/cSqgJbILFMkAAAAC/%D1%87%D1%82%D0%BE%D0%BF%D0%BE%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C.gif"
                alt="green iguana"
                /></>}
            </div>
            <div style={{minWidth:300}}>
            {aboutMe? <InfoCard className="infoCard" user={aboutMe}/>: <InfoCard className="infoCard"/>}
            </div>
                
        </List>
    );
}

export default ContentPage;
