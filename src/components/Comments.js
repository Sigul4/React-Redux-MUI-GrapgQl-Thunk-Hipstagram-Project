import { Avatar, Button, Paper } from "@mui/material";
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import actionDeleteComment from "../actions/actionDeleteComment";



export default function Comments({comments, postId, updateComments}){
    console.log('comments',comments)
    
    return (
            <>
            <h3>Comments: </h3>
                {comments ? comments.map(comment => 
                
                        <Paper style={{color:'black',display: 'flex', justifyContent:'space-between', alignItems:'flex-start', padding:5}} elevation={3}>
                            <Link to={`/profile/${comment.owner._id}`} style={{color:'black',display: 'flex', alignItems:'center'}}>
                                <Avatar sx={{ bgcolor: red[500] }} alt='' aria-label="recipe" src={`http://hipstagram.node.ed.asmer.org.ua/${comment?.owner?.avatar?.url}`}></Avatar>
                                <strong><span>{comment.owner.login !== null ? comment.owner.login : 'Анонимная парасятина!'}</span></strong>
                            </Link>
                            
                            <strong style={{margin:10}}>{comment.text}</strong>
                            <span style={{color:'gray'}}>{new Date(comment.createdAt*1).toDateString().substr(0,30)}</span>
                            <Button       
                                sx={{backgroundColor: 'red'}} 
                                variant="contained"
                                onClick={() => {actionDeleteComment(comment._id); updateComments()}}
                                >Delete
                            </Button>
                        </Paper>
                ):()=>{}}
                
            </>
        )
}
