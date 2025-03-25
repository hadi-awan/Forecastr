import { useState } from 'react';
import { Card, CardContent, CardHeader, Box, ButtonGroup, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StockPriceChart = ({ data, symbol = 'AAPL', name = 'Apple Inc.' }) => {
  const [timeRange, setTimeRange] = useState('1M');

  // Mock data for chart
  const mockData = [
    { date: '2023-03-01', price: 150.34, volume: 82345678 },
    { date: '2023-03-02', price: 152.87, volume: 75638421 },
    { date: '2023-03-03', price: 151.03, volume: 65784321 },
    { date: '2023-03-06', price: 153.83, volume: 89473216 },
    { date: '2023-03-07', price: 156.12, volume: 92837421 },
    { date: '2023-03-08', price: 154.45, volume: 76543219 },
    { date: '2023-03-09', price: 153.91, volume: 65432198 },
    { date: '2023-03-10', price: 150.59, volume: 85432167 },
    { date: '2023-03-13', price: 152.59, volume: 72345678 },
    { date: '2023-03-14', price: 155.85, volume: 84567321 },
    { date: '2023-03-15', price: 157.83, volume: 93456721 },
    { date: '2023-03-16', price: 158.93, volume: 82345678 },
    { date: '2023-03-17', price: 160.11, volume: 91234567 },
    { date: '2023-03-20', price: 159.31, volume: 76543219 },
    { date: '2023-03-21', price: 161.45, volume: 87654321 },
    { date: '2023-03-22', price: 162.68, volume: 93456721 },
    { date: '2023-03-23', price: 162.36, volume: 78654321 },
    { date: '2023-03-24', price: 160.25, volume: 73456789 },
    { date: '2023-03-27', price: 159.98, volume: 64532198 },
    { date: '2023-03-28', price: 160.77, volume: 75643219 },
    { date: '2023-03-29', price: 163.76, volume: 89473216 },
    { date: '2023-03-30', price: 164.89, volume: 92837421 },
    { date: '2023-03-31', price: 166.02, volume: 86543219 },
  ];

  const chartData = data || mockData;

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={`${symbol} - ${name}`}
        action={
          <ButtonGroup size="small" aria-label="time range">
            <Button
              onClick={() => setTimeRange('1D')}
              variant={timeRange === '1D' ? 'contained' : 'outlined'}
            >
              1D
            </Button>
            <Button
              onClick={() => setTimeRange('1W')}
              variant={timeRange === '1W' ? 'contained' : 'outlined'}
            >
              1W
            </Button>
            <Button
              onClick={() => setTimeRange('1M')}
              variant={timeRange === '1M' ? 'contained' : 'outlined'}
            >
              1M
            </Button>
            <Button
              onClick={() => setTimeRange('3M')}
              variant={timeRange === '3M' ? 'contained' : 'outlined'}
            >
              3M
            </Button>
            <Button
              onClick={() => setTimeRange('1Y')}
              variant={timeRange === '1Y' ? 'contained' : 'outlined'}
            >
              1Y
            </Button>
          </ButtonGroup>
        }
      />
      <CardContent>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
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
              <Legend />
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
      </CardContent>
    </Card>
  );
};

export default StockPriceChart;