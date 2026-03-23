
import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, createTheme, ThemeProvider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';

const TeacherSideBar = () => {
     const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teach_sclass
    
   const location = useLocation();

    
    return (
        <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {           
            primary: { main: '#fff' },
            
          },
        })}
      >
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ("/" || "/Teacher/dashboard") ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home"  
                        primaryTypographyProps={{
                        color: location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit',
                        fontWeight: location.pathname === ("/" || "/Teacher/dashboard") ? 'bold' : 'inherit',
                        variant: 'body2',
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Teacher/class" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Teacher/class') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/class") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={`Class ${sclassName?.sclass_name || 'N/A'}`} 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Teacher/class') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Teacher/class') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Teacher/complain" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Teacher/complain') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Teacher/complain') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Teacher/complain') ? 'bold' : 'inherit',
                        variant: 'body2'
                        }}/>
                </ListItemButton>

                
               

                
            </React.Fragment>
            <Divider sx={{ my: 1 }}  />
            <React.Fragment>
                <ListSubheader component="div" inset >
                    User
                </ListSubheader>

                <ListItemButton component={Link} to="/Teacher/profile" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Teacher/profile') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Teacher/profile') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Teacher/profile') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/logout" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/logout') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/logout') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/logout') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>
            </React.Fragment>
        </>
        </ThemeProvider>
    )
}

export default TeacherSideBar
