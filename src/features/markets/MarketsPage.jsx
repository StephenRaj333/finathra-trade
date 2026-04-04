
import { useState } from 'react';
import { Resizable } from 're-resizable';
import IndexChart from '../../components/markets/IndexChart';
import GlobalMap from '../../components/markets/GlobalMap';

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const TabBar = ({ tabs, active, onSelect, menuIcon = true }) => ( 
  <div className="flex items-center border-b border-gray-200 bg-[#f7f7f7] shrink-0">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onSelect(tab)}
        className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${
          active === tab ? 'bg-white text-black' : 'text-gray-600 border-b-transparent hover:text-gray-900'
        }`}
      >
        {tab} 
      </button>
    ))}
    {menuIcon && (
      <div className="ml-auto pr-3 text-gray-400 cursor-pointer hover:text-gray-600">
        <MenuIcon />
      </div>
    )}
  </div>
);

const NewsQuotesTabs = () => {
  const [active, setActive] = useState('News');
  
  const newsItems = [
    { id: 1, title: 'ANALYSIS-Under global spotlight, Australia plays har...', source: 'Reuters', time: '5h ago', featured: true },
    { id: 2, title: 'Zoom Operating Chief to Leave for Intel Exce Role', source: 'Dow Jones', time: '5h ago', featured: false },
    { id: 3, title: 'ANALYSIS-Under global spotlight, Australia plays har...', source: 'Reuters', time: '5h ago', featured: false },
    { id: 4, title: 'ANALYSIS-Under global spotlight, Australia plays har...', source: 'Reuters', time: '5h ago', featured: false },
    { id: 5, title: 'ANALYSIS-Under global spotlight, Australia plays har...', source: 'Reuters', time: '5h ago', featured: false },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TabBar tabs={['News', 'Quotes']} active={active} onSelect={setActive} />
      {active === 'News' ? (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-0 p-4">
            {newsItems.map((item) => (
              <div
                key={item.id} 
                className={`p-3 border-b border-[#EDE8F2] cursor-pointer hover:opacity-80 transition-opacity ${
                  item.featured ? 'bg-[#EDE8F2] rounded' : 'bg-transparent'
                }`}
              >
                <h3 className="text-xs font-medium text-black mb-1.5 tracking-wider">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#7F7F7F] text-[10px]"> 
                  <span className="font-normal">{item.source}</span>
                  <span>•</span>
                  <span className="font-normal">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-300 text-sm">
          Quotes Panel
        </div>
      )}
    </div>
  ); 
};

const MarketDataTabs = () => {
  const [active, setActive] = useState('Tops');
  const [subActive, setSubActive] = useState('Top Gainers');
  const mainTabs = ['Tops', 'Active', 'ETFs', 'Top Options', 'Bonds', 'Futures', 'Crypto', 'Events', '52 Week', 'Popular Stocks', 'Marginable', 'OTC', '24H Market'];
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center border-b border-gray-200 bg-[#f7f7f7] shrink-0 overflow-x-auto scrollbar-none">
        {mainTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${
              active === tab ? 'bg-white text-black' : 'text-gray-600 border-b-transparent hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto pr-3 text-gray-400 cursor-pointer hover:text-gray-600 shrink-0">
          <MenuIcon />
        </div>
      </div>
      <div className="flex items-center gap-1 px-3 py-1 border-b border-gray-100 shrink-0 bg-white">
        {['Top Gainers', 'Tab Losers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSubActive(tab)}
            className={`px-4 py-1.5 text-xs font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${
              subActive === tab ? 'bg-[#f7f7f7] text-black' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
        <span className="ml-auto text-xs font-semibold text-indigo-600 px-2">SLV</span>
        <button className="text-xs text-indigo-600 border border-indigo-300 rounded px-2 py-0.5 hover:bg-indigo-50">+ Add Symbol</button>
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-300 text-sm">
        Market Data Table
      </div>
    </div>
  );
};

