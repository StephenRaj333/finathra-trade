import Card from '../../components/Card';
import Chart from '../../components/Chart';
import StatBox from '../../components/StatBox';
import Badge from '../../components/Badge';

export default function PortfolioPage() {
  const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: '$150.45', value: '$7,522.50', gain: '+245' },
    { symbol: 'MSFT', name: 'Microsoft', shares: 30, price: '$410.02', value: '$12,300.60', gain: '+180' },
    { symbol: 'GOOGL', name: 'Google', shares: 20, price: '$1,270.15', value: '$25,403.00', gain: '+420' },
    { symbol: 'AMZN', name: 'Amazon', shares: 15, price: '$195.87', value: '$2,938.05', gain: '+120' },
  ];

  return (
    <div className="space-y-6">
      <h1>Portfolio</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatBox
          label="Total Value"
          value="$48,164.15"
          change="12.5"
          isPositive={true}
        />
        <StatBox
          label="Total Gain/Loss"
          value="+$965.00"
          change="2.0"
          isPositive={true}
        />
        <StatBox
          label="Return %"
          value="2.04%"
          change="12.3"
          isPositive={true}
        />
        <StatBox
          label="Diversification"
          value="4 Stocks"
          change="50.0"
          isPositive={true}
        />
      </div>

      {/* Holdings List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Holdings</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Shares</th>
                  <th>Price</th>
                  <th>Total Value</th>
                  <th>Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.symbol}>
                    <td className="font-semibold text-primary-600">{holding.symbol}</td>
                    <td>{holding.name}</td>
                    <td>{holding.shares}</td>
                    <td>{holding.price}</td>
                    <td className="font-semibold">{holding.value}</td>
                    <td>
                      <Badge variant="success">{holding.gain}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Profit & Loss Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Profit & Loss Over Time</h2>
          <Chart height={300} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Asset Allocation</h2>
          <Chart height={300} />
        </div>
      </div>

      {/* Performance Metrics */}
      <Card title="Performance Metrics">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-secondary-500 dark:text-secondary-400 font-medium mb-2">
              Best Performer
            </p>
            <p className="text-lg font-semibold text-success-600">GOOGL +420 (1.7%)</p>
          </div>
          <div>
            <p className="text-sm text-secondary-500 dark:text-secondary-400 font-medium mb-2">
              Worst Performer
            </p>
            <p className="text-lg font-semibold text-danger-600">AAPL +245 (0.3%)</p>
          </div>
          <div>
            <p className="text-sm text-secondary-500 dark:text-secondary-400 font-medium mb-2">
              Annual Return
            </p>
            <p className="text-lg font-semibold text-primary-600">+18.5%</p>
          </div>
        </div>
      </Card>

      {/* Asset Distribution */}
      <Card title="Holdings Distribution">
        <div className="space-y-4">
          {holdings.map((holding) => {
            const percentage = Math.random() * 30 + 15;
            return (
              <div key={holding.symbol}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{holding.symbol}</span>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
