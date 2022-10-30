import { Avatar, Box, Button, Card, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postData, ServerURL } from "../MongoDB/FetchNodeServices";

export default function EditProfile(props){

    const navigate = useNavigate()

    const [userInfo , setUserInfo] = useState([])
    const [id , setID] = useState(props.currentUser._id)
    const [name , setName] = useState(props.currentUser.name)
    const [number , setNumber] = useState(props.currentUser.number)
    const [editNameState , setEditNameState] = useState(false)
    const [editNumState , setEditNumState] = useState(false)

    useEffect(()=>{

        setUserInfo(props.currentUser)
    
    })

    const handleEditNameState = () => {
    
    setEditNameState(true)
    setEditNumState(false)

    }
    
    const handleEditNumState = () => {
    
    setEditNumState(true)
    setEditNameState(false)

    }

    const refresh = () => {

        props.refresh()
    }

    const saveChanges = async() => {

        var body = {id : id , name : name}
        var result=await postData('usersinfo/editusername',body)
        refresh()
        setEditNameState(false)
        if(result.result)
        {
            Swal.fire({
                title: 'SUCCESS',
                text: 'Name Edited Successfully !',
                icon: 'success',
                width:'600',
                height:'400',
              })
        }
        else
        {
            Swal.fire({
                title: 'ERROR',
                text: 'Something Went Wrong !',
                icon: 'error',
                width:'600',
                height:'400',
              })

        }

    }

    const saveNumChanges = async() => {

        
    }


    return(
        <Box>
            
            <Stack direction="column" spacing={2} justifyContent="space-between">
                <Box my={7} mx={10}>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Box>
                            <Avatar
                            alt="Upload Image"
                            variant="rounded"
                            src={`${ServerURL}/images/${userInfo.image}`}
                            sx={{ width: 300,height: 300, borderRadius:50}}
                            />
                        </Box>
                        <Box>
                            <Button variant="outlined" sx={{marginLeft:7}}>Edit Your Profile Picture</Button>
                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <Typography
                    color="#312E81"
                    sx={{ fontSize:30 }}
                    >

                    {editNameState ? 
                        <>
                            <TextField value={name} onChange={(event)=>setName(event.target.value)} variant="outlined" />
                            <Button variant="outlined" sx={{marginLeft:7}} onClick={()=>saveChanges()}>Save Changes</Button>
                        </> 
                        : 
                        <>
                            {userInfo.name}
                            <Button variant="outlined" sx={{marginLeft:7}} onClick={handleEditNameState}>Edit Name</Button>
                        </>
                    }
                     
                     
                     
                    </Typography>
                    <Typography
                    color="#312E81"
                    sx={{ fontSize:20 , marginTop:3 }}
                    >
                
                    {editNumState ? 
                        <>
                            <TextField value={number} onChange={(event)=>setNumber(event.target.value)} variant="outlined" />
                            <Button variant="outlined" sx={{marginLeft:7}} onClick={()=>saveNumChanges()}>Save Changes</Button>
                        </> 
                        : 
                        <>
                        {userInfo.number}
                            <Button variant="outlined" sx={{marginLeft:7}} onClick={handleEditNumState}>Edit Number</Button>
                        </>
                    }
            
                    </Typography>
                </Box>
            
            </Stack>

        </Box>
    )
    

}