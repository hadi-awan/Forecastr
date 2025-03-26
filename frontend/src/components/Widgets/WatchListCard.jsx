import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  Box,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Tooltip
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const WatchlistCard = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');

  // Mock watchlist data
  const [watchlistItems, setWatchlistItems] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 166.02, change: 1.32, changePercent: 0.8 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 289.45, change: -1.23, changePercent: -0.42 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 104.78, change: 0.56, changePercent: 0.54 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 98.17, change: -0.76, changePercent: -0.77 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 188.52, change: 3.67, changePercent: 1.99 },
  ]);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewSymbol('');
  };

  const handleAddSymbol = () => {
    if (newSymbol.trim() !== '') {
      // In a real implementation, this would fetch stock data from an API
      const newStock = {
        symbol: newSymbol.toUpperCase(),
        name: `${newSymbol.toUpperCase()} Inc.`, // Placeholder name
        price: 100 + Math.random() * 100, // Random price for demo
        change: (Math.random() * 6) - 3, // Random change between -3 and +3
        changePercent: (Math.random() * 3) - 1.5, // Random percent change
      };

      setWatchlistItems([...watchlistItems, newStock]);
      handleCloseAddDialog();
    }
  };

  const handleRemoveSymbol = (symbolToRemove) => {
    setWatchlistItems(watchlistItems.filter(item => item.symbol !== symbolToRemove));
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title="Watchlist"
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
          >
            Add
          </Button>
        }
      />
      <Divider />
      <CardContent sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {watchlistItems.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No stocks in your watchlist yet.
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
              sx={{ mt: 1 }}
            >
              Add stocks
            </Button>
          </Box>
        ) : (
          <List disablePadding>
            {watchlistItems.map((stock) => {
              const isPositive = stock.change >= 0;

              return (
                <ListItem
                  key={stock.symbol}
                  divider
                  disablePadding
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1,
                    px: 2
                  }}
                  secondaryAction={
                    <Box>
                      <Tooltip title="View Details">
                        <IconButton edge="end" aria-label="view" size="small" sx={{ mr: 1 }}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove from Watchlist">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          size="small"
                          onClick={() => handleRemoveSymbol(stock.symbol)}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                >
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {stock.symbol}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stock.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 8 }}>
                    <Typography variant="body2" fontWeight="medium">
                      ${stock.price.toFixed(2)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {isPositive ? (
                        <TrendingUpIcon fontSize="small" color="success" />
                      ) : (
                        <TrendingDownIcon fontSize="small" color="error" />
                      )}
                      <Typography
                        variant="caption"
                        color={isPositive ? 'success.main' : 'error.main'}
                      >
                        {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        )}
      </CardContent>

      {/* Add Symbol Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add to Watchlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="symbol"
            label="Stock Symbol"
            type="text"
            fullWidth
            variant="outlined"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            placeholder="e.g., AAPL, MSFT, GOOGL"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddSymbol} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default WatchlistCard;