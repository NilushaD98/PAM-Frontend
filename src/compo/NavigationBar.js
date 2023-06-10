import React from 'react'
import '../style/navBar.css'
import IsLogging from '../Client page/LoginPage'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import Swal from 'sweetalert2';

export default function NavigationBar() {

    const {auth, dispatch} = useAuthContext();

    const navigate = useNavigate();

    const handleLogout = () => {
        handleClickLogout();
        dispatch({type: 'LOGOUT_SUCCESS'});
        navigate('/');
        
    }

  const handleClickLogout = () =>
  {
    fetch('http://localhost:8083/api/v1/logout',
            {
                method :'GET',
                header:{'Accept': 'application/json','Content-Type':'application/json'},
            }   
        )
        .then(resp => {
                if(resp.status === 204){
                  IsLogging = false;
                  Navigate('/login');
                  Swal.fire({
                    icon: 'success',
                    title: 'Successful !',
                    text:' Logout Successfully !',
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
        console.log(IsLogging);
  }
  return (
    <div className='nav_main_container'>
        <div className="navigation_container">
            <div className="logo_container">
               
            </div>

            <div className="link_container">
                 <ul>
                    
                  
                    {/* only show after authenticated */}
                    {auth?.isAuthenticated  &&(<li><Link to='/AddUser'>Add User</Link></li>)}
                    {auth?.isAuthenticated  &&(<li><Link to='/addMachine'>Add Machine</Link></li>)}
                    {auth?.isAuthenticated  && (<li><Link to='/userGetDetails'>User Details</Link></li>)}
                    {auth?.isAuthenticated  && (<li><Link to='/machineDetails'>Machine Details</Link></li>)}
                   

                    {!auth?.isAuthenticated && (<li sx={{marginLeft:'300px'}}><Link to='/login'>Login</Link></li>)}

                    {auth?.isAuthenticated &&(<li><button onClick={handleLogout} style={{background: 'transparent', border: 'none', color: '#fff'}} >Logout</button></li>)}
                 </ul>
            </div>
        </div>        
    </div>
  )
}
