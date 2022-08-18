import { Paper }    from '@mui/material';
import Avatar       from '@mui/material/Avatar';
import List         from '@mui/material/List';
import * as React   from 'react';
import { Link }     from 'react-router-dom';

export default function ListOfMessages({listOfFollows}) {

    const [list, setList] = React.useState([])

    React.useEffect(()=>{
        if(listOfFollows !== list) setList(listOfFollows)
    },[listOfFollows])
    
    return (
        <>
        <h3>List of your following</h3>
        <List sx={{ width: '100%', maxWidth: 360, maxHeight:290, bgcolor: 'background.paper', overflow:"scroll" }}>
            {list ? list.map(follow => {
                return(
                <>
                    <Paper style={{color:'black',display: 'flex', justifyContent:'space-between', alignItems:'flex-start',margin: 5, padding:5}} elevation={3}>
                        <Link to={`/profile/${follow._id}`} style={{color:'black',display: 'flex', alignItems:'center'}}>
                            <Avatar sx={{ bgcolor: "red[500]" }} alt='' aria-label="recipe" src={`http://hipstagram.node.ed.asmer.org.ua/${follow?.avatar?.url}`}></Avatar>
                            <strong><span>{follow.login !== null ? follow.login : 'Анонимная парасятина!'}</span></strong>
                        </Link>
                    </Paper>
                </>)
            }):''}
        </List>
        </>
    );
}
