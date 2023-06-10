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


function AddUser() {

const [username, setUserName] = useState('');
const [password, setPassword] = useState('');
const [email,setEmail]= useState('')
const [role,setRole]=useState('');
const [nic,setNic]=useState('')

const {dispatch} = useAuthContext();
const navigate = useNavigate();
const addUser = () =>
{
    
    fetch('http://localhost:8083/api/v1/admin/addUser',
        {
            method :'POST',
            header:{
                'Accept': 'text/plain;charset=UTF-8','Content-Type':'application/json',
            },
            headers :{
                'Content-Type': 'application/json',
                'AUTHORIZATION':'Bearer '+JSON.parse(localStorage.getItem('Token1')).jwt
                },
            body:JSON.stringify(
                {
                    "username":username,
                    "password":password,
                    "email":email,
                    "role":role,
                    "nic":nic
                }
            )
        }
    )
    .then(resp => {
        console.log(resp);
        if(resp.status === 201){
            resp.json().then(data => {
                    Swal.fire({
                    icon: 'success',
                    title: 'Successful !',
                    text: data.data+' Added Successfully !',
                    customClass: {
                    confirmButton: 'my-button-class'
                    },
                    buttonsStyling: false
                    });
                    });
        }else{
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'something went wrong!',
            });
        }
    
    }
    )
    .catch(error => {
    }
    );

}
const handleClickUsername = e => 
{
e.preventDefault();
addUser();
};

return (
<div className='login_main_container'>

<div className="login_form_container" >
<Card
sx={{width:'320px'}}
>
<CardContent className='title_container'>
<Typography className='title_container_text' gutterBottom variant="h4" component="div">
Add User
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
            <td><input type="username" onChange={e =>setUserName(e.target.value)}></input></td>
            </td>
        </tr>
        <tr>
            <td><label>password : </label></td>
            <td><input type="password" onChange={e =>setPassword(e.target.value)}></input></td>
        </tr>
        <tr>
            <td><label>email : </label></td>
            <td><input type="email" onChange={e =>setEmail(e.target.value)}></input></td>
        </tr>
        <tr>
            <td><label>role : </label></td>
            <td>
                <select onChange={e =>setRole(e.target.value)}>
                <option key={Math.random()}>ADMIN</option>
                <option key={Math.random()}>USER</option>
                </select>    
            </td>
        </tr>
        <tr>
            <td><label>nic : </label></td>
            <td><input type="text" onChange={e =>setNic(e.target.value)}></input></td>
        </tr>
    </table>

<div>
<FormControl sx={{ m: 1}} variant="outlined" size="small"  className='text_feild'>


</FormControl>
</div>
<div className = 'login_button_div'>
<button  className = 'login_button'type='submit'>Sing up</button>
</div>

</Box>

</CardContent>

</Card>
</div>

</div>
)
}

export default AddUser


