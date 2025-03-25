import { Grid, Typography, Box, Paper } from '@mui/material';
import StockPriceChart from '../components/Charts/StockPriceChart';
import MarketOverviewCard from '../components/Widgets/MarketOverviewCard';
import TopMoversCard from '../components/Widgets/TopMoversCard';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom fontWeight="medium">
        Dashboard
      </Typography>

      <Grid container spacing={3}>
            {/* Main Chart - Featured Stock */}
            <Grid item xs={12} lg={8}>
                <StockPriceChart />
            </Grid>

            {/* Market Overview */}
            <Grid item xs={12} md={6} lg={3}>
              <MarketOverviewCard />
            </Grid>

            {/* Top Movers */}
            <Grid item xs={12} md={6} lg={3}>
              <TopMoversCard />
            </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;