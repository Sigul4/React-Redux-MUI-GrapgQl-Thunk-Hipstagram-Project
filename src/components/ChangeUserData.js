import { Button, Card, CardMedia } from "@mui/material";
import Drop from "./DropZone";

export default function ChangeUserData({popUpDropMenu,ChangeProfileImage,uploadFile,changePopUpDropMenu,profileImage,onProfileChange,onLoadUserInf,_id}){
    return (
        <>
        {popUpDropMenu? <>
            <Card sx={{position:"fixed",top: 200,margin:"auto",height:400, zIndex:4, overflow:"hidden", background:"rgb(231,231,231)"}}>
                <Drop style={{height:"100%"}}
                imageData={(image) => {
                    ChangeProfileImage(image[0])}} onUpload={uploadFile}/>
                <Button sx={{position:"absolute", right: "0", zIndex: 5, top: 0,fontSize:20}} onClick={() => {changePopUpDropMenu(!popUpDropMenu)}}>X</Button>
                <div style={{display: "flex", justifyContent:"center"}}>
                        <CardMedia
                            image={profileImage?.url ? `http://hipstagram.node.ed.asmer.org.ua/${profileImage?.url}`: ""}
                            component="img"
                            sx={{margin:"10px", width:"55%"}}
                        />
                </div>
                <Button variant="contained" onClick={async() =>  {await onProfileChange(profileImage._id, null); onLoadUserInf(_id); changePopUpDropMenu(!popUpDropMenu)}}>Change Profile Page</Button>
            </Card>
        </>: ''}
        </>
    )
}
