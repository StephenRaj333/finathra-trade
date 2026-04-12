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

export const BUBBLE_DATA = {
  'PE/PB': {
    '1Y': [
      { name: 'Healthcare', pe: 15, pb: 10, size: 14, highlighted: false },
      { name: 'Financials', pe: 25, pb: 28, size: 16, highlighted: false },
      { name: 'Consumer Staples', pe: 32, pb: 35, size: 12, highlighted: false },
      { name: 'Industrials', pe: 40, pb: 40, size: 14, highlighted: false },
      { name: 'Materials', pe: 48, pb: 38, size: 12, highlighted: false },
      { name: 'Energy', pe: 55, pb: 42, size: 16, highlighted: false },
      { name: 'Communication', pe: 68, pb: 55, size: 22, highlighted: true },
      { name: 'Technology', pe: 75, pb: 35, size: 30, highlighted: true },
      { name: 'Utilities', pe: 82, pb: 60, size: 16, highlighted: false },
      { name: 'Real Estate', pe: 88, pb: 52, size: 12, highlighted: false },
      { name: 'Consumer Disc', pe: 92, pb: 68, size: 14, highlighted: false },
    ],
    '5Y': [
      { name: 'Healthcare', pe: 20, pb: 18, size: 16, highlighted: false },
      { name: 'Financials', pe: 30, pb: 22, size: 18, highlighted: false },
      { name: 'Consumer Staples', pe: 35, pb: 40, size: 14, highlighted: false },
      { name: 'Industrials', pe: 45, pb: 48, size: 16, highlighted: false },
      { name: 'Materials', pe: 52, pb: 32, size: 14, highlighted: false },
      { name: 'Energy', pe: 60, pb: 55, size: 18, highlighted: true },
      { name: 'Communication', pe: 72, pb: 62, size: 24, highlighted: true },
      { name: 'Technology', pe: 80, pb: 45, size: 32, highlighted: false },
      { name: 'Utilities', pe: 85, pb: 70, size: 16, highlighted: false },
      { name: 'Real Estate', pe: 90, pb: 58, size: 14, highlighted: false },
    ],
    '10Y': [
      { name: 'Healthcare', pe: 18, pb: 15, size: 18, highlighted: false },
      { name: 'Financials', pe: 28, pb: 25, size: 20, highlighted: false },
      { name: 'Consumer Staples', pe: 38, pb: 45, size: 16, highlighted: false },
      { name: 'Industrials', pe: 50, pb: 50, size: 18, highlighted: true },
      { name: 'Materials', pe: 55, pb: 38, size: 14, highlighted: false },
      { name: 'Energy', pe: 65, pb: 58, size: 20, highlighted: true },
      { name: 'Communication', pe: 75, pb: 65, size: 26, highlighted: false },
      { name: 'Technology', pe: 82, pb: 42, size: 34, highlighted: false },
      { name: 'Utilities', pe: 88, pb: 72, size: 18, highlighted: false },
    ],
  },
  'EV/EBITDA': {
    '1Y': [
      { name: 'Healthcare', pe: 22, pb: 30, size: 18, highlighted: false },
      { name: 'Financials', pe: 35, pb: 20, size: 16, highlighted: false },
      { name: 'Technology', pe: 70, pb: 65, size: 28, highlighted: true },
      { name: 'Energy', pe: 45, pb: 50, size: 20, highlighted: true },
      { name: 'Industrials', pe: 58, pb: 42, size: 16, highlighted: false },
      { name: 'Materials', pe: 80, pb: 55, size: 14, highlighted: false },
      { name: 'Utilities', pe: 90, pb: 70, size: 12, highlighted: false },
    ],
    '5Y': [
      { name: 'Healthcare', pe: 25, pb: 35, size: 20, highlighted: false },
      { name: 'Technology', pe: 72, pb: 60, size: 30, highlighted: true },
      { name: 'Energy', pe: 50, pb: 48, size: 22, highlighted: false },
      { name: 'Financials', pe: 38, pb: 28, size: 18, highlighted: false },
      { name: 'Industrials', pe: 60, pb: 45, size: 18, highlighted: true },
      { name: 'Materials', pe: 82, pb: 58, size: 16, highlighted: false },
    ],
    '10Y': [
      { name: 'Healthcare', pe: 28, pb: 32, size: 22, highlighted: false },
      { name: 'Technology', pe: 75, pb: 58, size: 32, highlighted: true },
      { name: 'Energy', pe: 55, pb: 52, size: 24, highlighted: true },
      { name: 'Financials', pe: 40, pb: 25, size: 20, highlighted: false },
      { name: 'Industrials', pe: 62, pb: 48, size: 20, highlighted: false },
    ],
  },
};


