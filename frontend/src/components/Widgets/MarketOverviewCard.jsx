import { Card, CardContent, CardHeader, Typography, Grid, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const MarketIndexItem = ({ name, value, change, changePercent }) => {
    const isPositive = change >= 0;

    return (
        <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary"> {name} </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2" fontWeight="medium"> {value.toLocaleString()} </Typography>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isPositive ? (
                        <TrendingUpIcon fontSize="small" color="success" />
                    ) : (
                        <TrendingDownIcon fontSize="small" color="error" />
                    )}
                    <Typography variant="body2" color={isPositive ? 'success.main' : 'error.main'} sx={{ ml: 0.5 }}>
                        {change.toFixed(2)} ({changePercent.toFixed(2)}%)
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

const MarketOverviewCard = () => {
  // Mock data for market indices
    const marketIndices = [
        { name: 'S&P 500', value: 5120.37, change: 23.45, changePercent: 0.46 },
        { name: 'NASDAQ', value: 16204.89, change: 98.65, changePercent: 0.61 },
        { name: 'DOW JONES', value: 38985.42, change: -45.12, changePercent: -0.12 },
        { name: 'RUSSELL 2000', value: 2042.58, change: 12.84, changePercent: 0.63 },
    ];

    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader title="Market Overview" />
                <CardContent>
                    {marketIndices.map((index) => (
                        <MarketIndexItem
                            key={index.name}
                            name={index.name}
                            value={index.value}
                            change={index.change}
                            changePercent={index.changePercent}
                        />
                    ))}
                </CardContent>
        </Card>
  );
};

export default MarketOverviewCard;