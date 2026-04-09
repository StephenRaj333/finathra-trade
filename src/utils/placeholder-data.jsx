export const stockItems = [
  { name: 'Dow Jones Industrial Average', sub: 'DJI Index IDXDJX' },
  { name: 'S&P 500 Index', sub: 'SPX Index IDXSP' },
  { name: 'NASDAQ Composite', sub: 'IXIC Index IDXNASDAQ' },

  // US Indices
  { name: 'Russell 2000', sub: 'RUT Index IDXRUSSELL' },
  { name: 'CBOE Volatility Index (VIX)', sub: 'VIX Index IDXVIX' },

  // Indian Indices (since your users likely Indian)
  { name: 'Nifty 50', sub: 'NSE Index NIFTY' },
  { name: 'Sensex', sub: 'BSE Index SENSEX' },
  { name: 'Bank Nifty', sub: 'NSE Index BANKNIFTY' },
  { name: 'Nifty IT', sub: 'NSE Index NIFTYIT' },

  // Global Indices
  { name: 'FTSE 100', sub: 'UK Index FTSE' },
  { name: 'DAX', sub: 'Germany Index DAX' },
  { name: 'Nikkei 225', sub: 'Japan Index NIKKEI' },
  { name: 'Hang Seng Index', sub: 'Hong Kong Index HSI' },

  // Popular Stocks (US)
  { name: 'Apple Inc.', sub: 'AAPL NASDAQ' },
  { name: 'Microsoft Corporation', sub: 'MSFT NASDAQ' },
  { name: 'Tesla Inc.', sub: 'TSLA NASDAQ' },
  { name: 'Amazon.com Inc.', sub: 'AMZN NASDAQ' },
  { name: 'NVIDIA Corporation', sub: 'NVDA NASDAQ' },
  { name: 'Meta Platforms', sub: 'META NASDAQ' },
  { name: 'Alphabet Inc. (Google)', sub: 'GOOGL NASDAQ' },

  // Popular Stocks (India)
  { name: 'Reliance Industries', sub: 'RELIANCE NSE' },
  { name: 'Tata Consultancy Services', sub: 'TCS NSE' },
  { name: 'HDFC Bank', sub: 'HDFCBANK NSE' },
  { name: 'Infosys', sub: 'INFY NSE' },
  { name: 'ICICI Bank', sub: 'ICICIBANK NSE' },
];


export const newsData = [
  {
    title: "Gold, other precious metals fall as Trump threatens to hit Iran “Extremely hard”",
    source: "Seeking Alpha",
    time: "50m ago"
  },
  {
    title: "Oil prices rise amid supply concerns and geopolitical tensions",
    source: "Reuters",
    time: "1h ago"
  },
  {
    title: "US stocks close higher as tech shares lead gains",
    source: "Bloomberg",
    time: "2h ago"
  },
  {
    title: "Bitcoin crosses $70,000 mark amid renewed investor interest",
    source: "CoinDesk",
    time: "3h ago"
  },
  {
    title: "Asian markets fall as inflation fears weigh on sentiment",
    source: "CNBC",
    time: "4h ago"
  },
  {
    title: "Federal Reserve signals potential rate cuts later this year",
    source: "Wall Street Journal",
    time: "5h ago"
  },
  {
    title: "Tesla shares dip after quarterly delivery miss",
    source: "MarketWatch",
    time: "6h ago"
  },
  {
    title: "Crude oil demand outlook improves as global travel rebounds",
    source: "Financial Times",
    time: "7h ago"
  },
  {
    title: "Nvidia hits new all-time high driven by AI demand",
    source: "Yahoo Finance",
    time: "8h ago"
  },
  {
    title: "Rupee weakens slightly against dollar in early trade",
    source: "Economic Times",
    time: "9h ago"
  }
];

