import { Box, Button, Card, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";

export default function HomePage(){

    return(
        <Box sx={{justifyContent:'center',alignItems:'center',display:"flex",marginLeft:'20vw'}}>

            <Box sx={{justifyContent:'center',alignItems:'center',display:"flex",marginTop:15}}>
                <Card sx={{backgroundColor:'#312E81',padding:1}}>
                    <Card sx={{backgroundColor:'#DBEAFE',padding:5}}>
                        <Stack direction="column" spacing={2} justifyContent="space-between">
                            <Box sx={{justifyContent:'center',alignItems:'center',display:"flex"}}>
                                <Card sx={{backgroundColor:'#312E81'}}>

                                    <img src="./textZone.png" />
                                
                                </Card>
                            </Box>
                            <Box sx={{justifyContent:'center',alignItems:'center',display:"flex"}}>
                                <Typography color='#312E81' style={{fontFamily:'monospace',fontSize:35}}>
                                    textZone
                                </Typography>
                            </Box>
                            <Typography color='#312E81' style={{fontSize:15}}>
                                A platform to get connected to your loved ones !
                            </Typography>
                        </Stack>
                    </Card>
                </Card>
            </Box>

        </Box>
    )
    

}