import AddPhotoAlternateOutlinedIcon    from '@mui/icons-material/AddPhotoAlternateOutlined';
import React                            from 'react';
import Dropzone                         from 'react-dropzone';


export default function Drop({imageData, onUpload}) {


    return (
        <Dropzone onDrop={async (acceptedFiles) =>{ 
            const image = await onUpload(acceptedFiles)
            imageData(image)
        }}>
        {({getRootProps, getInputProps}) => (
            <section>
            <div style={{border: "2px gray dashed", padding: '10px 40px'}} {...getRootProps()}>
                <input {...getInputProps()} />
                <span><AddPhotoAlternateOutlinedIcon/>Drag 'n' drop some files here, or click to select files</span>
            </div>
            </section>
        )}
        {/* <div>{arrOFPictures.map(picture => <div>{picture.url}</div>)}</div> */}
        </Dropzone>
    )
}
