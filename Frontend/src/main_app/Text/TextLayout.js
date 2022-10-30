import { AppBar, Button, Card, IconButton, List, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
// import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { postData, ServerURL, postDataAndImage } from "../MongoDB/FetchNodeServices";
import _ from "lodash"
import SendIcon from '@mui/icons-material/Send';

export default function TextLayout(props)
{
    const [senderID,setSenderID] = useState('')
    const [receiverID,setReceiverID] = useState('')
    const [text,setText] = useState('')
    const [showTexts,setShowTexts] = useState([])
    const [showOtherTexts,setShowOtherTexts] = useState([])
    const [sortedTexts,setSortedTexts] = useState([])

    const [recName,setRecName] = useState('')
    const [name,setName] = useState('')

    const fetchTexts = async(sid,rid) => {

        var result=await postData('text/fetchtexts',{sid:sid,rid:rid})
        setShowTexts(result.result)

    }

    useEffect(()=>{

        dateTime()
        
    },[showTexts,showOtherTexts])

    const dateTime = () =>
    {
        const textsAll = _.concat(showTexts,showOtherTexts)

        const a = _.map(textsAll, function(element) 
        { 
            // var dateA = moment(element.createdAt).subtract(10, 'days').calendar()
            var dateB = element.createdAt
            var date = new Date(dateB)
            return _.extend({}, element, {date: date});
        });

        // console.log(a)
        const sortedDateList = a.sort(
            (objA, objB) => objA.date - objB.date,
          );


        setSortedTexts(sortedDateList)

    }

    const fetchOtherTexts = async(sid,rid) => {

        var result=await postData('text/fetchtexts',{sid:sid,rid:rid})
        setShowOtherTexts(result.result)

    }

    useEffect(() => {
        const interval = setInterval(() => {
            setReceiverID(props.user._id)
            setRecName(props.user.name)
            setSenderID(props.currentUser._id)
            setName(props.currentUser.name)

            fetchTexts(props.currentUser._id,props.user._id)
            fetchOtherTexts(props.user._id,props.currentUser._id)
            

        }, 1000);
        return () => clearInterval(interval);
      });

    const handleSend = async() => {

        var body =  {senderid:senderID,receiverid:receiverID,textcontent:text}
        var result=await postData('text/sendtext',body)

        setText('')
        
    }

    return(
        <div >

        <Box sx={{marginBottom:5}} color='#EDE9FE'>

            {sortedTexts.map((item)=>{

                if(item.senderid==senderID)
                {
                return(
                        <>
                        <Box sx={{marginLeft:'50vw',minHeight:'7vh',marginRight:'5vw'}}>
                            <Card sx={{backgroundColor:'transparent',padding:1,color:'#3949AB'}}>
                                {item.textcontent}
                            </Card>
                        </Box> 
                        </>
                    )
                }
                else
                {
                return(
                        <>
                        <Box sx={{marginRight:'55vw',marginLeft:'2vw',minHeight:'7vh'}}>
                        <Typography sx={{color:'#3949AB',fontSize:13}}>
                        {recName}
                        </Typography>
                            <Card sx={{padding:1,color:'#3949AB',backgroundColor:'#DBEAFE'}}>
                                {item.textcontent}
                            </Card>
                        </Box>
                        </>
                    )

                }    
            })
            
            }
 
        </Box>

        <AppBar position="fixed" color="primary" sx={{backgroundImage: `url("/white.png")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', top: 'auto', bottom: 0 }}>
          <Toolbar>

<TextField value={text} placeholder="Type Your Text Here . . ." onChange={(event)=>setText(event.target.value)} sx={{width:'100vw',marginLeft:'15vw'}} />
<IconButton sx={{marginLeft:2,color:'#312E81'}} disabled={text==""} variant="outlined" onClick={handleSend}><SendIcon sx={{fontSize:35}} /></IconButton>

          </Toolbar>
        </AppBar>
        </div>
    )
}