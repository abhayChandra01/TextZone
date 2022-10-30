import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Swal from 'sweetalert2';
import { ServerURL } from '../MongoDB/FetchNodeServices';
import TextLayout from '../Text/TextLayout';

export default function ListItems(props){

  const [userInfo,setUserInfo] = React.useState([])
  const [users, setUsers] = React.useState([])

    const handleClick=(v)=>{
        props.setView(v)

        Swal.fire({
          title: 'Loading the conversation. . .',
          imageUrl : '/loading.gif',
          imageWidth: 100,
          imageHeight: 100,
          width:'500',
          height:'400',
          timer:900,
          showConfirmButton:false,
        })


        
    }
    
    React.useEffect(()=>{

      setUsers(props.usersList)
      setUserInfo(props.userInfo)
    
    })

    return(
    <div>
      {  users.map((item, index) =>{ 

          return (<ListItem 
                  onClick={()=>handleClick(<TextLayout
                  user={item}
                  currentUser={userInfo}
                  />)}
                  button>
                    <ListItemIcon>
                      <img src={`${ServerURL}/images/${item.image}`} style={{width:30,height:30,borderRadius:50}}></img>

                    </ListItemIcon >
                    <ListItemText  primary={item.name} />
                  </ListItem>
                  )
      })}

  </div>
)
}