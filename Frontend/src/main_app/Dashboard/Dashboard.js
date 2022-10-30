import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItems from './ListItems';

import { useEffect , useState } from "react";
import { postData } from "../MongoDB/FetchNodeServices";
import HomePage from "./HomePage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import _ from 'lodash'
import { ServerURL } from "../MongoDB/FetchNodeServices";

import {useLocation} from 'react-router-dom'
import { Avatar } from '@mui/material';
import EditProfile from '../userLogin/EditProfile';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();
  const navigate = useNavigate()


  const [viewContainer,setViewContainer] = React.useState(<HomePage />)
  const [userInfo,setUserInfo] = React.useState([])
  const [usersList,setUsersList] = React.useState([])
  const [number,setNumber] = React.useState('')
  const [refresh,setRefresh] = React.useState(true)

  const refreshPage = () => {

    setRefresh(!refresh)

  }

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openD = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 

  const setView=(view)=>{
    setAnchorEl(null);
    setViewContainer(view)

  }

  useEffect(()=>{

    
    // const num = JSON.parse(localStorage.getItem('NUMBER'));
    // setNumber(num)
    const num = location.state
    // console.log(num);
        if(num)
        {
          Swal.fire({
              title: 'Loading. . .',
              imageUrl : '/loading.gif',
              imageWidth: 100,
              imageHeight: 100,
              width:'500',
              height:'400',
              timer:900,
              showConfirmButton:false,
            })
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
        getUserByNumber(num)
        getUsersExceptOne(num)

},[])

const getUserByNumber = async(num) => {

    var body = {number : num}
    var result = await postData('usersinfo/getuserbynumber',body)
    if(result.result)
    {
        setUserInfo(result.result[0])
        // console.log(result.result[0])
    }


}

const getUsersExceptOne = async(num) => {

    var result = await postData('usersinfo/getuserexceptone',{number:num})
    if(result.result)
    {
        setUsersList(result.result)
        // console.log(result.result)
    }        



}

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar style={{backgroundImage: `url("/bg.png")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',}} position="absolute" open={open}>
          <Toolbar
            sx={{
            
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="default"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                color : '#DBEAFE',
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <img style={{height:30,width:30}} src="./textZone.png" />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="#fff"
              noWrap 
              sx={{ flexGrow: 1 }}
              
            >
              textZone
            </Typography>
            {userInfo.name}
            <IconButton
            aria-controls={openD ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openD ? 'true' : undefined}
            onClick={handleMenu} aria-label="Account"
            >
               
              <Avatar
              alt="Upload Image"
              variant="rounded"
              src={`${ServerURL}/images/${userInfo.image}`}
              sx={{ width: 40,height: 40, borderRadius:50}}
              />
                
            </IconButton>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openD}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
              <MenuItem  onClick={()=>setView(<EditProfile
              currentUser={userInfo}
              refresh={refreshPage}
              />)} >Profile</MenuItem>
              <MenuItem onClick={()=>navigate('/')}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
          style={{backgroundImage: `url("/bgdrawer.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <img style={{height:30,width:30}} src="./textZoneContrast.png" />
            </IconButton>
          </Toolbar>
          <Divider />
          <ListItems
           userInfo = {userInfo}
           usersList = {usersList}
           setView={setView} />
        </Drawer>
        <Box
          component="main"
            
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container  maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid  container spacing={3}>
                {viewContainer}
            </Grid>
          </Container>
        </Box>
      </Box>
      
    </ThemeProvider>
  );
}

export default function Dashboard() {

  return <DashboardContent />;
}