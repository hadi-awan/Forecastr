import { Card, CardContent, CardHeader, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const TopMoversCard = () => {
    // Mock data for top gainers and losers
    const topGainers = [
        { symbol: 'AAPL', name: 'Apple Inc.', change: 5.23 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', change: 3.87 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', change: 2.95 },
    ];

    const topLosers = [
        { symbol: 'META', name: 'Meta Platforms Inc.', change: -4.12 },
        { symbol: 'TSLA', name: 'Tesla Inc.', change: -2.76 },
        { symbol: 'NFLX', name: 'Netflix Inc.', change: -1.89 },
    ];

    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader title="Top Movers" />
            <CardContent>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Top Gainers</Typography>
                <List dense disablePadding>
                    {topGainers.map((stock) => (
                        <ListItem key={stock.symbol} divider sx={{ py: 0.5 }}>
                            <ListItemText primary={stock.symbol}
                            secondary={stock.name}
                            primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ArrowUpwardIcon fontSize="small" color="success" />
                                <Typography color="success.main"> {stock.change.toFixed(2)}%</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>

                <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 2 }} gutterBottom>Top Losers</Typography>
                <List dense disablePadding>
                    {topLosers.map((stock) => (
                        <ListItem key={stock.symbol} divider sx={{ py: 0.5 }}>
                            <ListItemText
                                primary={stock.symbol}
                                secondary={stock.name}
                                primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ArrowDownwardIcon fontSize="small" color="error" />
                                <Typography color="error.main">{stock.change.toFixed(2)}%</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default TopMoversCard;