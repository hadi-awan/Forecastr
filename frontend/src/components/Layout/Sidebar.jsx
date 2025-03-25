// A collapsible navigation drawer with menu items for all main sections of app

import { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

// Material UI components used to construct sidebar layout and provide functionality
import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box,
    Typography
} from '@mui/material';

// Creating styled custom components
import { styled } from '@mui/material/styles';

// Importing icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InsightsIcon from '@mui/icons-material/Insights';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// A styled box component representing logo of sidebar
const LogoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 1),
    ...theme.mixins.toolbar,
}));

// Component that renders a persistent drawer with a list of navigation items including:
// 1) Dashboard
// 2) Stock Section (Market Overview, Predictions)
// 3) Portfolio
// 4) News & Sentiment
// 5) Section
const Sidebar = ({ open, drawerWidth }) => {
    // Provides a function to programmatically navigate to different routes
    const navigate = useNavigate();

    // Gives us access to the current URL path so we can highlight the active menu item
    const location = useLocation();

    // Market Overview and Predictions items are initially open
    const [stocksOpen, setStocksOpen] = useState(true);

    // toggles the state when called
    const handleStocksClick = () => {
        setStocksOpen(!stocksOpen);
    };

    // uses the navigate function to route to different pages when menu items are clicked
    const handleNavigation = (path) => {
        navigate(path);
    };

    // Component used to create sidebar, persistent drawer
    // onClick handlers to each ListItemButton that call handleNavigation with the appropriate route path
    // selected prop that highlights the current active route based on the current URL path
    const drawerContent = (
    <>
      <LogoBox>
        <ShowChartIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" color="primary" fontWeight="bold">
          Forecastr
        </Typography>
      </LogoBox>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/')}
            selected={location.pathname === '/'}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleStocksClick}>
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary="Stocks" />
            {stocksOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={stocksOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => handleNavigation('/market')}
              selected={location.pathname === '/market'}
            >
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="Market Overview" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => handleNavigation('/predictions')}
              selected={location.pathname === '/predictions'}
            >
              <ListItemIcon>
                <InsightsIcon />
              </ListItemIcon>
              <ListItemText primary="Predictions" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/portfolio')}
            selected={location.pathname === '/portfolio'}
          >
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Portfolio" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/news')}
            selected={location.pathname === '/news'}
          >
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText primary="News & Sentiment" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/settings')}
            selected={location.pathname === '/settings'}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;