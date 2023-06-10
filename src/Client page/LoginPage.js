import React , {useState,useEffect} from 'react'
import useAuthContext from '../hooks/useAuthContext';
import '../style/login.css'
import { Card,CardContent,Typography } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function LoginPage() {

const[usernames,setUserNames] =useState([]);
const[machineNames,setMachineNames]= useState([]);
const [selectedUserOption, setSelectedUserOption] = useState('');
const [selectedMAchineOption, setSelectedMachineOption] = useState('');


const getUsersNameAndMachineNames = () =>{
    fetch(
        'http://localhost:8083/api/v1/users/getAllMachinesname',
        {
            method:'GET',
            header:{'Accept': 'application/json','Content-Type':'application/json'}
        }
    ).then(response =>{
        response.json().then(data =>{
            setMachineNames(data.data)
        })
    }).catch(error =>console.log(error))
fetch(
'http://localhost:8083/api/v1/users/getAllUserNames',
{
method:'GET',
header:{'Accept': 'application/json','Content-Type':'application/json'}
}
).then(resp =>{
console.log(resp);
resp.json().then(data =>{
    setUserNames(data.data);
    console.log(data.data);
}
    
    )
}).catch(error =>console.log(error))
}


const [username, setUserName] = useState('');
const [password, setPassword] = useState('');
const [machineName,setMachineName]= useState('');
const [nic,setNic]=useState('')

const [IsLogging, setLoggingUser] = useState(false);

const {dispatch} = useAuthContext();
const navigate = useNavigate();
const authenticationUser = () =>
{
    console.log(username,password,machineName,nic);
    fetch('http://localhost:8083/api/v1/auth/authenticate',
        {
            method :'POST',
            header:{
                'Accept': 'text/plain;charset=UTF-8','Content-Type':'application/json'
            },
            headers :{
                'Content-Type': 'application/json',
                },
            body:JSON.stringify(
                {
                    "username":username,
                    "password":password,
                    "nic":nic,
                    "machineName":machineName
                }
            )
        }
    )
    .then(resp => {
        console.log(resp);
        if(resp.ok){
            resp.json().then(data => {
                if(data.redirect_status ==="0"){
                    console.log("user");
                    const authData = {
                        jwt:data.access_token
                        }
                        localStorage.setItem('Token1', JSON.stringify(authData));
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: authData
                    })
                    // private String redirect_status;
                    // private String access_token;
                    // private String machineIP;
                    // private String machineUsername;
                    // private String machinePassword;
                    // private String oSystem;
                }else if(data.redirect_status ==="1"){
                    navigate('/homepage');
                    const authData = {
                        jwt:data.access_token
                        }
                        localStorage.setItem('Token1', JSON.stringify(authData));
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: authData
                    })
                    
                    
                }
                    Swal.fire({
                    icon: 'success',
                    title: 'Successful !',
                    text: data.username+' Login Successfully !',
                    customClass: {
                    confirmButton: 'my-button-class'
                    },
                    buttonsStyling: false
                    });
                    });
        }else if(resp.status === 403){
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Username or Password wrong!',
            });
        }else if(resp.status === 406){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Nic wrong!!',
                });
        }
        return IsLogging;
    }
    )
    .catch(error => {
    }
    );

}
const handleClickUsername = e => 
{
e.preventDefault();
authenticationUser();
};
useEffect(() => {
    getUsersNameAndMachineNames();
}, []);

return (
<div className='login_main_container'>

<div className="login_form_container" >
<Card
sx={{width:'320px'}}
>
<CardContent className='title_container'>
<Typography className='title_container_text' gutterBottom variant="h4" component="div">
Login
</Typography>
</CardContent>
<CardContent className='input_feilds'>
<Box component="form"
sx={{maxWidth: 800 ,
'& .MuiTextField-root': { m: 1},
}}
noValidate
autoComplete="off"
onSubmit={handleClickUsername}

>
    <table>
        <tr>
            <td><label>username : </label></td>
            <td>
                <select onChange={e =>setUserName(e.target.value)}>
                {usernames.map(item => (
                <option  key={Math.random()}>
                {item.username}
                </option>
                ))}
                </select>
            </td>
        </tr>
        <tr>
            <td><label>password : </label></td>
            <td><input type="password" onChange={e =>setPassword(e.target.value)}></input></td>
        </tr>
        <tr>
            <td><label>nic : </label></td>
            <td><input type="text" onChange={e =>setNic(e.target.value)}></input></td>
        </tr>
        <tr>
            <td><label>machine name : </label></td>
            <td>
            <select onChange={e =>setMachineName(e.target.value)}>
            {machineNames.map(item => (
            <option key={Math.random()}>
            {item.machineName}
            </option>
            ))}
            </select>
            </td>
        </tr>
    </table>

<div>
<FormControl sx={{ m: 1}} variant="outlined" size="small"  className='text_feild'>


</FormControl>
</div>
<div className = 'login_button_div'>
<button  className = 'login_button'type='submit'>Login</button>
</div>

</Box>

</CardContent>

</Card>
</div>

</div>
)
}

export default LoginPage


