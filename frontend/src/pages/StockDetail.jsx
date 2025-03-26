import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StockPriceChart from '../components/Charts/StockPriceChart';
import PredictionCard from '../components/Widgets/PredictionCard';
import NewsCard from '../components/Widgets/NewsCard';

// Mock stock data (would come from API)
const stockData = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 166.02,
    change: 1.32,
    changePercent: 0.8,
    marketCap: '2.63T',
    peRatio: 27.4,
    dividend: 0.92,
    dividendYield: 0.55,
    volume: '62.74M',
    avgVolume: '59.91M',
    high52Week: 198.23,
    low52Week: 124.17,
    open: 164.70,
    previousClose: 164.70,
    beta: 1.28,
    eps: 6.06,
    sector: 'Technology',
    industry: 'Consumer Electronics',
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 289.45,
    change: -1.23,
    changePercent: -0.42,
    marketCap: '2.15T',
    peRatio: 31.2,
    dividend: 2.72,
    dividendYield: 0.94,
    volume: '23.45M',
    avgVolume: '28.32M',
    high52Week: 305.20,
    low52Week: 213.43,
    open: 290.68,
    previousClose: 290.68,
    beta: 0.93,
    eps: 9.28,
    sector: 'Technology',
    industry: 'Software—Infrastructure',
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 188.52,
    change: 3.67,
    changePercent: 1.99,
    marketCap: '598.01B',
    peRatio: 53.87,
    dividend: 0,
    dividendYield: 0,
    volume: '96.35M',
    avgVolume: '105.73M',
    high52Week: 364.07,
    low52Week: 152.31,
    open: 184.85,
    previousClose: 184.85,
    beta: 2.04,
    eps: 3.50,
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
  },
};

const StockDetail = () => {
  const { symbol } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch stock data
    setLoading(true);

    setTimeout(() => {
      if (stockData[symbol]) {
        setStock(stockData[symbol]);
        setError(null);
      } else {
        setStock(null);
        setError(`Stock with symbol ${symbol} not found`);
      }
      setLoading(false);
    }, 500); // Simulate network delay

  }, [symbol]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleWatchlist = () => {
    setInWatchlist(!inWatchlist);
    // In a real app, this would call an API to add/remove from watchlist
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading stock data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <Box sx={{ p: 3 }}>
      {/* Stock Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {stock.name} ({stock.symbol})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stock.sector} • {stock.industry}
            </Typography>
          </Box>
          <IconButton onClick={toggleWatchlist} color="primary">
            {inWatchlist ? <StarIcon /> : <StarOutlineIcon />}
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 2 }}>
          <Typography variant="h5" component="span" fontWeight="medium">
            ${stock.price.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {isPositive ? (
              <TrendingUpIcon fontSize="small" color="success" />
            ) : (
              <TrendingDownIcon fontSize="small" color="error" />
            )}
            <Typography
              variant="body1"
              color={isPositive ? 'success.main' : 'error.main'}
              sx={{ ml: 0.5 }}
            >
              {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            Today
          </Typography>
        </Box>
      </Box>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="stock detail tabs">
          <Tab label="Overview" />
          <Tab label="Charts" />
          <Tab label="Financials" />
          <Tab label="News" />
          <Tab label="Predictions" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Main Chart */}
          <Grid item xs={12} md={8}>
            <StockPriceChart symbol={stock.symbol} name={stock.name} />
          </Grid>

          {/* Stock Info */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Stock Information" />
              <CardContent>
                <TableContainer component={Paper} elevation={0}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">Market Cap</TableCell>
                        <TableCell align="right">{stock.marketCap}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">P/E Ratio</TableCell>
                        <TableCell align="right">{stock.peRatio}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Dividend</TableCell>
                        <TableCell align="right">
                          {stock.dividend > 0 ? `$${stock.dividend} (${stock.dividendYield}%)` : 'N/A'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Volume</TableCell>
                        <TableCell align="right">{stock.volume}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Avg. Volume</TableCell>
                        <TableCell align="right">{stock.avgVolume}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">52 Week High</TableCell>
                        <TableCell align="right">${stock.high52Week.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">52 Week Low</TableCell>
                        <TableCell align="right">${stock.low52Week.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Open</TableCell>
                        <TableCell align="right">${stock.open.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Previous Close</TableCell>
                        <TableCell align="right">${stock.previousClose.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Beta</TableCell>
                        <TableCell align="right">{stock.beta}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">EPS</TableCell>
                        <TableCell align="right">${stock.eps}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Prediction Card */}
          <Grid item xs={12} md={6}>
            <PredictionCard symbol={stock.symbol} name={stock.name} />
          </Grid>

          {/* News Card */}
          <Grid item xs={12} md={6}>
            <NewsCard stockSymbol={stock.symbol} />
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>Advanced Charts</Typography>
          <Typography>
            This tab would contain more detailed technical charts with indicators and customization options.
          </Typography>
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>Financial Information</Typography>
          <Typography>
            This tab would contain financial statements, earnings reports, and other fundamental data.
          </Typography>
        </Box>
      )}

      {tabValue === 3 && (
        <Box>
          <Typography variant="h6" gutterBottom>News & Events</Typography>
          <NewsCard stockSymbol={stock.symbol} />
        </Box>
      )}

      {tabValue === 4 && (
        <Box>
          <Typography variant="h6" gutterBottom>Detailed Predictions</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <PredictionCard symbol={stock.symbol} name={stock.name} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title="Prediction Models" />
                <CardContent>
                  <Typography variant="body2" paragraph>
                    Our predictions use ensemble models combining several approaches:
                  </Typography>
                  <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
                    <li>Time series analysis (ARIMA)</li>
                    <li>Machine learning models (LSTM)</li>
                    <li>Sentiment analysis of news</li>
                    <li>Technical indicators</li>
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight="medium">
                      Model Performance:
                    </Typography>
                    <Typography variant="body2">
                      Historical accuracy: 78% for 14-day predictions
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default StockDetail;