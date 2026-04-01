import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="py-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Trading App</h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-2xl">
          Monitor stocks, analyze markets, and manage your portfolio all in one place.
          Real-time data, advanced charts, and powerful trading tools at your fingertips.
        </p>
        <div className="flex gap-4">
          <Link to="/stocks">
            <Button size="lg">Explore Stocks</Button>
          </Link>
          <Link to="/portfolio"> 
            <Button variant="secondary" size="lg">
              View Portfolio
            </Button>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-6">
        <Card
          title="📈 Real-time Data"
          subtitle="Live market updates"
        >
          <p className="text-secondary-600 dark:text-secondary-400">
            Track live price updates and market movements with real-time data feeds.
          </p>
        </Card>
        <Card
          title="🔄 Easy Trading"
          subtitle="Quick execution"
        >
          <p className="text-secondary-600 dark:text-secondary-400">
            Execute trades quickly with our intuitive trading interface. Buy and sell at lightning speed.
          </p>
        </Card>
        <Card
          title="📊 Smart Analysis"
          subtitle="Advanced charts"
        >
          <p className="text-secondary-600 dark:text-secondary-400">
            Analyze trends with candlestick and line charts, multiple timeframes, and technical indicators.
          </p>
        </Card>
      </div>

      <Card title="Get Started" subtitle="Choose your section below">
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Link
            to="/stocks"
            className="p-6 rounded-lg border-2 border-primary-200 dark:border-primary-800 hover:border-primary-400 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 dark:hover:bg-opacity-20 transition-all"
          >
            <p className="text-lg font-semibold text-primary-600 mb-2">Stocks</p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              View charts, place trades, and track individual stocks
            </p>
          </Link>
          <Link
            to="/markets"
            className="p-6 rounded-lg border-2 border-info-200 dark:border-info-800 hover:border-info-400 dark:hover:border-info-600 hover:bg-info-50 dark:hover:bg-info-900 dark:hover:bg-opacity-20 transition-all"
          >
            <p className="text-lg font-semibold text-info-600 mb-2">Markets</p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Explore indices, ETFs, crypto, and global market data
            </p>
          </Link>
          <Link
            to="/portfolio"
            className="p-6 rounded-lg border-2 border-success-200 dark:border-success-800 hover:border-success-400 dark:hover:border-success-600 hover:bg-success-50 dark:hover:bg-success-900 dark:hover:bg-opacity-20 transition-all"
          >
            <p className="text-lg font-semibold text-success-600 mb-2">Portfolio</p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Manage holdings and track performance
            </p>
          </Link>
        </div>
      </Card>
    </div>
  );
}
