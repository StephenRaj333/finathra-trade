import Card from '../../components/Card';
import Chart from '../../components/Chart';
import Badge from '../../components/Badge';

export default function MarketsPage() {
  const stockTypes = [
    { name: 'Large Cap', count: 150 },
    { name: 'Mid Cap', count: 300 },
    { name: 'Small Cap', count: 450 },
  ];

  const industries = [
    { name: 'Technology', change: '+2.5%' },
    { name: 'Finance', change: '+1.2%' },
    { name: 'Healthcare', change: '-0.8%' },
    { name: 'Energy', change: '+3.1%' },
  ];

  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$45,230', change: '+5.2%' },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,450', change: '+3.8%' },
    { symbol: 'XRP', name: 'Ripple', price: '$0.521', change: '-1.2%' },
  ];

  const etfs = [
    { symbol: 'SPY', name: 'S&P 500 ETF', price: '$485.75', change: '+1.8%' },
    { symbol: 'IVV', name: 'iShares Core S&P 500', price: '$486.20', change: '+1.7%' },
    { symbol: 'VOO', name: 'Vanguard S&P 500', price: '$502.45', change: '+1.9%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Markets Overview</h1>
        <input
          type="text"
          placeholder="Search stocks, ETFs, crypto..."
          className="input px-4 py-2 border-secondary-300 dark:border-dark-border"
          style={{ maxWidth: '300px' }}
        />
      </div>

      {/* Types of Stocks */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Stock Types</h2>
        <div className="grid grid-cols-3 gap-4">
          {stockTypes.map((type) => (
            <Card key={type.name}>
              <p className="font-semibold text-lg">{type.name}</p>
              <p className="text-primary-600 text-2xl font-bold mt-2">{type.count}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Index Chart */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Market Indices</h2>
        <Chart height={350} title="Index Performance" />
      </div>

      {/* Industries / Heat Map */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Industry Performance</h2>
        <div className="grid grid-cols-2 gap-4">
          {industries.map((industry) => (
            <Card key={industry.name}>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{industry.name}</p>
                <Badge variant={industry.change.startsWith('+') ? 'success' : 'danger'}>
                  {industry.change}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ETFs Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Popular ETFs</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {etfs.map((etf) => (
                  <tr key={etf.symbol}>
                    <td className="font-semibold">{etf.symbol}</td>
                    <td>{etf.name}</td>
                    <td>{etf.price}</td>
                    <td>
                      <Badge variant={etf.change.startsWith('+') ? 'success' : 'danger'}>
                        {etf.change}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Cryptocurrencies */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Cryptocurrencies</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.map((crypto) => (
                  <tr key={crypto.symbol}>
                    <td className="font-semibold">{crypto.symbol}</td>
                    <td>{crypto.name}</td>
                    <td>{crypto.price}</td>
                    <td>
                      <Badge
                        variant={crypto.change.startsWith('+') ? 'success' : 'danger'}
                      >
                        {crypto.change}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Calendar and News Placeholder */}
      <div className="grid grid-cols-2 gap-6">
        <Card title="Economic Calendar">
          <p className="text-secondary-500 dark:text-secondary-400">
            Upcoming economic events and news...
          </p>
        </Card>
        <Card title="IPO Calendar">
          <p className="text-secondary-500 dark:text-secondary-400">
            Upcoming IPO launches...
          </p>
        </Card>
      </div>
    </div>
  );
}
