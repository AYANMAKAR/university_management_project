import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, createTheme, ThemeProvider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
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
                            backgroundColor: location.pathname === ("/" || "/Admin/dashboard") ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home"  
                        primaryTypographyProps={{
                        color: location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit',
                        fontWeight: location.pathname === ("/" || "/Admin/dashboard") ? 'bold' : 'inherit',
                        variant: 'body2',
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Admin/classes" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Admin/classes') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Admin/classes') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Admin/subjects" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Admin/subjects') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Admin/subjects') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Admin/subjects') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Admin/teachers" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Admin/teachers') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Admin/teachers') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Admin/teachers') ? 'bold' : 'inherit',
                        variant: 'body2'
                        }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Admin/students" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Admin/students') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Admin/students') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Admin/students') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Admin/notices" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Admin/notices') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Admin/notices') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Admin/notices') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>

                <ListItemButton component={Link} to="/Admin/complains" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Admin/complains') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Admin/complains') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Admin/complains') ? 'bold' : 'inherit',
                        variant: 'body2'
                    }}/>
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }}  />
            <React.Fragment>
                <ListSubheader component="div" inset >
                    User
                </ListSubheader>

                <ListItemButton component={Link} to="/Admin/profile" sx={{
                            '&:hover': {
                                backgroundColor: '#080a43',
                                color:'#fff',
                            },
                            backgroundColor: location.pathname === ('/Admin/profile') ? '#080a43' : 'inherit', 
                        }}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" 
                        primaryTypographyProps={{
                        color: location.pathname.startsWith('/Admin/profile') ? 'primary' : 'inherit',
                        fontWeight: location.pathname.startsWith('/Admin/profile') ? 'bold' : 'inherit',
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

export default SideBar
