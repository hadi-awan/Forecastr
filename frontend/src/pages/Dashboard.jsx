import { Grid, Typography, Box, Paper } from '@mui/material';
import MarketOverviewCard from '../components/Widgets/MarketOverviewCard';
import TopMoversCard from '../components/Widgets/TopMoversCard';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom fontWeight="medium">
        Dashboard
      </Typography>

        {/* Market Overview */}
        <Grid item xs={12} md={6} lg={3}>
          <MarketOverviewCard />
        </Grid>

        {/* Top Movers */}
        <Grid item xs={12} md={6} lg={3}>
          <TopMoversCard />
        </Grid>
    </Box>
  );
};

export default Dashboard;