const TradeTabs = () => {
  const [active, setActive] = useState('Trade');
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TabBar tabs={['Trade', 'TurboTrader', 'Ladder']} active={active} onSelect={setActive} />
      <div className="flex-1 flex items-center justify-center text-gray-300 text-sm">
        {active} Panel
      </div>
    </div>
  );
};

const MarketsPage = () => { 
  // Top row column widths (percentages)
  const [col1Width, setCol1Width] = useState(40);
  const [col2Width, setCol2Width] = useState(30);
  // col3 = 100 - col1 - col2 (fills remaining)

  // Top / bottom row height split
  const [topHeight, setTopHeight] = useState(55);
  // bottomHeight is handled by flex-1

  // Bottom row column widths
  const [botCol1Width, setBotCol1Width] = useState(70);
  // botCol2 fills remaining

  return (
    <div className="w-full h-screen bg-white overflow-hidden flex flex-col gap-1 p-1">

      {/* ── TOP ROW ── */}
      <Resizable
        size={{ width: '100%', height: `${topHeight}%` }}
        minHeight="20%"
        maxHeight="80%"
        enable={{
          top: false, right: false, bottom: true, left: false,
          topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
        }}
        onResizeStop={(e, direction, ref) => {
          const containerHeight = ref.parentElement.clientHeight;
          const pct = (ref.clientHeight / containerHeight) * 100;
          setTopHeight(Math.max(20, Math.min(80, pct)));
        }}
        className="flex gap-1 overflow-hidden"
      >
        {/* Top Col 1 – 4/10 */}
        <Resizable
          size={{ width: `${col1Width}%`, height: '100%' }}
          minWidth="15%"
          maxWidth="65%"
          enable={{
            top: false, right: true, bottom: false, left: false,
            topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
          }}
          onResizeStop={(e, direction, ref) => {
            const containerWidth = ref.parentElement.clientWidth;
            const pct = (ref.clientWidth / containerWidth) * 100;
            setCol1Width(Math.max(15, Math.min(65, pct)));
          }}
          className="bg-white border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col"
        >
          <IndexChart />
        </Resizable>

        {/* Top Col 2 – 3/10 */}
        <Resizable
          size={{ width: `${col2Width}%`, height: '100%' }}
          minWidth="15%"
          maxWidth="60%"
          enable={{
            top: false, right: true, bottom: false, left: false,
            topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
          }}
          onResizeStop={(e, direction, ref) => {
            const containerWidth = ref.parentElement.clientWidth;
            const pct = (ref.clientWidth / containerWidth) * 100;
            setCol2Width(Math.max(15, Math.min(60, pct)));
          }}
          className="bg-white border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col"
        >
          <GlobalMap />
        </Resizable>

        {/* Top Col 3 – 3/10 (fills remaining) */}
        <div className="flex-1 bg-white border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col min-w-[15%]">
          {/* Tab bar */}
          <NewsQuotesTabs />
        </div>
      </Resizable>

      {/* ── BOTTOM ROW ── */}
      <div className="flex-1 flex gap-1 overflow-hidden">

        {/* Bottom Col 1 – 7/10 */}
        <Resizable
          size={{ width: `${botCol1Width}%`, height: '100%' }} 
          minWidth="20%"
          maxWidth="85%"
          enable={{
            top: false, right: true, bottom: false, left: false,
            topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
          }}
          onResizeStop={(e, direction, ref) => {
            const containerWidth = ref.parentElement.clientWidth;
            const pct = (ref.clientWidth / containerWidth) * 100;
            setBotCol1Width(Math.max(20, Math.min(85, pct)));
          }}
          className="bg-white border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col"
        >
          <MarketDataTabs />
        </Resizable>

        {/* Bottom Col 2 – 3/10 (fills remaining) */}
        <div className="flex-1 bg-white border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col min-w-[15%]">
          <TradeTabs />
        </div>
      </div>

    </div>
  );
};

export default MarketsPage;