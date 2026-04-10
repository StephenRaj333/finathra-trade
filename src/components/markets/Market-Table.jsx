import {useState} from 'react';
import { SquareCheckBig } from 'lucide-react';
import { ArrowDown, HamburgerIcon } from "../../utils/SvgCode";
import { gainersData, losersData } from '../../utils/placeholder-data'; 
import { MenuIcon } from '../../utils/SvgCode';

const MarketDataTabs = () => {   
  const [active, setActive] = useState('Tops');
  const [subActive, setSubActive] = useState('Top Gainers');
  const mainTabs = ['Tops', 'Active', 'ETFs', 'Top Options', 'Bonds', 'Futures', 'Crypto', 'Events', '52 Week', 'Popular Stocks', 'Marginable', 'OTC', '24H Market'];

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

export default MarketDataTabs;