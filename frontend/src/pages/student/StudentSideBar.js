import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, createTheme, ThemeProvider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
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
                            backgroundColor: location.pathname === ("/" || "/Student/dashboard") ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Student/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home"  
                        primaryTypographyProps={{
                        color: location.pathname === ("/" || "/Student/dashboard") ? 'primary' : 'inherit',
                        fontWeight: location.pathname === ("/" || "/Student/dashboard") ? 'bold' : 'inherit',
                        variant: 'body2',
                    }}/>
                </ListItemButton>


                <ListItemButton component={Link} to="/Student/subjects" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Student/subjects') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Student/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Student/subjects') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Student/subjects') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Student/attendance" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Student/attendance') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Student/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Student/attendance') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Student/attendance') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Student/complain" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Student/complain') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Student/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Student/complain') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Student/complain') ? 'bold' : 'inherit',
                        variant: 'body2'
                        }}/>
                </ListItemButton>

                
               

                
            </React.Fragment>
            <Divider sx={{ my: 1 }}  />
            <React.Fragment>
                <ListSubheader component="div" inset >
                    User
                </ListSubheader>

                <ListItemButton component={Link} to="/Student/profile" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Student/profile') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Student/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Student/profile') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Student/profile') ? 'bold' : 'inherit',
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

export default StudentSideBar
