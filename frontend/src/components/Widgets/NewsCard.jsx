import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  Chip,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const NewsCard = ({ stockSymbol = null }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNewsItem, setSelectedNewsItem] = useState(null);
  const [filterSentiment, setFilterSentiment] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);

  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: 'Apple to Release New M3 MacBook Pro Next Week',
      source: 'Bloomberg',
      date: '2023-03-30',
      sentiment: 'positive',
      symbols: ['AAPL'],
      summary: 'Apple is set to announce new MacBook Pro models featuring the M3 chip next week, according to sources familiar with the matter. The new models are expected to offer significant performance improvements over current models, potentially boosting holiday sales.',
      url: '#'
    },
    {
      id: 2,
      title: 'Microsoft Azure Revenue Growth Slows Down in Q1',
      source: 'Reuters',
      date: '2023-03-29',
      sentiment: 'negative',
      symbols: ['MSFT'],
      summary: 'Microsoft reported a slowdown in Azure cloud services growth in its Q1 earnings call, falling short of analyst expectations. The company cited economic headwinds and delayed enterprise spending as key factors affecting growth.',
      url: '#'
    },
    {
      id: 3,
      title: 'Fed Signals Potential Rate Cut Later This Year',
      source: 'CNBC',
      date: '2023-03-28',
      sentiment: 'neutral',
      symbols: ['SPY', 'QQQ', 'DIA'],
      summary: 'Federal Reserve officials hinted at a possible interest rate cut later this year during their latest meeting, according to minutes released today. The central bank is monitoring inflation data closely before making any policy changes.',
      url: '#'
    },
    {
      id: 4,
      title: 'Tesla Deliveries Expected to Exceed Estimates',
      source: 'Wall Street Journal',
      date: '2023-03-27',
      sentiment: 'positive',
      symbols: ['TSLA'],
      summary: 'Tesla is poised to exceed delivery estimates for the quarter, according to industry analysts tracking the company\'s output. Production improvements at its Shanghai and Berlin facilities have helped the electric vehicle maker overcome supply chain challenges.',
      url: '#'
    },
  ];

  // Filter news by stock symbol if provided, then by sentiment
  const filteredNews = newsItems
    .filter(item => stockSymbol ? item.symbols.includes(stockSymbol) : true)
    .filter(item => filterSentiment === 'all' ? true : item.sentiment === filterSentiment);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSentiment = (sentiment) => {
    setFilterSentiment(sentiment);
    handleMenuClose();
  };

  const handleOpenNewsDialog = (newsItem) => {
    setSelectedNewsItem(newsItem);
    setOpenDialog(true);
  };

  const handleCloseNewsDialog = () => {
    setOpenDialog(false);
  };

  const renderSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'positive':
        return <SentimentSatisfiedAltIcon fontSize="small" color="success" />;
      case 'negative':
        return <SentimentVeryDissatisfiedIcon fontSize="small" color="error" />;
      default:
        return <SentimentNeutralIcon fontSize="small" color="action" />;
    }
  };

  const getSentimentLabel = (sentiment) => {
    switch(sentiment) {
      case 'positive':
        return 'Positive';
      case 'negative':
        return 'Negative';
      case 'neutral':
        return 'Neutral';
      default:
        return 'All';
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={stockSymbol ? `${stockSymbol} News` : "Latest Market News"}
        action={
          <Box>
            <Tooltip title="Filter by sentiment">
              <IconButton aria-label="filter" onClick={handleMenuClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleFilterSentiment('all')}>
                All Sentiment
              </MenuItem>
              <MenuItem onClick={() => handleFilterSentiment('positive')}>
                <SentimentSatisfiedAltIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                Positive
              </MenuItem>
              <MenuItem onClick={() => handleFilterSentiment('neutral')}>
                <SentimentNeutralIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                Neutral
              </MenuItem>
              <MenuItem onClick={() => handleFilterSentiment('negative')}>
                <SentimentVeryDissatisfiedIcon fontSize="small" color="error" sx={{ mr: 1 }} />
                Negative
              </MenuItem>
            </Menu>
          </Box>
        }
        subheader={filterSentiment !== 'all' ? `Filtered: ${getSentimentLabel(filterSentiment)} Sentiment` : null}
      />
      <Divider />
      <CardContent sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {filteredNews.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No news articles match your filters.
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {filteredNews.map((news, index) => (
              <Box key={news.id} sx={{ cursor: 'pointer' }} onClick={() => handleOpenNewsDialog(news)}>
                {index > 0 && <Divider />}
                <ListItem disablePadding sx={{ display: 'block', p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {news.source} • {new Date(news.date).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {renderSentimentIcon(news.sentiment)}
                    </Box>
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    {news.title}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {news.symbols.map(symbol => (
                      <Chip
                        key={symbol}
                        label={symbol}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5 }}
                      />
                    ))}
                  </Box>
                </ListItem>
              </Box>
            ))}
          </List>
        )}
      </CardContent>

      {/* News Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseNewsDialog} maxWidth="sm" fullWidth>
        {selectedNewsItem && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight="medium">
                {selectedNewsItem.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {selectedNewsItem.source} • {new Date(selectedNewsItem.date).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  {renderSentimentIcon(selectedNewsItem.sentiment)}
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {getSentimentLabel(selectedNewsItem.sentiment)} sentiment
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedNewsItem.summary}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Related Stocks:</Typography>
                <Box sx={{ mt: 1 }}>
                  {selectedNewsItem.symbols.map(symbol => (
                    <Chip
                      key={symbol}
                      label={symbol}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5 }}
                    />
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseNewsDialog}>Close</Button>
              <Button
                variant="contained"
                endIcon={<OpenInNewIcon />}
                href={selectedNewsItem.url}
                target="_blank"
              >
                Read Full Article
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Card>
  );
};

export default NewsCard;