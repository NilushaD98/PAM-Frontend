import React, {useRef, useState} from 'react'
import '../style/upload.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import useAuthContext from "../hooks/useAuthContext";

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', width: '200px', height: '200px'}}>
        <CircularProgress variant="determinate" {...props} style={{width: '100%', height: '100%'}}  />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
}



function UploadPage() {

    const {auth} = useAuthContext();
    let logedUserName = auth.user?.username;
    let logedUserPwd = auth.user?.password;
    const fileInputRef = useRef();
    const [video, setVideo] = useState(null);
    const [videoURL, setVideoURL] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState('');

    const uploadVideo = (downloadURL,filepaths) =>{
        fetch('http://localhost:8083/api/v1/admins/videoSave',
          {
            method :'POST',
            header:{'Accept': 'application/json','Content-Type':'application/json'},
            headers :{
                      'Content-Type': 'application/json',
                      'Authorization': 'Basic ' + btoa(logedUserName + ':' + logedUserPwd)
                      },
            body : JSON.stringify(
                {
                    "title":title,
                    "description":desc,
                    "status":status,
                    "filePath" : filepaths,
                    "videoLink":downloadURL
                }
            )
          }
        )
        .then(resp => {
          console.log(resp);
            if(resp.ok){
                resp.json().then(data => {
                }
                )

                Swal.fire({
                    icon: 'success',
                    title: 'Successful !',
                    text: title +' Uploaded Successfully !',
                    customClass: {
                        confirmButton: 'my-button-class'
                      },
                      buttonsStyling: false
                  });
            }
            if(resp.status === 409){
              console.log("video already in database.");
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'Video Already in Database!',
                customClass: {
                    confirmButton: 'my-button-class'
                  },
                  buttonsStyling: false
              });
            }       
          }
        )
        .catch(error => {
          }
      ); 
      }

    const handleVideoUpload = async () => {
        if(!video || !videoURL) return; 

        setIsUploading(true);

        // upload the selected video to firebase
        const filePath = `/videos/${uuidv4()}`;
        const videoRef = ref(storage, filePath);

        const uploadTask = uploadBytesResumable(videoRef, video);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                setProgress(p);
            }, 
            (error) => {
                // Handle unsuccessful uploads
                setIsUploading(false);
                console.log(error);
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setIsUploading(false);
                        uploadVideo(downloadURL,filePath);
                    });
            }
        );

    }

      const handleVideoSelect = e => {
        const file = e.target.files[0];
        const blobURL = URL.createObjectURL(file);
        setVideo(file);
        setVideoURL(blobURL);
      }

      const handleVideoRemove = () => {
        setVideo(null);
        setVideoURL(null);
        setTitle("");
        setDesc("");
        setStatus("");
      }


  return (
    <div className='admin_main_upload_container'>
        <div className="upload_title_container">
            <h2>Video upload</h2>
        </div>

        <div className="upload_fill_container">
            <div className="blanks_upload_div">
                <div className="div_title">
                    <p>Fill this details below</p>
                </div>
                <div className="upload_input_feilds">
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '400px' },
                    }}
                    noValidate
                    autoComplete="off"
                    className='upload_input_box'
                    >
                    <TextField 
                        id="outlined-basic" 
                        label="Video title" 
                        variant="outlined" 
                        fullWidth
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />

                    <TextField 
                        id="outlined-basic" 
                        label="Video description" 
                        variant="outlined" 
                        fullWidth
                        onChange={e => setDesc(e.target.value)}
                        value={desc}
                    />

                    <TextField 
                        id="outlined-basic" 
                        label="Video status" 
                        fullWidth
                        onChange={e => setStatus(e.target.value)}
                        value={status}
                    />
                </Box>
                </div>
            </div>
            <div className="upload_video_div">
                {video && videoURL && !isUploading && (
                    <>
                        <div>
                            <video src={videoURL} width="100%" height="400" controls />
                        </div>
                        {/* <div style={{marginTop: '20px'}}>
                            <button style={{background: '#333', color: '#fff', border: 'none', padding: '8px 10px', cursor: 'pointer'}} onClick={handleVideoRemove} >Remove current selected video</button>
                        </div> */}
                    </>
                )}

                {isUploading && (
                    <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CircularProgressWithLabel value={progress} />
                    </div>
                )}

                {!video && !videoURL && (
                    <>
                        <div className="div_title">
                            <p>Upload your video in here</p>
                        </div>
                        <button className="upload_video_div_upload" onClick={() => fileInputRef.current.click()} >
                            {/* <Link className='link_upload_video' type='file'> */}
                            <input type='file' className='upload_video_div_upload_video_input' ref={fileInputRef} accept="video/*" onChange={handleVideoSelect} />
                            <AddCircleOutlineIcon sx={{fontSize: '5rem',color: '#ccc'}}/>
                            <p>Click here to upload video</p> 
                            {/* </Link> */}
                        </button>
                    </>
                )}
                </div>
        </div>

        <div className="admin_upload_button">
           
                <button style={{cursor: 'pointer'}} onClick={handleVideoUpload} disabled={isUploading} >
                    {isUploading ? 'uploading...' : 'Upload'}
                </button>
                <button style={{background: '#333', color: '#fff', border: 'none', padding: '8px 10px', cursor: 'pointer'}} onClick={handleVideoRemove} >
                    Remove Video
                </button>
           
        </div>

        

    </div>
  )
}

export default UploadPage