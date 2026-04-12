import {useState, useRef, useEffect, useCallback} from 'react';
import { SquareCheckBig } from 'lucide-react';
import { ArrowDown, HamburgerIcon } from "../../utils/SvgCode";
import { gainersData, losersData, DEFAULT_VISIBLE_IDS, ALL_COLUMN_IDS, COLUMN_LABELS, MARKET_TABLE_COLUMNS } from '../../utils/placeholder-data'; 
import { MenuIcon } from '../../utils/SvgCode'; 
import TableControls from './Table-Controls-Popup';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CandlePopup } from './CandlePopup';

echarts.use([LineChart, GridComponent, CanvasRenderer]);

// Generate random sparkline data for each row
const generateSparklineData = () => {
  const points = [];
  let value = 10 + Math.random() * 10;
  for (let i = 0; i < 20; i++) {
    value += (Math.random() - 0.45) * 2;
    points.push(parseFloat(value.toFixed(2)));
  }
  return points;
};

// Generate random OHLC candle data
const generateCandleData = () => {
  const data = [];
  const baseTime = new Date('2026-03-30T09:30:00');
  let close = 4510.95;
  for (let i = 0; i < 50; i++) {
    const time = new Date(baseTime.getTime() + i * 30 * 60 * 1000);
    const open = close + (Math.random() - 0.48) * 15;
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;
    close = open + (Math.random() - 0.45) * 20;
    data.push({
      time: Math.floor(time.getTime() / 1000),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });
  }
  return data;
};

// Pre-generate data so it doesn't change on re-render
const sparklineCache = new Map();
const candleCache = new Map();
const getSparklineData = (key) => {
  if (!sparklineCache.has(key)) sparklineCache.set(key, generateSparklineData());
  return sparklineCache.get(key);
};
const getCandleData = (key) => {
  if (!candleCache.has(key)) candleCache.set(key, generateCandleData());
  return candleCache.get(key);
};

/* ── Sparkline mini-chart (ECharts) ── */
const SparklineChart = ({ dataKey, isGainers }) => {
  const chartRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    instanceRef.current = chart;
    const data = getSparklineData(dataKey);
    chart.setOption({
      grid: { top: 0, right: 0, bottom: 0, left: 0 },
      xAxis: { type: 'category', show: false, data: data.map((_, i) => i) },
      yAxis: { type: 'value', show: false, min: Math.min(...data) - 1, max: Math.max(...data) + 1 },
      series: [{
        type: 'line',
        data,
        smooth: true,
        symbol: 'none',
        lineStyle: { color: isGainers ? '#17B667' : '#ef4444', width: 1.5 },
        areaStyle: undefined,
      }],
      animation: false,
    });
    return () => chart.dispose();
  }, [dataKey, isGainers]);

  return <div ref={chartRef} style={{ width: 80, height: 28 }} />;
};

// Popup height for positioning above
const POPUP_HEIGHT = 430;

