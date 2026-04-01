import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  CandlestickSeries,
  LineSeries,
  BarSeries,
  AreaSeries,
  BaselineSeries,
  HistogramSeries,
} from 'lightweight-charts';

// Mock API to simulate fetching trading data
const mockTradingAPI = {
  getStockData: async (symbol) => { 
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const basePrice = 150;
    let price = basePrice;
    const data = [];
    const now = new Date();
    
    // Generate 6 months of realistic trading data (approximately 120 business days)
    for (let i = 180; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Create realistic price movement with trend and volatility
      const trend = Math.sin(i / 60) * 15; // Long-term trend
      const cyclicalPattern = Math.sin(i / 20) * 10; // Medium-term cycle
      const randomWalk = (Math.random() - 0.5) * 3; // Daily volatility
      
      const baseForDay = basePrice + trend + cyclicalPattern + randomWalk; 
      price = baseForDay;
      
      const open = price;
      const close = price + (Math.random() - 0.5) * 3;
      const high = Math.max(open, close) + Math.abs((Math.random() - 0.5) * 3);
      const low = Math.min(open, close) - Math.abs((Math.random() - 0.5) * 3);
      
      const dateStr = date.toISOString().split('T')[0];
      data.push({
        time: dateStr,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });
    }
    
    const currentPrice = data[data.length - 1].close;
    const openingPrice = data[0].open;
    const priceChange = currentPrice - openingPrice;
    
    return { data, currentPrice, priceChange };
  }
};

export default function CandlestickChart({
  symbol = 'AAPL',
  chartType = 'candles',
  onChartTypeChange = null,
}) {
  const containerRef = useRef(null);
  const internalChartType = chartType || 'candles';
  const [data, setData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from mock API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await mockTradingAPI.getStockData(symbol);
        setData(result.data);
        setCurrentPrice(result.currentPrice);
        setPriceChange(result.priceChange);
        setError(null);
      } catch (err) {
        setError('Failed to fetch stock data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  // Simulate live price updates every 2 seconds
  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      const lastCandle = data[data.length - 1];
      const volatility = 0.5;
      const priceChange = (Math.random() - 0.5) * volatility;
      const newPrice = Math.max(lastCandle.low, Math.min(lastCandle.high, lastCandle.close + priceChange));
      
      setCurrentPrice(parseFloat(newPrice.toFixed(2)));
      setPriceChange(parseFloat((newPrice - data[0].open).toFixed(2)));
    }, 2000);

    return () => clearInterval(interval);
  }, [data]);

  // Chart rendering effect
  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    // Create chart
    const chartOptions = {
      layout: {
        textColor: '#1F2937',
        backgroundColor: '#FFFFFF',
      },
      watermark: {
        visible: false,
      }, 
      width: containerRef.current.clientWidth,
      height: 300,
    };

    const chart = createChart(containerRef.current, chartOptions);

    // Add series based on chart type
    let series;

    switch (internalChartType) {
      case 'candles':
        series = chart.addSeries(CandlestickSeries, {
          upColor: '#26a69a',
          downColor: '#ef5350',
          borderVisible: false,
          wickUpColor: '#26a69a',
          wickDownColor: '#ef5350',
          wickVisible: true,
        });
        break;
      case 'line':
        series = chart.addSeries(LineSeries, {
          color: '#2962FF',
          lineWidth: 2,
        });
        // For line chart, use close prices
        const lineData = data.map(d => ({ time: d.time, value: d.close }));
        series.setData(lineData);
        break;
      case 'bars':
        series = chart.addSeries(BarSeries, {
          upColor: '#26a69a',
          downColor: '#ef5350',
        });
        break;
      case 'area':
        series = chart.addSeries(AreaSeries, {
          lineColor: '#2196F3',
          topColor: 'rgba(33, 150, 243, 0.26)',
          bottomColor: 'rgba(33, 150, 243, 0.05)',
          lineWidth: 2,
        });
        // For area chart, use close prices
        const areaData = data.map(d => ({ time: d.time, value: d.close }));
        series.setData(areaData);
        break;
      case 'baseline':
        const baselineAvg = data.reduce((sum, d) => sum + d.close, 0) / data.length;
        series = chart.addSeries(BaselineSeries, {
          baseValue: { type: 'price', price: baselineAvg },
          topLineColor: 'rgba(38, 166, 154, 0.8)',
          topFillColor1: 'rgba(38, 166, 154, 0.28)',
          topFillColor2: 'rgba(38, 166, 154, 0.05)',
          bottomLineColor: 'rgba(239, 83, 80, 0.8)',
          bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
          bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
        });
        // For baseline chart, use close prices
        const baselineData = data.map(d => ({ time: d.time, value: d.close }));
        series.setData(baselineData);
        break;
      case 'histogram':
        series = chart.addSeries(HistogramSeries, {
          color: '#26a69a',
        });
        // For histogram chart, use close prices
        const histogramData = data.map(d => ({ time: d.time, value: d.close }));
        series.setData(histogramData);
        break;
    }

    // Set data for candlestick and bar series
    if (internalChartType === 'candles' || internalChartType === 'bars') {
      series.setData(data);
    }

    // Fit content
    chart.timeScale().fitContent();
    
    // Set tighter bar spacing for narrower candles
    if (internalChartType === 'candles' || internalChartType === 'bars') {
      chart.timeScale().applyOptions({
        barSpacing: 5,
      });
    }

    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, internalChartType]);

  return (
    <div className="w-full bg-white rounded-lg p-6 border border-gray-200">
      {/* Header with Price Info */}
      {/* <div className="mb-6 flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-4xl font-bold text-black">{currentPrice.toFixed(2)}</h2>
              <p className="text-base text-gray-600 mt-1">{symbol}</p>
            </div>
            <div className={`
              px-3 py-1 rounded-full text-sm font-semibold
              ${priceChange >= 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
              }
            `}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
              <span className="ml-2">
                ({((priceChange / (currentPrice - priceChange)) * 100).toFixed(2)}%)
              </span>
            </div>
          </div>  
        </div>
      </div> */}

      {/* Status Messages */}
      {/* {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-800 text-sm">
          {error}
        </div>
      )} */}

      {/* Chart Type Buttons */}
      {/* <div className="mb-6 flex gap-2 flex-wrap">
        {['candles', 'line', 'bars', 'area', 'baseline', 'histogram'].map((type) => (
          <button
            key={type}
            onClick={() => onChartTypeChange && onChartTypeChange(type)}
            disabled={loading}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              internalChartType === type
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div> */}

      {/* Chart Container */}
      {loading ? (
        <div
          className="w-full flex items-center justify-center bg-gray-50 rounded border-2 border-dashed border-gray-300"
          style={{ height: '300px' }}
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Fetching market data...</p>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="w-full"
          style={{ height: '300px' }}
        />
      )}
    </div>
  );
}