export const HISTORY_DATA = {
  PE: {
    '1Y': {
      industryName: 'Software & IT Service',
      currentValue: 37.03,
      percentile: 1.89,
      dates: [
        '2025-04-11', '2025-04-25', '2025-05-10', '2025-05-25',
        '2025-06-10', '2025-06-25', '2025-07-10', '2025-07-25',
        '2025-08-10', '2025-08-25', '2025-09-10', '2025-09-25',
        '2025-10-10', '2025-10-25', '2025-11-10', '2025-11-25',
        '2025-12-10', '2025-12-25', '2026-01-10', '2026-01-25',
        '2026-02-10', '2026-02-25', '2026-03-10', '2026-03-25',
        '2026-04-02',
      ],
      values: [
        62.31, 61.40, 59.80, 58.10, 56.50, 57.20, 58.00, 56.30,
        54.80, 53.50, 52.10, 50.80, 49.00, 47.50, 46.20, 44.80,
        43.10, 41.50, 40.00, 42.50, 44.80, 42.30, 39.80, 38.20,
        37.39,
      ],
    },
    '3Y': {
      industryName: 'Software & IT Service',
      currentValue: 37.03,
      percentile: 5.42,
      dates: [
        '2023-04-01', '2023-07-01', '2023-10-01', '2024-01-01',
        '2024-04-01', '2024-07-01', '2024-10-01', '2025-01-01',
        '2025-04-01', '2025-07-01', '2025-10-01', '2026-01-01',
        '2026-04-02',
      ],
      values: [
        48.50, 52.30, 55.80, 58.10, 60.20, 63.50, 65.80,
        62.31, 58.10, 52.30, 47.50, 40.00, 37.39,
      ],
    },
    '5Y': {
      industryName: 'Software & IT Service',
      currentValue: 37.03,
      percentile: 8.75,
      dates: [
        '2021-04-01', '2021-10-01', '2022-04-01', '2022-10-01',
        '2023-04-01', '2023-10-01', '2024-04-01', '2024-10-01',
        '2025-04-01', '2025-10-01', '2026-04-02',
      ],
      values: [
        45.00, 50.20, 55.80, 52.10, 48.50, 55.80, 60.20,
        65.80, 58.10, 47.50, 37.39,
      ],
    },
  },
  PB: {
    '1Y': {
      industryName: 'Software & IT Service',
      currentValue: 4.82,
      percentile: 3.21,
      dates: [
        '2025-04-11', '2025-04-25', '2025-05-10', '2025-05-25',
        '2025-06-10', '2025-06-25', '2025-07-10', '2025-07-25',
        '2025-08-10', '2025-08-25', '2025-09-10', '2025-09-25',
        '2025-10-10', '2025-10-25', '2025-11-10', '2025-11-25',
        '2025-12-10', '2025-12-25', '2026-01-10', '2026-01-25',
        '2026-02-10', '2026-02-25', '2026-03-10', '2026-03-25',
        '2026-04-02',
      ],
      values: [
        8.20, 8.05, 7.80, 7.55, 7.30, 7.45, 7.60, 7.35,
        7.10, 6.85, 6.60, 6.35, 6.10, 5.85, 5.65, 5.45,
        5.25, 5.50, 5.80, 5.55, 5.30, 5.10, 4.95, 4.88,
        4.82,
      ],
    },
    '3Y': {
      industryName: 'Software & IT Service',
      currentValue: 4.82,
      percentile: 6.10,
      dates: [
        '2023-04-01', '2023-07-01', '2023-10-01', '2024-01-01',
        '2024-04-01', '2024-07-01', '2024-10-01', '2025-01-01',
        '2025-04-01', '2025-07-01', '2025-10-01', '2026-01-01',
        '2026-04-02',
      ],
      values: [
        6.50, 7.10, 7.80, 8.20, 8.50, 8.80, 8.50,
        8.20, 7.30, 6.35, 5.65, 5.25, 4.82,
      ],
    },
    '5Y': {
      industryName: 'Software & IT Service',
      currentValue: 4.82,
      percentile: 10.30,
      dates: [
        '2021-04-01', '2021-10-01', '2022-04-01', '2022-10-01',
        '2023-04-01', '2023-10-01', '2024-04-01', '2024-10-01',
        '2025-04-01', '2025-10-01', '2026-04-02',
      ],
      values: [
        5.80, 6.50, 7.50, 6.80, 6.50, 7.80, 8.50,
        8.50, 7.30, 5.65, 4.82,
      ],
    },
  },
};

