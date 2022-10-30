import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import _ from 'lodash'
import { postData, ServerURL, postDataAndImage } from "../MongoDB/FetchNodeServices";
import {useLocation} from 'react-router-dom';


export default function ProfileSetup(){

    const location = useLocation();

    const navigate = useNavigate()
    const [number,setNumber] = useState('')
    const [name,setName] = useState('')
    const [msg,setMsg] = useState('')
    const [image,setImage] = useState(' ')
    
    const handleCreate = async() =>{
        
        var body =  {name:name,number:number,image:image}
        var result=await postData('usersinfo/adduser',body)
        // console.log(result)
        if (result.result)
        {
            navigate('/imagesetup',{state : number})
            Swal.fire({
                title: 'SUCCESS',
                text: 'User Profile Created Successfully !',
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
                <Box  my={25} mx={5} flex={1.5}>

                    <Card sx={{backgroundColor:'transparent',padding:1,color:'#3949AB'}}>
                        <Grid container spacing={2}>

                            <Grid sx={{display:'flex',justifyContent:'left',alignItems:'left'}} item xs={12}>

                                <Typography color='#3949AB' sx={{fontFamily:'sans-serif',fontSize:20}}>
                                    Hello There!
                                    <br />
                                    Please Set Up Your Profile.
                                </Typography>

                            </Grid>

                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <TextField fullWidth id="outlined-basic" onChange={(event)=>setName(event.target.value)} label="Enter Your Name" variant="outlined" />
                            </Grid>
                    
                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <Button variant="outlined" onClick={handleCreate} fullWidth>Create Profile</Button>
                            </Grid>


                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <Typography color='#3949AB' sx={{fontFamily:'sans-serif',fontSize:20}}>
                                    {msg}
                                </Typography>
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