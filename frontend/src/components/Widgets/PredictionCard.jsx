import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const PredictionCard = ({ symbol = 'AAPL', name = 'Apple Inc.' }) => {
    // Mock data for predictions
    const currentPrice = 166.02;
    const predictedPrice = 178.45;
    const predictedChange = ((predictedPrice - currentPrice) / currentPrice) * 100;
    const isPositive = predictedChange > 0;

    const mockData = [
        { date: '2023-03-31', price: 166.02, predicted: null },
        { date: '2023-04-03', price: null, predicted: 167.85 },
        { date: '2023-04-04', price: null, predicted: 169.23 },
        { date: '2023-04-05', price: null, predicted: 170.15 },
        { date: '2023-04-06', price: null, predicted: 171.78 },
        { date: '2023-04-07', price: null, predicted: 173.45 },
        { date: '2023-04-10', price: null, predicted: 174.67 },
        { date: '2023-04-11', price: null, predicted: 175.89 },
        { date: '2023-04-12', price: null, predicted: 177.12 },
        { date: '2023-04-13', price: null, predicted: 178.45 },
    ];

    return (
        <Card sx={{ height: '100%' }}>
          <CardHeader title={`${symbol} Prediction (14-day)`} />
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" fontWeight="medium">
                ${predictedPrice.toFixed(2)}
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
                  {predictedChange.toFixed(2)}%
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Predicted price in 14 days based on historical data and market trends.
            </Typography>

            <Box sx={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(tick) => {
                      const date = new Date(tick);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Price']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <ReferenceLine x="2023-03-31" stroke="#666" strokeDasharray="3 3" label="Today" />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#1976d2"
                    dot={false}
                    name="Historical"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#9c27b0"
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Confidence Level:</Typography>
                <Typography variant="body2" fontWeight="medium">85%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Based on:</Typography>
                <Typography variant="body2" fontWeight="medium">Technical Analysis, News Sentiment</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Prediction Range:</Typography>
                <Typography variant="body2" fontWeight="medium">${(predictedPrice - 5).toFixed(2)} - ${(predictedPrice + 5).toFixed(2)}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
  );
};

export default PredictionCard;