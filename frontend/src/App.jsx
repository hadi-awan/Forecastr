// Sets up React Router for navigation between different pages and applies Material UI theme

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from './components/Layout/Dashboard';

// Import pages to be created later
const DashboardPage = () => <div>Dashboard Content</div>;

// Create theme
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    color: '#333',
                },
            },
        },
    },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Dashboard>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </Dashboard>
      </Router>
    </ThemeProvider>
  );
}

export default App;