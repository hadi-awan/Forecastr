// Sets up React Router for navigation between different pages and applies Material UI theme

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from './components/Layout/Dashboard';

// Import pages to be created later
import DashboardPage from './pages/Dashboard';
const StockDetailPage = () => <div>Stock Detail Content</div>;
const MarketOverviewPage = () => <div>Market Overview Content</div>;
const PredictionsPage = () => <div>Predictions Content</div>;
const PortfolioPage = () => <div>Portfolio Content</div>;
const NewsPage = () => <div>News & Sentiment Content</div>;
const SettingsPage = () => <div>Settings Content</div>;

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
            <Route path="/stock/:symbol" element={<StockDetailPage />} />
            <Route path="/market" element={<MarketOverviewPage />} />
            <Route path="/predictions" element={<PredictionsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Dashboard>
      </Router>
    </ThemeProvider>
  );
}

export default App;