// Market table placeholder data 

// ── Market Table — Single Source of Truth ────────────────────────────────────
// Edit ONLY this array to add, remove, reorder, or rename columns.
// Backend: 'field' is the camelCase key in your API response object.
// 'group' controls which panel it appears in the column-picker UI.
// 'pinned: true' means the column is always visible and cannot be unchecked.
// 'defaultVisible: true' means the column is shown on first load.
export const MARKET_TABLE_COLUMNS = [
  { id: 'symbol',             label: 'Symbol',           group: 'label', field: 'symbol',        pinned: true,  defaultVisible: true  },
  { id: 'name',               label: 'Name',             group: 'label', field: 'name',                         defaultVisible: true  },
  { id: 'pm-price',           label: 'PM Price',         group: 'label', field: 'price',                        defaultVisible: true  },
  { id: 'sparkline',          label: 'Sparkline',        group: 'label', field: null,                           defaultVisible: true  },
  { id: 'pct-change',         label: '% Change',         group: 'label', field: 'change',                       defaultVisible: true  },
  { id: 'volume',             label: 'Volume',           group: 'label', field: 'volume',                       defaultVisible: true  },
  { id: 'market-cap',         label: 'Market Cap',       group: 'stock', field: 'marketCap',                    defaultVisible: true  },
  { id: 'bps',                label: 'BPS',              group: 'stock', field: 'bps',                          defaultVisible: false },
  { id: 'dividend',           label: 'Dividend',         group: 'stock', field: 'dividend',                     defaultVisible: false },
  { id: 'eps',                label: 'EPS',              group: 'stock', field: 'eps',                          defaultVisible: false },
  { id: 'ex-date',            label: 'Ex-Date',          group: 'stock', field: 'exDate',                       defaultVisible: false },
  { id: 'free-float-mkt-cap', label: 'Free Float Mkt Cap', group: 'stock', field: 'freeFloatMktCap',           defaultVisible: false },
  { id: 'next-earnings',      label: 'Next Earnings',    group: 'stock', field: 'nextEarnings',                 defaultVisible: false },
  { id: 'free-float',         label: 'Free Float',       group: 'stock', field: 'freeFloat',                    defaultVisible: false },
  { id: 'pb',                 label: 'P/B',              group: 'stock', field: 'pb',                           defaultVisible: false },
];

// ── Derived — do NOT edit manually ───────────────────────────────────────────
export const DEFAULT_VISIBLE_IDS = MARKET_TABLE_COLUMNS.filter(c => c.defaultVisible).map(c => c.id);
export const ALL_COLUMN_IDS      = MARKET_TABLE_COLUMNS.map(c => c.id);
export const COLUMN_LABELS       = Object.fromEntries(MARKET_TABLE_COLUMNS.map(c => [c.id, c.label]));
export const LABEL_COLS          = MARKET_TABLE_COLUMNS.filter(c => c.group === 'label');
export const STOCK_COLS          = MARKET_TABLE_COLUMNS.filter(c => c.group === 'stock');

