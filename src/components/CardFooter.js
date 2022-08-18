import { CardActions, IconButton }  from "@mui/material";
import ExpandMoreIcon               from '@mui/icons-material/ExpandMore';
import FavoriteIcon                 from '@mui/icons-material/Favorite';
import FavoriteBorderIcon           from '@mui/icons-material/FavoriteBorder';
import ShareIcon                    from '@mui/icons-material/Share';
import { styled }                 from '@mui/material/styles';

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
    return<CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        {/* {console.log(likesInf)} */}
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
      </CardActions>
}
