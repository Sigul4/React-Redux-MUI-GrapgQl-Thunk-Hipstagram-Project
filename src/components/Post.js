import { Box, Button, TextField } from '@mui/material';
import Avatar                     from '@mui/material/Avatar';
import Card                       from '@mui/material/Card';
import CardContent                from '@mui/material/CardContent';
import CardHeader                 from '@mui/material/CardHeader';
import Collapse                   from '@mui/material/Collapse';
import { red }                    from '@mui/material/colors';
import Typography                 from '@mui/material/Typography';
import { useState }               from 'react';
import { Link }                   from 'react-router-dom';
import actionNewComment           from "../actions/actionNewComment";
import CardFooter from './CardFooter';
import CardInfСontainer from './CardInfСontainer';
import Comments                   from './Comments.js';
import CardComments from './CardComments';



export default function Post({userId, postId, title, text, createdAt,comments, owner, images, likes, postLike, postUnlike, onChangePost, onDeletePost, commentAdditionality = true}) {
  const [myComments, changeComments] = useState(comments?comments:[]);
  const [expanded,      setExpanded] = useState(false);
  const [commentText,    ChangeText] = useState('');
  const [likesLength,changelikesLength] = useState(likes?.length);

  
  // useEffect(()=>{
    console.log('myComments',myComments, comments)
  // },[myComments])

  const date = new Date(createdAt*1).toDateString()
  // console.log('likes',likes)

  // console.log('owner', owner)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const likesInf = likes ? Object.values(likes).map(like => {if(like.owner._id === userId) return like._id}).filter(element => element !== undefined) :() =>{}
  const [statusOfLike, setStatus] = useState(!!likesInf.length)

  if (images) console.log('images._id',Object.values(images))

  return (
    <Card sx={{ maxWidth: 500, width: "100%", marginBottom: "40px" }}  >
      <CardHeader 
      
        avatar={
          <Link to={`/profile/${owner?._id}`} style={{color:'black',display: 'flex', alignItems:'center'}}>
            <Avatar sx={{ bgcolor: red[500] }} alt='' aria-label="recipe" src={`http://hipstagram.node.ed.asmer.org.ua/${owner?.avatar?.url}`}></Avatar>
            <strong><h3>{owner?.nick ? owner.nick : owner?.login}</h3></strong>
          </Link>
        }
        action={userId === owner?._id
                  ?<><Button 
                      onClick={onChangePost}
                    >Change</Button>
                    <Button       
                      sx={{backgroundColor: 'red'}} 
                      variant="contained"
                      onClick={onDeletePost}
                    >Delete</Button>
                  </>:''
        }
        subheader={date.substr(0,30)}/>

      <CardInfСontainer images={images} postId={postId} title={title} text={text}/>

      <CardFooter statusOfLike={statusOfLike} postUnlike={postUnlike} postLike={postLike} likesInf={likesInf} setStatus={setStatus} changelikesLength={changelikesLength} likesLength={likesLength} commentAdditionality={commentAdditionality} postId={postId} expanded={expanded} handleExpandClick={handleExpandClick}/>

      <CardComments expanded={expanded} commentAdditionality={commentAdditionality} ChangeText={ChangeText} commentText={commentText} postId={postId} actionNewComment={actionNewComment} myComments={myComments} changeComments={changeComments}/>

    </Card>
  );
}
