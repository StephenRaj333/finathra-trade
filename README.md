# Trading App - Vite + React + TailwindCSS

A professional trading application built with **Vite**, **React**, and **TailwindCSS** with a comprehensive design token system.

## 🚀 Features

- **Stocks Section**: Real-time stock charts, trading panel, positions, and news
- **Markets Section**: Market indices, ETFs, cryptocurrencies, heat maps, and economic calendar
- **Portfolio Section**: Holdings tracking, P&L analysis, performance metrics, and asset allocation
- **Design System**: Custom TailwindCSS variables and color schemes
- **Responsive Design**: Mobile-first approach with dark mode support
- **Component Library**: Reusable components (Button, Card, Chart, StatBox, Badge, etc.)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Chart.jsx
│   ├── StatBox.jsx
│   └── Badge.jsx
│
├── features/           # Feature-based architecture
│   ├── stocks/
│   │   └── StocksPage.jsx
│   ├── markets/
│   │   └── MarketsPage.jsx
│   └── portfolio/
│       └── PortfolioPage.jsx
│
├── pages/              # Route-level pages
│   ├── Home.jsx
│   ├── Stocks.jsx
│   ├── Markets.jsx
│   └── Portfolio.jsx
│
├── layouts/            # Layout components
│   └── MainLayout.jsx
│
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── constants/          # App constants
│
├── App.jsx
├── index.css           # TailwindCSS + custom styles
└── main.jsx
```

## 🎨 Design Tokens

### Color Palette

The project includes a comprehensive color system defined in `tailwind.config.js`:

- **Primary**: Main brand color (Blue)
- **Secondary**: Neutral/Gray tones
- **Success**: Green (Profits, gains)
- **Danger**: Red (Losses, alerts)
- **Warning**: Orange (Cautions, notifications)
- **Info**: Blue (Information)
- **Chart**: Trading-specific colors

### Component Classes

Predefined component classes for consistency:

```css
/* Buttons */
.btn               /* Base button */
.btn-primary       /* Primary button */
.btn-secondary     /* Secondary button */
.btn-success       /* Success button (Green) */
.btn-danger        /* Danger button (Red) */
.btn-outline       /* Outline button */
.btn-sm / .btn-lg  /* Size variants */

/* Cards */
.card              /* Card container */
.card-head         /* Card header */
.card-body         /* Card body */
.card-footer       /* Card footer */

/* Price Display */
.price             /* Price text */
.price-up          /* Up price (Green) */
.price-down        /* Down price (Red) */
.percentage-up     /* Up percentage */
.percentage-down   /* Down percentage */

/* Tables */
.table             /* Table container */
.table th          /* Table header */
.table td          /* Table cell */

/* Badges */
.badge             /* Badge container */
.badge-success     /* Success badge */
.badge-danger      /* Danger badge */
.badge-warning     /* Warning badge */
.badge-info        /* Info badge */
```

## 🔧 Configuration Files

### `tailwind.config.js`
Comprehensive Tailwind configuration with:
- Extended color palette
- Custom font sizes (including `.text-price` for large prices)
- Box shadows for depth
- Animation and transition definitions
- Safelist for dynamic classes

### `postcss.config.js`
PostCSS configuration with:
- TailwindCSS plugin
- Autoprefixer for browser compatibility

### `src/index.css`
Global styles including:
- Tailwind directives (@tailwind)
- Custom component classes
- Utility classes
- Typography styles

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will start at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📦 Dependencies

- **React**: UI library
- **React Router DOM**: Client-side routing
- **Vite**: Build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: Browser compatibility

## 🎯 Usage Examples

### Using Button Component

```jsx
import Button from './components/Button';

<Button variant="primary" size="lg">
  Click me
</Button>

<Button variant="success" size="sm">
  Buy
</Button>

<Button variant="danger">
  Sell
</Button>
```

### Using Card Component

```jsx
import Card from './components/Card';

<Card title="Portfolio Summary" subtitle="Today's performance">
  <p>Card content here</p>
</Card>
```

### Using TailwindCSS Classes

```jsx
<div className="grid grid-cols-3 gap-4">
  <div className="card">
    <h3 className="text-2xl font-bold text-primary-600">Title</h3>
    <p className="text-secondary-600 dark:text-secondary-400">Subtitle</p>
  </div>
</div>
```

### Price Display

```jsx
<p className="price text-success-600">$150.45</p>
<p className="percentage-up">+2.35%</p>
<p className="percentage-down">-1.20%</p>
```

## 🌙 Dark Mode

Dark mode is automatically supported through Tailwind's dark mode feature. Classes use the `dark:` prefix:

```jsx
<div className="bg-white dark:bg-dark-bg text-secondary-900 dark:text-secondary-50">
  Content
</div>
```

## 📊 Sections Overview

### Stocks
- Candlestick and Line charts
- Time filters (1D, 1W, 1M, 3M, 1Y)
- Stock info (High, Low, Volume)
- Trading panel (Buy/Sell, Order types)
- Open positions
- Notes and news

### Markets
- Stock types overview
- Market indices chart
- Industry performance
- ETF listings
- Cryptocurrencies
- Economic calendar
- IPO calendar
- Search functionality

### Portfolio
- Holdings dashboard
- P&L charts
- Asset allocation
- Performance metrics
- Distribution breakdown
- Best/worst performers

## 🔐 Security

- Environment-based configuration (when APIs are added)
- Secure API call handling in services
- Input validation for trading forms

## 📝 Notes

- This is a UI template - trading functionality would require backend API integration
- Replace chart placeholders with actual charting library (e.g., Chart.js, ECharts, Lightweight Charts)
- Add authentication before production deployment
- Implement API services in `src/services/`

## 🤝 Contributing

Feel free to extend this template with additional features like:
- Real-time data integration
- WebSocket connections for live updates
- Advanced charting libraries
- User authentication
- Backend API integration

## 📄 License

MIT

---

**Happy Trading! 📈**