export const gainersData = [
  { symbol: 'SKYO', name: 'Sky Quarry L...', price: '5.57', change: '+135.67%', volume: '206.13%', marketCap: '19.16M', bps: '2.34', dividend: '0.85', eps: '1.25', exDate: '2026-04-20', freeFloatMktCap: '15.8M', nextEarnings: '2026-05-15', freeFloat: '78.5%', pb: '2.45' },
  { symbol: 'Alpha Nexus', name: 'Stone Ridge...', price: '2323', change: '+142.30%', volume: '230.50%', marketCap: '30.12M', bps: '3.12', dividend: '1.20', eps: '2.15', exDate: '2026-04-18', freeFloatMktCap: '25.3M', nextEarnings: '2026-05-10', freeFloat: '82.3%', pb: '3.12' },
  { symbol: 'Beta Wave', name: 'Granite Peak...', price: '2323', change: '+142.30%', volume: '240.00%', marketCap: '28.45M', bps: '2.89', dividend: '0.95', eps: '1.85', exDate: '2026-04-22', freeFloatMktCap: '23.1M', nextEarnings: '2026-05-12', freeFloat: '80.1%', pb: '2.98' },
  { symbol: 'Gamma Stream', name: 'Granite Sum...', price: '3432.00', change: '+110.89%', volume: '250.00%', marketCap: '35.00M', bps: '4.56', dividend: '1.50', eps: '2.95', exDate: '2026-04-25', freeFloatMktCap: '28.5M', nextEarnings: '2026-05-20', freeFloat: '85.2%', pb: '3.45' },
  { symbol: 'Gamma Stream', name: 'Granite Sum...', price: '3432.00', change: '+110.89%', volume: '250.00%', marketCap: '35.00M', bps: '4.56', dividend: '1.50', eps: '2.95', exDate: '2026-04-25', freeFloatMktCap: '28.5M', nextEarnings: '2026-05-20', freeFloat: '85.2%', pb: '3.45' },
  { symbol: 'Beta Wave', name: 'Granite Peak...', price: '2323', change: '+142.30%', volume: '240.00%', marketCap: '28.45M', bps: '2.89', dividend: '0.95', eps: '1.85', exDate: '2026-04-22', freeFloatMktCap: '23.1M', nextEarnings: '2026-05-12', freeFloat: '80.1%', pb: '2.98' },
];

export const losersData = [
  { symbol: 'SKYO', name: 'Sky Quarry L...', price: '5.57', change: '-135.67%', volume: '206.13%', marketCap: '19.16M', bps: '2.34', dividend: '0.85', eps: '1.25', exDate: '2026-04-20', freeFloatMktCap: '15.8M', nextEarnings: '2026-05-15', freeFloat: '78.5%', pb: '2.45' },
  { symbol: 'Alpha Nexus', name: 'Stone Ridge...', price: '2323', change: '-142.30%', volume: '230.50%', marketCap: '30.12M', bps: '3.12', dividend: '1.20', eps: '2.15', exDate: '2026-04-18', freeFloatMktCap: '25.3M', nextEarnings: '2026-05-10', freeFloat: '82.3%', pb: '3.12' },
  { symbol: 'Beta Wave', name: 'Granite Peak...', price: '2323', change: '-142.30%', volume: '240.00%', marketCap: '28.45M', bps: '2.89', dividend: '0.95', eps: '1.85', exDate: '2026-04-22', freeFloatMktCap: '23.1M', nextEarnings: '2026-05-12', freeFloat: '80.1%', pb: '2.98' },
  { symbol: 'Gamma Stream', name: 'Granite Sum...', price: '3432.00', change: '-110.89%', volume: '250.00%', marketCap: '35.00M', bps: '4.56', dividend: '1.50', eps: '2.95', exDate: '2026-04-25', freeFloatMktCap: '28.5M', nextEarnings: '2026-05-20', freeFloat: '85.2%', pb: '3.45' },
  { symbol: 'Gamma Stream', name: 'Granite Sum...', price: '3432.00', change: '-110.89%', volume: '250.00%', marketCap: '35.00M', bps: '4.56', dividend: '1.50', eps: '2.95', exDate: '2026-04-25', freeFloatMktCap: '28.5M', nextEarnings: '2026-05-20', freeFloat: '85.2%', pb: '3.45' },
  { symbol: 'Beta Wave', name: 'Granite Peak...', price: '2323', change: '-142.30%', volume: '240.00%', marketCap: '28.45M', bps: '2.89', dividend: '0.95', eps: '1.85', exDate: '2026-04-22', freeFloatMktCap: '23.1M', nextEarnings: '2026-05-12', freeFloat: '80.1%', pb: '2.98' },
]; 