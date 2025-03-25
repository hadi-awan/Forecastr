// The main layout component that includes the:
// 1) Header
// 2) Sidebar
// 3) Main content area

import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';

// Styled custom component for main context
// Args:
// 1) 'main' is the HTML element (a <main> tag) that will be styled
// 2) a callback function that provides the theme and props, allowing dynamic styling

// open: controls whether sidebar is open or closed which adjusts marginLeft of Main content
// drawerWidth: width of sidebar (drawer) which is used to adjust margin of Main content
// theme: gives access to Material-UI's theme
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, drawerWidth }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: '-${drawerWidth}px',
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

// Functional react component that takes children as a prop
// Manages the sidebar's state (open or closed) with the useState hook
const Dashboard = ({ children }) => {
    // sidebar is initially open
    const[open, setOpen] = useState(true);

    // width of sidebar
    const drawerWidth = 240;

    // toggles the open state when called
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <Sidebar open={open} drawerWidth={drawerWidth} />
            <Main open={open} drawerWidth={drawerWidth}>
                <Box component="div" sx={{ mt: 8, p: 2 }}>
                    {children}
                </Box>
            </Main>
        </Box>
    );
};

export default Dashboard;