const MarketDataTabs = () => {   
  const [active, setActive] = useState('Tops');
  const [subActive, setSubActive] = useState('Top Gainers');
  const mainTabs = ['Tops', 'Active', 'ETFs', 'Top Options', 'Bonds', 'Futures', 'Crypto', 'Events', '52 Week', 'Popular Stocks', 'Marginable', 'OTC', '24H Market'];

  const tableData = subActive === 'Top Gainers' ? gainersData : losersData;
  const isGainers = subActive === 'Top Gainers';
  const changeColor = isGainers ? 'text-green-500' : 'text-red-500';

  // Visible columns (controlled by table-controls dropdown)
  const [visibleColumns, setVisibleColumns] = useState(() => new Set(DEFAULT_VISIBLE_IDS));

  // Table controls modal — smooth open/close
  const [showTableControls, setShowTableControls] = useState(false);
  const [tcVisible, setTcVisible] = useState(false);

  const openControls = () => {
    setShowTableControls(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setTcVisible(true)));
  };

  const closeControls = useCallback(() => {
    setTcVisible(false);
    setTimeout(() => setShowTableControls(false), 300);
  }, []);

  // Popup hover state
  const [popup, setPopup] = useState({ visible: false, row: null, position: { top: 0, left: 0 } });
  const hoverTimeout = useRef(null);

  const handleSparklineEnter = useCallback((e, row) => {
    clearTimeout(hoverTimeout.current);
    const rect = e.currentTarget.getBoundingClientRect();
    const top = rect.top - POPUP_HEIGHT - 8;
    const clampedTop = Math.max(8, top); // don't go above viewport
    setPopup({
      visible: true,
      row,
      position: { top: clampedTop, left: Math.min(rect.left - 100, window.innerWidth - 540) },
    });
  }, []);

  const handleSparklineLeave = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setPopup(p => ({ ...p, visible: false })), 300);
  }, []);

  const handlePopupEnter = useCallback(() => {
    clearTimeout(hoverTimeout.current);
  }, []);

  const handlePopupLeave = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setPopup(p => ({ ...p, visible: false })), 300);
  }, []);

  // Use column configuration from placeholder-data
  const visibleCols = ALL_COLUMN_IDS.filter(id => visibleColumns.has(id));
  const lastColId = visibleCols[visibleCols.length - 1];
  const thBase = "px-4 py-2 text-xs text-left font-medium text-black relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[16px] after:w-[1.5px] after:bg-[#AE97C5]";
  const thLast = 'px-4 py-2 text-xs text-left font-medium text-black relative';

  const renderTd = (colId, row, idx) => {
    switch (colId) {
      case 'symbol':    return <td key="symbol"    className="px-4 py-2 text-[#616161] font-normal">{row.symbol}</td>;
      case 'name':      return <td key="name"      className="px-4 py-2 text-[#616161] font-normal">{row.name}</td>;
      case 'pm-price':  return <td key="pm-price"  className="px-4 py-2 text-[#17B667] font-normal">{row.price}</td>;
      case 'sparkline': return (
        <td key="sparkline" className="px-4 py-2" 
          onMouseEnter={(e) => handleSparklineEnter(e, row)}
          onMouseLeave={handleSparklineLeave}
          style={{ background: isGainers ? 'linear-gradient(180deg, #23fc3523 0%, rgba(35, 252, 46, 0) 95.55%)' : 'linear-gradient(180deg, #ef44442f 0%, rgba(35, 252, 46, 0) 95.55%)' }}
        >
          <SparklineChart dataKey={`${subActive}-${idx}`} isGainers={isGainers} />
        </td>
      );
      case 'pct-change':   return <td key="pct-change"   className={`px-4 py-2 font-medium ${changeColor}`}>{row.change}</td>;
      case 'volume':       return <td key="volume"       className="px-4 py-2 text-gray-700">{row.volume}</td>;
      case 'market-cap':   return <td key="market-cap"   className="px-4 py-2 text-gray-700">{row.marketCap}</td>;
      default: {
        const col = MARKET_TABLE_COLUMNS.find(c => c.id === colId);
        return <td key={colId} className="px-4 py-2 text-gray-700">{row[col?.field ?? colId] ?? '-'}</td>;
      }
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center border-b border-gray-200 bg-[#f7f7f7] shrink-0 overflow-x-auto scrollbar-none">
        {mainTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-3 py-2 text-xs font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${active === tab ? 'bg-white text-black' : 'text-gray-600 border-b-transparent hover:text-gray-900'
              }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto pr-3 text-gray-400 cursor-pointer hover:text-gray-600 shrink-0">
          <MenuIcon />
        </div>
      </div>
      <div className="flex items-center justify-between shrink-0 bg-white p-1">
        <div className="left-sec relative border-b border-gray-200">
          {/* Sliding Indicator */}
          <div
            className={`absolute bottom-0 left-0 h-px bg-[#724A9A] transition-all duration-300 ease-out`}
            style={{
              width: `calc(50% - 0px)`,
              transform: `translateX(${['Top Gainers', 'Tab Losers'].indexOf(subActive) * 100}%)`
            }}
          />
          <div className="flex relative z-10">
            {['Top Gainers', 'Tab Losers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSubActive(tab)}
                className={`px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${subActive === tab
                    ? 'text-[#724A9A]'
                    : 'text-[#7F7F7F]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div> 
        <div className="right-sec flex items-center gap-2 w-fit cursor-pointer"> 
            <div className="icon-container"> 
              <SquareCheckBig strokeWidth={2.3} size={16} color='#616161' />
            </div> 
            <div className="dropdown-contianer flex items-center gap-1">
                <div className="text-[#616161] text-xs font-normal">Pre-market</div>
                <div className="icon"><ArrowDown /></div>
            </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <div className="table-wrapper flex gap-1 items-start justify-start w-full">
          {/* Hamburger */}
          <div className="left-sec w-1/10">
            <div className="cursor-pointer" onClick={openControls}>
              <HamburgerIcon />
            </div>
          </div>

          <div className="right-sec w-full">
            <table className="market-main-table w-full text-xs">
              <thead className="bg-[#EDE8F2] sticky top-0">
                <tr>
                  {visibleCols.map(colId => (
                    <th key={colId} className={colId === lastColId ? thLast : thBase}>
                      {COLUMN_LABELS[colId]}
                    </th>
                  ))}
                </tr> 
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    {visibleCols.map(colId => renderTd(colId, row, idx))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Candle Popup on Sparkline Hover */}
      {popup.row && (
        <CandlePopup
          row={popup.row}
          position={popup.position}
          visible={popup.visible}
          onMouseEnter={handlePopupEnter}
          onMouseLeave={handlePopupLeave}
        />
      )}

      {/* Table Controls — centered modal */}
      {showTableControls && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${
            tcVisible ? 'bg-black/20' : 'bg-black/0'
          }`}
          onClick={closeControls}
        >
          <div
            className={`transition-all duration-300 ease-out ${
              tcVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <TableControls
              tabName={active}
              initialVisible={visibleColumns}
              onClose={closeControls}
              onApply={(newVis) => setVisibleColumns(newVis)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketDataTabs;