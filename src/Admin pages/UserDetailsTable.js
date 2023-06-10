import React, { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,} from '@mui/material';
import '../style/userdetails.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function UserDetailsTable() {

    const {auth} = useAuthContext();
    let logedUserName = auth.user?.username;
    let logedUserPwd = auth.user?.password;
    const navigate = useNavigate();
    const getAllUserDetails = () =>{
        fetch('http://localhost:8083/api/v1/users/getAllUsers',
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
            console.log(resp);
                if(resp.ok){
					resp.json().then(data => {
                    console.log(data.data);
                    setTableData(data.data);
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
        getAllUserDetails();
    }, []);
        

    const userDelete = (id) =>
        fetch('http://localhost:8083/api/v1/users/deleteUserByUserID?userID='+id,
                {
                    method :'DELETE',
                    header:{'Accept': 'application/json','Content-Type':'application/json'},
                    headers :{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + btoa(logedUserName + ':' + logedUserPwd)
                    }    
                }   
             )
            .then(resp => {
                console.log(resp);
                    if(resp.ok){
                        resp.json().then(data => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Successful !',
                                text: data.data+' Successfully !',
                                customClass: {
                                    confirmButton: 'my-button-class'
                                  },
                                  buttonsStyling: false
                              });
                        });           
                    }   else if(resp.status === 404){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error !',
                            text: 'User Not In Database !',
                            customClass: {
                                confirmButton: 'my-button-class'
                              },
                              buttonsStyling: false
                          });
                    }
                    else if(resp.status === 406){
                        Swal.fire({
                          icon: 'error',
                          title: 'Warning !',
                          text: "You Can't Remove an Admin!!!!",
                          customClass: {
                              confirmButton: 'my-button-class'
                            },
                            buttonsStyling: false
                        });
                        navigate('/user_Details');
                      }
                }
            )
            .catch(error => {
                }
            );
      const [tableData, setTableData] = useState([]);

      const handleDelete = (id) => {
        const updatedTableData = tableData.filter((row) => row.userID !== id);
        setTableData(updatedTableData);
        userDelete(id);
      };

  return (
    <div className="main_user_table_container">
        
        <div className="user_detail_table_div">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                    <TableRow className='table_row_user_table'>
                        <TableCell sx={{color: '#fff'}}>User ID</TableCell>
                        <TableCell sx={{color: '#fff'}}>User Name</TableCell>
                        <TableCell sx={{color: '#fff'}}>E-mail</TableCell>
                        <TableCell sx={{color: '#fff'}}>Role</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.userID}>
                        <TableCell>{row.userID}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>
                            <Button
                            variant="contained"
                            color="error"
                            endIcon ={<DeleteIcon/>}
                            onClick={() => handleDelete(row.userID)}
                            >
                            Delete
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default UserDetailsTable
