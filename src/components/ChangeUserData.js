import { Button, Card, CardMedia } from "@mui/material";
import { useDispatch } from "react-redux";
import Drop from "./DropZone";
import actionProfileInf from "../actions/actionProfileInf";

export default function ChangeUserData({popUpDropMenu,ChangeProfileImage,uploadFile,changePopUpDropMenu,profileImage,onProfileChange,_id}){

    const dispatch = useDispatch()
    

    return (
        <>
        {popUpDropMenu? <>
            <Card sx={{position:"fixed",top: 200,margin:"auto",height:500,maxWidth:"400px", zIndex:4, overflow:"hidden", background:"rgb(231,231,231)"}}>
                <Drop style={{height:"100%"}}
                imageData={(image) => {
                    ChangeProfileImage(image[0])}} onUpload={uploadFile}/>
                <Button sx={{position:"absolute", right: "0", zIndex: 5, top: 0,fontSize:20}} onClick={() => {changePopUpDropMenu(!popUpDropMenu)}}>X</Button>
                <div style={{display: "flex", justifyContent:"center"}}>
                        <CardMedia
                            image={profileImage?.url ? `http://hipstagram.node.ed.asmer.org.ua/${profileImage?.url}`: ""}
                            component="img"
                            sx={{margin:"10px",maxWidth:"55%",maxHeight:"300px"}}
                        />
                </div>
                <Button variant="contained" onClick={async() =>  {await onProfileChange(profileImage._id, null); dispatch(actionProfileInf(_id)); changePopUpDropMenu(!popUpDropMenu)}}>Change Profile Page</Button>
            </Card>
        </>: ''}
        </>
    )
}
