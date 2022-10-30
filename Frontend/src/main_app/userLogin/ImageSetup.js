import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Avatar } from "@mui/material";
import _ from 'lodash'
import { postData, ServerURL, postDataAndImage } from "../MongoDB/FetchNodeServices";
import {useLocation} from 'react-router-dom';


export default function ImageSetup(){

    const location = useLocation();

    const navigate = useNavigate()
    const [number,setNumber] = useState('')
    const [msg,setMsg] = useState('')
    const [image,setImage] = useState({bytes:'',file:'./profile.png'})
    
    const [users, setUsers] = useState([])


    const handleImage=(event)=>{
        if(event.target.files.length){
        setImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        }
    }

    const handleUpload = async() => {

        var formData=new FormData()

        formData.append('number',number)
        formData.append('image',image.bytes)

        var result=await postDataAndImage('usersinfo/addimage',formData)
        // console.log(result)
        if (result.result)
        {
            navigate('/dashboard',{state : number})
            Swal.fire({
                title: 'SUCCESS',
                text: 'Image Added Successfully !',
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

    
    useEffect(()=>{
        // const num = JSON.parse(localStorage.getItem('NUMBER'));
        // if (num) {
        // setNumber(num);
        // }

        const num = location.state
        if(num)
        {
            setNumber(num)    
        }
        else
        {
            Swal.fire({
                title: 'Please Login !',
                icon:'warning',
                width:'500',
                height:'400',
                timer:900,
                showConfirmButton:false,
              })
        
            navigate('/')
        }  

    },[])


    return(
        <Box>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box  my={20} mx={5} flex={1.5}>

                    <Card sx={{backgroundColor:'transparent',padding:1,color:'#3949AB'}}>
                        <Grid container spacing={2}>

                            <Grid sx={{display:'flex',justifyContent:'left',alignItems:'left'}} item xs={12}>

                                <Typography color='#3949AB' sx={{fontFamily:'sans-serif',fontSize:20}}>
                                    Great !
                                    <br />
                                    Please Upload Your Profile Image.
                                </Typography>

                            </Grid>

                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <Avatar
                                alt="Upload Image"
                                variant="rounded"
                                src={image.file}
                                sx={{ width: 150,height: 150}}
                                />

                            </Grid>
                    
                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <Button fullWidth component="label">
                                    Upload
                                    <input hidden onChange={(event)=>handleImage(event)} accept="image/*" multiple type="file" />
                                </Button>
                            </Grid>

                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <Button variant="outlined" disabled={image==""} onClick={handleUpload} fullWidth>Save Image</Button>
                    
                            </Grid>

                        </Grid>
                    </Card>
            
                </Box>
        
                <Box px={5} sx={{minHeight:'100vh',justifyContent:'center',alignItems:'center',display:{xs:'none',sm:'none',md:'none',lg:'flex'}}} bgcolor='#312E81' flex={3}>

                    <Box sx={{justifyContent:'center',alignItems:'center',display:"flex"}}>
                        <img src="./textZone.png" />
                        <Typography color='#DBEAFE' style={{fontFamily:'monospace',fontSize:35}}>
                            textZone
                        </Typography>

                    </Box>
                </Box>
            
            </Stack>

        </Box>
    )
    

}