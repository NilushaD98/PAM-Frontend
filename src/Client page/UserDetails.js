import React from 'react'
import '../style/user.css'
import CardRelated from '../compo/CardRelated'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import  {useEffect,useState}  from 'react';
import Icards from '../compo/Icards'


function UserDetails() {

    const {auth} = useAuthContext();
    let logedUserName = auth.user?.username;
    let logedUserPwd = auth.user?.password;

    const[id,setId] = useState('');
    const[username,setUserName] = useState('');
    const[region,setRegion] = useState('');
    const[contactNumber,setContactNumber] = useState('');

    const getUserDetails = () =>{            
            fetch('http://localhost:8083/api/v1/users/getUserDetailsByUserName?userName='+logedUserName,
                    {
                        method :'GET',
                        header:{'Accept': 'application/json','Content-Type':'application/json'},
                        headers :{
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + btoa(logedUserName + ':' + logedUserPwd)    
                        }
                    }
                )   
                .then(resp => {
                        if(resp.ok){
                            resp.json().then(data => {
                                setId(data.data.id);
                                setUserName(data.data.username);
                                setRegion(data.data.region);
                                setContactNumber(data.data.contactNumber);     
                            });           
                        }   else if(resp.status === 404){
                        }
                    }
                )
                .catch(error => {
                    }
                );
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const [data, setData] = useState([]);   
    const getALlVideos = () =>{
      fetch('http://localhost:8083/api/v1/admins/getAllVideos',
        {
          method :'GET',
          header:{'Accept': 'application/json','Content-Type':'application/json'},
          headers :{
                    'Content-Type': 'application/json'  
                    }
        }
      )
      .then(resp => {
            if(resp.ok){
        resp.json().then(data => {
                setData(data.data);
              }
            );           
          }
        }
      )
      .catch(error => {
        }
    ); 
    }
  
    useEffect(() => {
      getALlVideos();
  }, []);
  return (
   
    <div className='user_details_main'>
        <div className="user_title_container">
            <p>User Details</p>
        </div>

       <div className="sub_section">
        <div className="user_section">
                <div className="user_details_container">
                    <div className="user id_div">
                        <h6>User ID</h6>
                        <h5>:</h5>
                        <p>{id}</p>
                    </div>

                    <div className="user name_div">
                        <h6>Name</h6>
                        <h5>:</h5>
                        <p>{username}</p>
                    </div>

                    <div className="user country_div">
                        <h6>Country</h6>
                        <h5>:</h5>
                        <p>{region}</p>
                    </div>

                    <div className="user phone_div">
                        <h6>Phone number</h6>
                        <h5>:</h5>
                        <p>{contactNumber}</p>
                    </div>
                </div>

                <div className="user_update_done_buttons">
                    <Link to="/user_update">
                        <button>Update</button>
                    </Link>
                    
                    <Link to="/">
                        <button>Done</button>
                    </Link>
                </div>
            </div>

            <div className="related_video_section">
                <Typography gutterBottom variant="h5" sx={{color:'#242424',fontFamily:'Calibri',fontSize: '1.6rem',fontWeight:'600'}}>
                    Related Videos
                </Typography>

                {data.map(item => (<CardRelated 
                            key = {item.id}
                            LinkOfVideo={item.videoLink}
                            title={item.title}
                            description= {item.description}
                            />
                ))}

            </div>
       </div>
    </div>
  )
}

export default UserDetails;