export const chartsymbolNameSuggestions = [ 
    { symbol: 'EURUSD', name: 'Euro / US Dollar' },
    { symbol: 'GBPUSD', name: 'British Pound / US Dollar' },
    { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen' },
    { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar' },
    { symbol: 'NZDUSD', name: 'New Zealand Dollar / US Dollar' },
    { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar' },
    { symbol: 'XAUUSD', name: 'Gold / US Dollar' },
    { symbol: 'XAGUSD', name: 'Silver / US Dollar' },
    { symbol: 'BRENTUSD', name: 'Brent Crude Oil' },
    { symbol: 'SP500', name: 'S&P 500 Index' },
];


export const HEATMAP_DATA = { 
  'Healthcare Providers': [
    { name: 'UNH', value: 4800, change: 1.23, market: 'Stock Market', region: 'North America' },
    { name: 'CVS', value: 1200, change: 0.44, market: 'Stock Market', region: 'North America' },
    { name: 'HCA', value: 800, change: -0.22, market: 'Stock Market', region: 'North America' },
    { name: 'CNC', value: 600, change: 0.88, market: 'Stock Market', region: 'Asia Pacific' },
    { name: 'ELV', value: 900, change: 0.15, market: 'Stock Market', region: 'Europe' },
    { name: 'HUM', value: 500, change: -0.65, market: 'Stock Market', region: 'North America' },
  ],
  'Communications & Ne...': [
    { name: 'CSCO', value: 2200, change: 0.15, market: 'Stock Market', region: 'North America' },
    { name: 'CMCSA', value: 1600, change: 0.33, market: 'Stock Market', region: 'North America' },
    { name: 'T', value: 1400, change: -0.18, market: 'Stock Market', region: 'North America' },
    { name: 'VZ', value: 1100, change: 0.05, market: 'Stock Market', region: 'North America' },
    { name: 'NFLX', value: 2800, change: 0.77, market: 'Stock Market', region: 'North America' },
    { name: 'DIS', value: 1800, change: 0.42, market: 'Stock Market', region: 'North America' },
  ],
  'Semiconductors & Se...': [
    { name: 'NVDA', value: 3200, change: 0.26, market: 'Stock Market', region: 'North America' },
    { name: 'TSM', value: 2800, change: 1.04, market: 'Stock Market', region: 'Asia Pacific' },
    { name: 'AVGO', value: 2400, change: 6.21, market: 'Stock Market', region: 'North America' },
    { name: 'AMD', value: 1200, change: 0.55, market: 'Stock Market', region: 'North America' },
    { name: 'INTC', value: 1100, change: -0.45, market: 'Stock Market', region: 'North America' },
    { name: 'KLAC', value: 900, change: 0.33, market: 'Stock Market', region: 'North America' },
    { name: 'ASML', value: 1500, change: 0.82, market: 'Stock Market', region: 'Europe' },
    { name: 'AMAT', value: 800, change: 0.28, market: 'Stock Market', region: 'North America' },
    { name: 'LRCX', value: 700, change: 0.12, market: 'Stock Market', region: 'North America' },
    { name: 'QCOM', value: 1400, change: 0.19, market: 'Stock Market', region: 'North America' },
    { name: 'MRVL', value: 500, change: -0.35, market: 'Stock Market', region: 'North America' },
    { name: 'MU', value: 600, change: 0.44, market: 'Stock Market', region: 'Asia Pacific' },
  ],
  'Electronic Equipment ...': [
    { name: 'APH', value: 900, change: 0.66, market: 'Stock Market', region: 'North America' },
    { name: 'GLW', value: 500, change: 0.22, market: 'Stock Market', region: 'North America' },
    { name: 'TEL', value: 700, change: -0.11, market: 'Stock Market', region: 'Asia Pacific' },
    { name: 'KEYS', value: 400, change: 0.33, market: 'Stock Market', region: 'North America' },
  ],
  'Oil & Gas Related Equi...': [
    { name: 'SLB', value: 800, change: -0.22, market: 'Commodities', region: 'Global' },
    { name: 'BKR', value: 600, change: 0.35, market: 'Commodities', region: 'North America' },
    { name: 'HAL', value: 500, change: 0.11, market: 'Commodities', region: 'North America' },
    { name: 'FTI', value: 300, change: -0.55, market: 'Commodities', region: 'Europe' },
  ],
  'Natural Gas Utilities': [
    { name: 'LNG', value: 1200, change: 0.44, market: 'Commodities', region: 'Global' },
    { name: 'KINDER', value: 800, change: 0.18, market: 'Commodities', region: 'North America' },
    { name: 'WMB', value: 700, change: 0.55, market: 'Commodities', region: 'North America' },
    { name: 'OKE', value: 500, change: -0.12, market: 'Commodities', region: 'North America' },
  ],
  'Software & IT Services': [
    { name: 'MSFT', value: 3100, change: 0.88, market: 'Stock Market', region: 'North America' },
    { name: 'ORCL', value: 1800, change: 0.45, market: 'Stock Market', region: 'North America' },
    { name: 'CRM', value: 1400, change: -0.33, market: 'Stock Market', region: 'North America' },
    { name: 'NOW', value: 1100, change: 0.66, market: 'Stock Market', region: 'North America' },
    { name: 'ADBE', value: 1300, change: 0.22, market: 'Stock Market', region: 'North America' },
    { name: 'INTU', value: 900, change: 0.55, market: 'Stock Market', region: 'North America' },
  ],
  'Oil & Gas': [
    { name: 'CVX', value: 2800, change: 0.77, market: 'Commodities', region: 'North America' },
    { name: 'XOM', value: 3200, change: 0.55, market: 'Commodities', region: 'North America' },
    { name: 'COP', value: 1700, change: 0.12, market: 'Commodities', region: 'North America' },
    { name: 'EOG', value: 800, change: -0.33, market: 'Commodities', region: 'North America' },
    { name: 'PXD', value: 600, change: 0.28, market: 'Commodities', region: 'North America' },
  ],
  'Electric Utilities & IPPs': [
    { name: 'NEE', value: 1600, change: 0.44, market: 'Stock Market', region: 'North America' },
    { name: 'DUK', value: 1200, change: 0.18, market: 'Stock Market', region: 'North America' },
    { name: 'SO', value: 1000, change: -0.22, market: 'Stock Market', region: 'North America' },
    { name: 'GEV', value: 700, change: 0.33, market: 'Stock Market', region: 'North America' },
  ],
  'Metals & Mining': [
    { name: 'BHP', value: 1800, change: 0.55, market: 'Commodities', region: 'Asia Pacific' },
    { name: 'RIO', value: 1500, change: 0.33, market: 'Commodities', region: 'Global' },
    { name: 'NEM', value: 900, change: -0.44, market: 'Commodities', region: 'North America' },
    { name: 'FCX', value: 700, change: 0.22, market: 'Commodities', region: 'North America' },
    { name: 'VALE', value: 600, change: -0.18, market: 'Commodities', region: 'Emerging Markets' },
  ],
};

export const BEST_PERFORMING_INDUSTRIES = [
  { name: 'Semiconductors', value: 3500, change: 8.45 },
  { name: 'Software & IT', value: 3200, change: 7.22 },
  { name: 'Communication', value: 2800, change: 5.67 },
  { name: 'Healthcare', value: 2600, change: 4.89 },
  { name: 'Energy', value: 2400, change: 4.12 },
  { name: 'Financials', value: 2200, change: 3.34 },
  { name: 'Consumer Disc', value: 1900, change: 2.78 },
  { name: 'Industrials', value: 1700, change: 1.95 },
  { name: 'Utilities', value: 1500, change: 0.88 },
  { name: 'Real Estate', value: 1200, change: -0.45 },
];

export const MOST_POPULAR_ETFS = [
  { name: 'SPY', value: 5200, change: 3.45 },
  { name: 'QQQ', value: 4800, change: 5.67 },
  { name: 'IWM', value: 3200, change: 2.34 },
  { name: 'EEM', value: 2800, change: -1.23 },
  { name: 'GLD', value: 2400, change: 4.56 },
  { name: 'TLT', value: 2100, change: -2.34 },
  { name: 'XLF', value: 1900, change: 1.78 },
  { name: 'XLV', value: 1800, change: 2.89 },
  { name: 'XLE', value: 1600, change: 6.12 },
  { name: 'XLI', value: 1400, change: 0.56 },
];