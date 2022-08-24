import { Avatar, Button, Card, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import addNewCollection from "../actions/addNewCollection";
import actionProfileCollections from "../actions/actionProfileCollections";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function SavedCollections(){
    
    const collections = useSelector(state => state?.promise?.ProfileCollections?.payload)
    const aboutMe     = useSelector(state => state?.promise?.aboutMe?.payload)
    const profileInf  = useSelector(state => state?.promise?.ProfileInf?.payload)
    const dispatch = useDispatch()
    
    const [userCollections, setCollections]   = useState([])
    const [newCollection,   setNewCollection] = useState(false)
    const [text, setText] = useState('')
    
    useEffect(()=>{
        setCollections(collections)
        // console.log("collectionzzzz",userCollections)
    },[collections])
    
    useEffect(()=>{
        if(newCollection === true)setTimeout(()=> setNewCollection(!newCollection), 40000)
    },[newCollection])

    return(
    <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>
        <Card sx={{display:"flex",width:"510px",maxWidth:"100%", height:153,overflowX:"scroll"}}>
            
            <Box sx={{display:"flex", flexDirection:"column", margin:"10px"}}>
                {!!aboutMe && profileInf?._id === aboutMe?._id ? 
                    newCollection
                        ?<div style={{display:"flex", flexDirection:"column"}} >
                            <TextField
                                sx={{minWidth:"200px", height:"80px"}}
                                label="Collection Name"
                                multiline
                                rows={4}
                                onChange={(e)=>{setText(e.target.value)}}
                                value={text}
                            />
                            <Button onClick={() => {dispatch(addNewCollection(text));dispatch(actionProfileCollections(profileInf._id))}}>add </Button>
                        </div>
                        :<Button><AddCircleOutlineIcon onClick={()=>{setNewCollection(!newCollection)}} sx={{ width: 60, height: 90, margin:"10px" }}/></Button>
                    :''}
            </Box>
            {!!userCollections? userCollections.map(сollection => 
                <Box key={сollection._id} sx={{display:"flex", flexDirection:"column", margin:"10px"}}>
                    <Link to={`/collection/${сollection._id}`}>
                        <Avatar
                            src={сollection?.posts ? `http://hipstagram.node.ed.asmer.org.ua/${сollection?.posts[0]?.images ? сollection?.posts[0]?.images[0].url:''}`: ''}
                            sx={{ width: 56, height: 56, margin:"20px" }}
                            >{сollection?.text? сollection?.text.slice(0,3): "$$"}</Avatar>    
                        <strong>{сollection?.text}</strong>
                    </Link>
                </Box>
            ):''}
        </Card>
    </Box>
    )
}
