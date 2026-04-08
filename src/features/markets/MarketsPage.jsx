
import { useState } from 'react';
import { Resizable } from 're-resizable';
import { SquareCheckBig } from 'lucide-react';
import { ArrowDown, HamburgerIcon } from "../../utils/SvgCode";
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
        className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${active === tab ? 'bg-white text-black' : 'text-gray-600 border-b-transparent hover:text-gray-900'
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
    <div className="flex flex-col h-full overflow-hidden" style={{ background: 'conic-gradient(from 20deg at 48.04% 45.06%, #FFF 0deg, #FFFDF5 167.88461208343506deg, #FFFDF5 194.79776859283447deg, #FEFFFA 360deg)' }}>
      <TabBar tabs={['News', 'Quotes']} active={active} onSelect={setActive} />
      {active === 'News' ? (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-0 p-4">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className={`p-3 border-b border-[#EDE8F2] cursor-pointer hover:opacity-80 transition-opacity ${item.featured ? 'bg-[#EDE8F2] rounded' : 'bg-transparent'
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

  const gainersData = [
    { symbol: 'SKYO', name: 'Sky Quarry L...', price: '5.57', change: '+135.67%', volume: '206.13%', marketCap: '19.16M' },
    { symbol: 'Alpha Nexus', name: 'Stone Ridge...', price: '2323', change: '+142.30%', volume: '230.50%', marketCap: '30.12M' },
    { symbol: 'Beta Wave', name: 'Granite Peak...', price: '2323', change: '+142.30%', volume: '240.00%', marketCap: '28.45M' },
    { symbol: 'Gamma Stream', name: 'Granite Sum...', price: '3432.00', change: '+110.89%', volume: '250.00%', marketCap: '35.00M' },
    { symbol: 'Gamma Stream', name: 'Granite Sum...', price: '3432.00', change: '+110.89%', volume: '250.00%', marketCap: '35.00M' },
    { symbol: 'Beta Wave', name: 'Granite Peak...', price: '2323', change: '+142.30%', volume: '240.00%', marketCap: '28.45M' },
  ];

  const losersData = gainersData.map(item => ({
    ...item,
    change: item.change.replace('+', '-'),
  }));

  const tableData = subActive === 'Top Gainers' ? gainersData : losersData;
  const isGainers = subActive === 'Top Gainers';
  const changeColor = isGainers ? 'text-green-500' : 'text-red-500';

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
              <SquareCheckBig size={16} color='#616161' />
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
          <div className="left-sec w-1/10"> 
            <HamburgerIcon />
          </div> 
          <div className="right-sec w-full">
            <table className="w-full text-xs">
              <thead className="bg-[#EDE8F2] sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-xs text-left font-medium text-black relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[16px] after:w-[1.5px] after:bg-[#AE97C5]">Symbol</th>
                  <th className="px-4 py-2 text-xs text-left font-medium text-black relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[16px] after:w-[1.5px] after:bg-[#AE97C5]">Name</th>
                  <th className="px-4 py-2 text-xs text-left font-medium text-black relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[16px] after:w-[1.5px] after:bg-[#AE97C5]">PM Price</th>
                  <th className="px-4 py-2 text-xs text-left font-medium text-black relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[16px] after:w-[1.5px] after:bg-[#AE97C5]">Sparkline</th>
                  <th className="px-4 py-2 text-xs text-left font-medium text-black relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[16px] after:w-[1.5px] after:bg-[#AE97C5]">% Change</th>
                  <th className="px-4 py-2 text-xs text-left font-medium text-black relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[16px] after:w-[1.5px] after:bg-[#AE97C5]">Volume</th>
                  <th className="px-4 py-2 text-xs text-left font-medium text-black relative">Market Cap</th> 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-4 py-2 text-[#616161] font-normal">{row.symbol}</td>
                    <td className="px-4 py-2 text-[#616161] font-normal">{row.name}</td>
                    <td className="px-4 py-2 text-[#17B667] font-normal">{row.price}</td>
                    <td className="px-4 py-2">
                      <svg width="60" height="20" viewBox="0 0 60 20" className="h-5">
                        <polyline
                          points="0,15 10,10 20,5 30,8 40,3 50,6 60,2"
                          fill="none"
                          stroke={isGainers ? '#17B667' : '#ef4444'}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </td>
                    <td className={`px-4 py-2 font-medium ${changeColor}`}>
                      {row.change}
                    </td>
                    <td className="px-4 py-2 text-gray-700">{row.volume}</td>
                    <td className="px-4 py-2 text-gray-700">{row.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

const TradeTabs = () => {
  const [active, setActive] = useState('Trade');
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: 'conic-gradient(from 20deg at 48.04% 45.06%, #FFF 0deg, #FFFDF5 167.88461208343506deg, #FFFDF5 194.79776859283447deg, #FEFFFA 360deg)' }}>
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
          className="border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col"
          style={{ background: 'linear-gradient(78deg, #FFF 12.93%, #FFFDF4 33.04%, #FFFEFB 64.09%, #FFF 88.77%)' }}
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
          className="border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col"
        >
          <GlobalMap />
        </Resizable>

        {/* Top Col 3 – 3/10 (fills remaining) */}
        <div className="flex-1 border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col min-w-[15%]">
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
          className="border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col"
        >
          <MarketDataTabs />
        </Resizable>

        {/* Bottom Col 2 – 3/10 (fills remaining) */}
        <div className="flex-1 border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col min-w-[15%]">
          <TradeTabs />
        </div>
      </div>

    </div>
  );
};

export default MarketsPage;