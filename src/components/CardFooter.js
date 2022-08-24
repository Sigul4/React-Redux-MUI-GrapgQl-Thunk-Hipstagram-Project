import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, Card, CardActions, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionAddPostToCollection from "../actions/actionAddPostToCollection";
import actionProfileCollections from "../actions/actionProfileCollections";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    }));

export default function CardFooter({statusOfLike,postUnlike,postLike,likesInf,setStatus,changelikesLength,likesLength,commentAdditionality,postId,expanded,handleExpandClick}){
    
    const dispatch = useDispatch()
    const myId = useSelector(state => state?.promise?.aboutMe?.payload?._id)
    const [Bookmark, setBookmark] = useState(true)
    const [fieldStatus, setFieldStatus] = useState(false) 
    const [selectedCollection, setCollection] = useState(null) 
    const listOfCollections = useSelector(state => state?.promise?.ProfileCollections?.payload)
    
    return<CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        {statusOfLike ? <FavoriteIcon sx={{padding:'10px'}} onClick={() => {postUnlike(likesInf[0]); setStatus(!statusOfLike); changelikesLength(likesLength-1)}} /> : <FavoriteBorderIcon sx={{padding:'10px'}} onClick={() => {postLike(postId);setStatus(!statusOfLike); changelikesLength(likesLength+1)}} />  }        
        </IconButton>
        {likesLength}
        <IconButton aria-label="share">
          <ShareIcon sx={{padding:'10px'}} onClick={()=>{navigator.clipboard.writeText(`http://localhost:3000/post/${postId}`)}}/>
        </IconButton>
        {commentAdditionality 
        ?<ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>:""}
        
        {fieldStatus
            ?<Box
              onMouseEnter={() => setFieldStatus(true)}
              onMouseLeave={() => setFieldStatus(false)}  
              sx={{position:"relative",justifyContent:"flex-start"}}>
              <Card sx={{display:"flex",zIndex:"2",position:"absolute",bottom:"-15px",maxHeight:"170px",overflowY:"scroll", flexDirection:"column"}}>
                {listOfCollections 
                ?listOfCollections.map((Collection) => 
                  { 
                  // console.log('Collection',Collection)
                  return (<IconButton onClick={async () => {
                    setCollection(Collection)
                    setBookmark(!Bookmark); 
                    await dispatch(actionProfileCollections(myId));
                    dispatch(actionAddPostToCollection(selectedCollection, postId))
                    
                    }} aria-label="share" >
                            <Avatar sx={{width:"25px", height:"25px"}} src={Collection?.posts ? `http://hipstagram.node.ed.asmer.org.ua/${Collection?.posts[0]?.images ? Collection?.posts[0]?.images[0].url:''}`: ''}>{Collection?.text?.slice(0,2)}</Avatar>
                          </IconButton>)
                    })
                  :''}
              </Card>
            </Box>
            :''
        }
        <IconButton 
              onMouseEnter={() => setFieldStatus(true)}
              onMouseLeave={() => setFieldStatus(false)} 
              aria-label="share" >
        {Bookmark
          ?<BookmarkBorderIcon onClick={async () => {
            setBookmark(!Bookmark); 
            await dispatch(actionProfileCollections(myId));
            dispatch(actionAddPostToCollection(selectedCollection, postId))
            
          }}/>
          :<BookmarkIcon onClick={() => {setBookmark(!Bookmark)}}/>
        }
        </IconButton>
      </CardActions>
}
