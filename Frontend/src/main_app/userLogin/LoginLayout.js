import { Box, Button, Card, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setUpRecaptcha } from '../Firebase/firebaseContext' 
import _ from 'lodash'
import { postData, ServerURL, postDataAndImage , getData } from "../MongoDB/FetchNodeServices";


export default function LoginLayout(){

    const navigate = useNavigate()
    const [number,setNumber] = useState('')
    const [OTP,setOTP] = useState('')
    const [OTPInput,setOTPInput] = useState(false)
    const [loginButton,setLoginButton] = useState(false)
    const [captchaContainer,setCaptchaContainer] = useState(false)
    const [confirmObj,setConfirmObj] = useState('')
    const [msg,setMsg] = useState('')

    const [users, setUsers] = useState([])

    const handleLogin = async() =>{
        setLoginButton(true)
        const num = '+91'+number
        try{
            setMsg('')
            const response = await setUpRecaptcha(num)
            // console.log(response)
            setConfirmObj(response)
            setOTPInput(true)
            setCaptchaContainer(true)
        }
        catch (err) {
            setMsg('Something Went Wrong ! ')
            console.log(err)
        }
    
    }

    const otpVerification = async() =>{

        try{
            await confirmObj.confirm(OTP)
            setMsg('')
            checkUser()            
        }
        catch(err)
        {
            setMsg('Invalid Input ! ')
            console.log(err)
        }


    }

    const checkUser = () => {
        
        const num = number
        const field = {number : num }
        const check = _.find(users , field)

        // localStorage.setItem("NUMBER",JSON.stringify(num))
        
        if (check==undefined)
        {
            navigate('/profilesetup',{state : number})
        }
        else
        {
            navigate('/dashboard',{state : number})
        }

    }
    
    const fetchUsers = async() => {
        
        var result=await getData("usersinfo/getallusers")
        setUsers(result.result)


    }

    useEffect(()=>{

        fetchUsers()
       
        

    },[])


    return(
        <Box>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box  my={25} mx={5} flex={1.5}>

                    <Card sx={{backgroundColor:'transparent',padding:1,color:'#3949AB'}}>
                        <Grid container spacing={2}>

                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center'}} item xs={12}>

                                <Typography color='#3949AB' sx={{fontFamily:'sans-serif',fontSize:20}}>
                                    <Card sx={{backgroundColor:'transparent',padding:1,color:'#3949AB'}}>
                                        LOGIN / SIGN UP 
                                    </Card>
                                </Typography>

                            </Grid>

                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <TextField fullWidth id="outlined-basic" onChange={(event)=>setNumber(event.target.value)} label="Enter Your Mobile Number" variant="outlined" />
                            </Grid>

                            {captchaContainer?
                            <>
                            </>
                            :
                            <>
                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <div id='recaptcha-container' />
                            </Grid>
                            </>
                            }

                            {OTPInput?
                            <>
                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <TextField fullWidth id="outlined-basic" onChange={(event)=>setOTP(event.target.value)} label="Enter The OTP" variant="outlined" />
                            </Grid>
                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <Button variant="outlined" onClick={otpVerification} fullWidth>Check OTP</Button>
                            </Grid>
                            </> 
                            : 
                            <>
                            <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:{xs:2,sm:10,md:15,lg:2},marginLeft:{xs:2,sm:10,md:15,lg:2}}} item xs={12}>
                                <Button disabled={loginButton} variant="outlined" onClick={handleLogin} fullWidth>Login</Button>
                            </Grid>
                            </>
                            }

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