import { useEffect, useRef, useState } from 'react';
import { createChart, LineSeries, ColorType } from 'lightweight-charts';

const TABS = ['Index Chart', 'Yield Curves', 'Net Inflow', 'Market Overview'];

const stocks = [ 
  {
    id: 'dow',
    name: 'Dow Jones',
    price: '46,504.67',
    change: '-61.07',
    pct: '-3.13%',
    positive: false,
    selected: true,
  },
  {
    id: 'sp500',
    name: 'S&P 500 Index',
    price: '6,582.69',
    change: '+7.37',
    pct: '+0.11%',
    positive: true,
    selected: false,
  },
  {
    id: 'nasdaq1',
    name: 'NASDAQ',
    price: '6,582.69',
    change: '+7.37',
    pct: '+0.11%',
    positive: true,
    selected: false,
  },
  {
    id: 'nasdaq2',
    name: 'NASDAQ',
    price: '6,582.69',
    change: '+7.37',
    pct: '+0.11%',
    positive: true,
    selected: false,
  },
  {
    id: 'nasdaq3',
    name: 'NASDAQ Composite',
    price: '6,582.69',
    change: '+7.37',
    pct: '+0.11%',
    positive: true,
    selected: false,
  },
  {
    id: 'nasdaq4',
    name: 'NASDAQ 100',
    price: '6,582.69',
    change: '+7.37',
    pct: '+0.11%',
    positive: true,
    selected: false,
  },
];

// Generate realistic intraday percentage-change data for each series
function generateData(baseOffset, volatility, points = 80) {
  const data = [];
  const startDate = new Date('2024-01-02');
  let value = baseOffset;
  for (let i = 0; i < points; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    // skip weekends
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    value += (Math.random() - 0.48) * volatility;
    data.push({
      time: d.toISOString().split('T')[0],
      value: parseFloat(value.toFixed(4)),
    });
  }
  return data;
}

const seriesConfigs = [
  { color: '#6366f1', lineWidth: 2, data: generateData(0, 0.18) },    // indigo
  { color: '#3b82f6', lineWidth: 2, data: generateData(0.1, 0.14) },  // blue
  { color: '#f59e0b', lineWidth: 2, data: generateData(-0.3, 0.16) }, // amber
];

export default function IndexChart() {
  const [activeTab, setActiveTab] = useState('Index Chart');
  const [selectedStock, setSelectedStock] = useState('dow');
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: 'rgba(0, 0, 0, 0)' }, 
        textColor: '#9ca3af',
        fontSize: 11,
        fontFamily: 'Inter, sans-serif',
      },
      grid: {
        vertLines: { color: '#f3f4f6' },
        horzLines: { color: '#f3f4f6' },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
        ticksVisible: true,
        formatPrice: (price) => `${price.toFixed(2)}%`,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        fixLeftEdge: false,
        fixRightEdge: false,
      },
      crosshair: {
        mode: 1,
        vertLine: { color: '#d1d5db', width: 1, style: 3 },
        horzLine: { color: '#d1d5db', width: 1, style: 3 },
      },
      handleScroll: true,
      handleScale: true,
    });

    seriesConfigs.forEach(({ color, lineWidth, data }) => {
      const series = chart.addSeries(LineSeries, {
        color,
        lineWidth,
        priceLineVisible: false,
        lastValueVisible: false,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
      });
      series.setData(data);
    });

    chart.timeScale().fitContent();
    chartRef.current = chart;

    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Tab Bar ── */}
      <div className="flex items-center border-b border-gray-200 shrink-0 bg-[#f7f7f7]">  
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-white text-black'
                : 'text-gray-600 border-b-transparent hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
        {/* Menu icon */}
        <div className="ml-auto pr-3 text-gray-400 cursor-pointer hover:text-gray-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      </div>

      {/* ── Body: stock list + chart ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left – stock list */}
        <div className="w-full max-w-[170px] hide-scrollbar shrink-0 flex flex-col gap-2 overflow-y-auto border-r border-gray-100 p-2">
          {stocks.map((s) => {
            const isSelected = selectedStock === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStock(s.id)}
                className={`w-full text-left px-3 py-3 border bg-[rgba(237,232,242,0.50)] rounded-lg transition-all ${
                  isSelected
                    ? 'border-[#AE6DA2]'
                    : 'border-transparent'
                }`} 
              > 
                <div className="flex items-center gap-1 mb-0.5">
                  <span className={`w-1 h-1 rounded-full shrink-0 ${isSelected ? 'bg-[#AE6DA2]' : 'bg-black'}`} />
                  <span className="text-xs font-medium text-black">{s.name}</span>
                </div>
                <div className={`text-sm font-bold pl-3 text-black`}> 
                  {s.price}
                </div>
                <div className={`text-xs pl-3 font-medium mt-0.5 ${s.positive ? 'text-[#17B667]' : 'text-[#EC4D5C]'}`}>   
                  {s.change} &nbsp; {s.pct} 
                </div>
              </button>
            );
          })}
        </div>

        {/* Right – chart */}
        <div className="flex-1 overflow-hidden relative" ref={chartContainerRef} />
      </div>
    </div>
  );
}
