
import { useState } from 'react';
import { Resizable } from 're-resizable';
import IndexChart from '../../components/markets/IndexChart';
import GlobalMap from '../../components/markets/GlobalMap';
import HeatMap from '../../components/markets/HeatMap'; 
import IndustryChart from '../../components/markets/IndustryChart'; 
import IndustryDetails from '../../components/markets/IndustryDetails'; 
import MarketDataTabs from '../../components/markets/Market-Table';
import { MenuIcon } from '../../utils/SvgCode';

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



const CalenderIpo = () => {
  const [mainActive, setMainActive] = useState('Calendar');
  const [subActive, setSubActive] = useState('Available');
  const subTabs = ['Available', 'Upcoming', 'Filed', 'Listed', 'Up'];
  
  const tableData = [ 
    { symbol: 'BWGC', name: 'Titanium Ventures Ltd.' },
    { symbol: 'AXTN', name: 'NovaGen Therapeutics Inc.' },
    { symbol: 'TVCN', name: 'AeroTech Innovations Corp.' },
    { symbol: 'CDIX', name: 'EcoWave Energy Solutions Inc.' },
    { symbol: 'UNIU', name: 'Quantum Dynamics Holdings LLC.' },
    { symbol: 'UNID', name: 'Vertex Robotics Inc.' },
  ];
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Main Tabs - Calendar & IPO */}
      <TabBar tabs={['Calendar', 'IPO']} active={mainActive} onSelect={setMainActive} />
      
      {mainActive === 'Calendar' ? (
        <>
          {/* Sub Tabs with Slider Indicator */}
          <div className="left-sec relative border-b border-gray-200 bg-white">
            {/* Sliding Indicator */}
            <div
              className={`absolute bottom-0 left-0 h-px bg-[#724A9A] transition-all duration-300 ease-out`}
              style={{
                width: `${(1 / subTabs.length) * 100}%`,
                transform: `translateX(${subTabs.indexOf(subActive) * 100}%)`
              }}
            />
            <div className="flex relative z-10">
              {subTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSubActive(tab)}
                  className={`flex-1 px-3 py-2 text-xs font-normal transition-colors whitespace-nowrap text-center ${
                    subActive === tab
                      ? 'text-[#724A9A]'
                      : 'text-[#7F7F7F]' 
                  }`}
                >
                  {tab}
                </button> 
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#EDE8F2] border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-xs text-left font-medium tracking-wide text-black font-medium relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[16px] after:w-[2px] after:bg-[#AE97C5]">Symbol</th>
                  <th className="px-4 py-3 text-xs text-left font-medium tracking-wide text-black font-medium">Name</th> 
                </tr> 
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tableData.map((row, idx) => ( 
                  <tr key={idx} className="hover:bg-gray-50 transition-colors cursor-pointer"> 
                    <td className="px-4 py-3 text-[#616161] font-normal">{row.symbol}</td>
                    <td className="px-4 py-3 text-[#616161] font-normal">{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* IPO Panel */
        <div className="flex-1 flex items-center justify-center text-gray-300 text-sm">
          IPO Panel
        </div>
      )}
    </div>
  );
};

const MarketsPage = () => {
  // Top row column widths (percentages)
  const [col1Width, setCol1Width] = useState(40);
  const [col2Width, setCol2Width] = useState(30);

  // Row heights
  const [topHeight, setTopHeight] = useState(45);
  const [midHeight, setMidHeight] = useState(30);
  // Third row = 100 - topHeight - midHeight 

  // Middle row column widths
  const [botCol1Width, setBotCol1Width] = useState(70);

  // Third row column widths
  const [thirdCol1Width, setThirdCol1Width] = useState(40);
  const [thirdCol2Width, setThirdCol2Width] = useState(29.5);

  return (
    <div className="w-full bg-white overflow-y-auto flex flex-col gap-1 p-1"> 

      {/* ── TOP ROW ── */}
      <Resizable
        size={{ width: '100%', height: '400px' }}
        minHeight="200px"
        maxHeight="800px"
        enable={{
          top: false, right: false, bottom: true, left: false,
          topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
        }}
        onResizeStop={(e, direction, ref) => {
          setTopHeight(ref.clientHeight);
        }}
        className="flex gap-1 overflow-hidden shrink-0"
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

        {/* Top Col 3 – fills remaining */}
        <div className="flex-1 border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col min-w-[15%]">
          <NewsQuotesTabs />
        </div>
      </Resizable>

      {/* ── MIDDLE ROW ── */}
      <Resizable
        size={{ width: '100%', height: '400px' }}
        minHeight="200px"
        maxHeight="800px"
        enable={{
          top: false, right: false, bottom: true, left: false,
          topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
        }}
        onResizeStop={(e, direction, ref) => {
          setMidHeight(ref.clientHeight);
        }}
        className="flex gap-1 overflow-hidden shrink-0"
      >
        {/* Middle Col 1 – 7/10 */}
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

        {/* Middle Col 2 – fills remaining */}
        <div className="flex-1 border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col min-w-[15%]">
          <CalenderIpo /> 
        </div>
      </Resizable>

      {/* ── THIRD ROW ── */}
      <div className="h-[400px] shrink-0 flex gap-1 overflow-hidden">
        {/* Third Col 1 – 1/3 */}
        <Resizable
          size={{ width: `${thirdCol1Width}%`, height: '100%' }}
          minWidth="15%"
          maxWidth="70%"
          enable={{
            top: false, right: true, bottom: false, left: false,
            topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
          }}
          onResizeStop={(e, direction, ref) => {
            const containerWidth = ref.parentElement.clientWidth;
            const pct = (ref.clientWidth / containerWidth) * 100;
            setThirdCol1Width(Math.max(15, Math.min(70, pct)));
          }}
          className="border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col"
        >
          <HeatMap />
        </Resizable>

        {/* Third Col 2 – 1/3 , third row */} 
        <Resizable
          size={{ width: `${thirdCol2Width}%`, height: '100%' }}
          minWidth="15%"
          maxWidth="70%"
          enable={{
            top: false, right: true, bottom: false, left: false,
            topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
          }}
          onResizeStop={(e, direction, ref) => {
            const containerWidth = ref.parentElement.clientWidth;
            const pct = (ref.clientWidth / containerWidth) * 100;
            setThirdCol2Width(Math.max(15, Math.min(70, pct)));
          }}
          className="border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col"
        >
          <IndustryChart />
        </Resizable>

        {/* Third Col 3 – fills remaining */}
        <div className="flex-1 border-2 border-[#EDE8F2] rounded-lg overflow-hidden flex flex-col min-w-[15%]">
          <IndustryDetails />
        </div>
      </div>

    </div>
  );
};

export default MarketsPage;