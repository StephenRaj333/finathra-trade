
import { useState } from 'react';
import { Resizable } from 're-resizable';
import { Menu, Star, MoreVertical, RotateCcw, ChevronDown, Clipboard, Bell } from 'lucide-react';
import CandlestickChart from '../../components/candleChart';

const icons = [
  {
    icons: "/icons/graph.png",
    label: 'Chart',
  },
  {
    icons: "/icons/candles.png",
    label: 'Option',
  },
  {
    icons: "/icons/coin.png", 
    label: 'Related',
  },
  {
    icons: "/icons/edit.png",
    label: 'Note',
  },
  {
    icons: "/icons/grid.png",
    label: 'News',
  },
  {
    icons: "/icons/vs.png",
    label: 'Comments',
  },
  {
    icons: "/icons/youtube.png",
    label: 'Financials',
  },
  {
    icons: "/icons/cloud.png",
    label: 'Analysis',
  }
]

const StocksPage = () => {
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [activeBottomTab, setActiveBottomTab] = useState('order');
  const [activeRightTopTab, setActiveRightTopTab] = useState('quotes');
  const [chartType, setChartType] = useState('candles');
  const [showChartTypeDropdown, setShowChartTypeDropdown] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const chartTypes = ['candles', 'line', 'bars', 'area', 'baseline', 'histogram'];

  const handleLeftResize = (e, direction, ref, delta) => {
    const containerWidth = ref.parentElement.clientWidth;
    const newWidth = (ref.clientWidth / containerWidth) * 100;
    setLeftWidth(Math.max(20, Math.min(80, newWidth)));
  };

  const rightWidth = 100 - leftWidth;

  return (
    <div className="w-full h-screen bg-white overflow-hidden">
      <div className="flex gap-2 h-full">
        {/* LEFT BLOCK */}
        <Resizable
          size={{
            width: `${leftWidth}%`,
            height: '100%',
          }}
          onResizeStop={handleLeftResize}
          minWidth="20%"
          maxWidth="80%"
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          className="bg-gray-50 rounded-lg p-4 overflow-hidden border-2 border-gray-200"
        >
          <div className="flex flex-col h-full gap-4">
            {/* Left Top */}
            <Resizable
              defaultSize={{
                width: '100%',
                height: '75%',
              }}
              minHeight="15%"
              maxHeight="85%"
              enable={{
                top: false,
                right: false,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
            >
              {/* Header Tabs */}
              <div className="flex items-center flex-wrap gap-4 px-2 lg:px-4 py-2 lg:py-3 border-b border-gray-200 bg-gray-50 overflow-x-auto">
                <button className="text-xs lg:text-xs font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap pb-2 border-b-2 border-purple-600">Chart</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden sm:inline">Option</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden sm:inline">Related</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden md:inline">Note</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden lg:inline">News</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden lg:inline">Comments</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden xl:inline">Financials</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden xl:inline">Analysis</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden 2xl:inline">Corp Actions</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden 2xl:inline">Releases</button>
                <button className="text-xs lg:text-xs font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap pb-2 hidden 2xl:inline">Order Flow</button>
                <button className="ml-auto flex-shrink-0">
                  <Menu size={16} className="lg:size-5 text-gray-600 hover:text-gray-900" />
                </button>
              </div>

              {/* Toolbar with Icons */}
              <div className="flex items-center flex-wrap gap-1 lg:gap-2 px-2 lg:px-4 py-2 border-b border-gray-200 bg-[#EDE8F2]">
                <div className="flex gap-1 lg:gap-2 flex-wrap">
                  {icons?.map((item, i) => (
                    <button key={i} className="p-1 lg:p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900 flex-shrink-0">
                      <div className="w-3 h-3 lg:w-4 lg:h-4 rounded">
                        <img src={item.icons} alt={item.label} className="w-full h-full object-contain" />
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mr-auto flex items-center flex-wrap gap-1 lg:gap-2 text-xs text-gray-600">
                  <span className="hidden sm:inline">Volume</span>
                  <span className="text-gray-400 hidden sm:inline">|</span>
                  <span className="hidden md:inline">VWAP</span>
                  <span className="text-gray-400 hidden md:inline">|</span>
                  <span className="hidden lg:inline">MACD</span>
                  <span className="text-gray-400 hidden lg:inline">|</span>
                  <span className="hidden xl:inline">All indicators</span>
                  <span className="text-gray-400 hidden xl:inline">|</span>
                  <span className="hidden xl:inline">Script Editor</span>
                </div>
              </div>

              {/* Stock Info Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 px-2 lg:px-4 py-2 lg:py-3 border-b border-gray-200 bg-white">
                <div className="flex items-center flex-wrap gap-2 lg:gap-4">
                  <div className="flex items-center gap-1 lg:gap-2 min-w-0">
                    <h3 className="font-semibold text-xs text-gray-900 truncate">XAUUSD Gold/USD</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">30 Min</span>
                    <button className="flex-shrink-0">
                      <Star size={14} className="lg:size-4" fill="#4F1D81" />
                    </button>
                    <button 
                      onClick={() => setShowMoreMenu(!showMoreMenu)}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0 relative"
                    >
                      <MoreVertical size={14} className="lg:size-4" />
                      
                      {showMoreMenu && (
                        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-40">
                          <div className="p-2 border-b border-gray-100">
                            <p className="text-xs font-medium text-gray-500 px-3 py-1">Chart Type</p>
                          </div>
                          {chartTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setChartType(type);
                                setShowMoreMenu(false);
                              }}
                              className={`block w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors ${
                                chartType === type ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'
                              }`}
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                          ))}
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Technical Indicators */}
              <div className="flex items-center flex-wrap gap-2 lg:gap-6 px-2 lg:px-4 py-1 lg:py-2 border-b border-gray-200 text-xs overflow-x-auto">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-green-600 font-semibold">O 4000</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-red-600 font-semibold">H 4100</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-blue-600 font-semibold">L 4100</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-purple-600 font-semibold">C 4100</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="text-green-600 font-semibold">+24% (+0.68%)</span>
                </div>
              </div>

              {/* Chart Area */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
              </div>

              {/* Bottom Controls */}
              <div className="flex items-center justify-start gap-2 px-2 lg:px-4 py-2 lg:py-3 border-t border-gray-200 bg-gray-50 overflow-x-auto">
                <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
                  <div className="flex items-center gap-1 lg:gap-2 flex-wrap">
                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Range:</span>
                    <button className="text-xs px-1.5 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap">1D</button>
                    <button className="text-xs px-1.5 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden sm:inline">5D</button>
                    <button className="text-xs px-1.5 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden sm:inline">1M</button>
                  </div>
                </div>  

                <div className="flex items-center gap-1 lg:gap-2 flex-wrap text-xs relative">
                  <span className="font-medium text-gray-600 whitespace-nowrap hidden md:inline ml-2">|</span>
                  <span className="font-medium text-gray-600 whitespace-nowrap hidden md:inline">Interval:</span>
                  <button className="text-xs px-1 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap">1m</button>
                  <button className="text-xs px-1 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden sm:inline">5m</button>
                  <button className="text-xs px-1 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden md:inline">15m</button>
                  <button className="text-xs px-1 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden lg:inline">30M</button>
                  <button className="text-xs px-1 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden lg:inline">1H</button>
                  <button className="text-xs px-1 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden xl:inline">4H</button>
                  <button className="text-xs px-1 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden xl:inline">D</button>
                  <button className="text-xs px-1 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden xl:inline">W</button>
                  <button className="text-xs px-1 lg:px-2 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden 2xl:inline">M</button>
                </div>

                <button className="flex items-center gap-1 lg:gap-2 text-xs px-2 lg:px-3 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap flex-shrink-0">
                  <RotateCcw size={12} className="lg:size-3.5" />
                  <span className="hidden sm:inline">Reset Chart</span>
                </button>
              </div>
            </Resizable>

            {/* Left Bottom */}
            <Resizable
              defaultSize={{
                width: '100%',
                height: '25%',
              }}
              minHeight="15%"
              maxHeight="85%"
              enable={{
                top: false,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
            >
              {/* Tabs */}
              <div className="flex items-center gap-0 border-b border-gray-200 bg-gray-50">
                <button
                  onClick={() => setActiveBottomTab('order')}
                  className={`px-4 py-2 text-xs lg:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeBottomTab === 'order'
                      ? 'text-gray-900 border-b-purple-600'
                      : 'text-gray-600 border-b-transparent hover:text-gray-900'
                  }`}
                >
                  Order (Today)
                </button>
                <button
                  onClick={() => setActiveBottomTab('option')}
                  className={`px-4 py-2 text-xs lg:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeBottomTab === 'option'
                      ? 'text-gray-900 border-b-purple-600'
                      : 'text-gray-600 border-b-transparent hover:text-gray-900'
                  }`}
                >
                  Option
                </button>
                <button
                  onClick={() => setActiveBottomTab('related')}
                  className={`px-4 py-2 text-xs lg:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeBottomTab === 'related'
                      ? 'text-gray-900 border-b-purple-600'
                      : 'text-gray-600 border-b-transparent hover:text-gray-900'
                  }`}
                >
                  Related
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 flex items-center justify-center overflow-auto py-12">
                {activeBottomTab === 'order' && (
                  <div className="flex flex-col items-center justify-center px-4">
                    <div className="mb-4">
                        <img className='w-full h-full min-w-30 max-w-40' src="/account-opening.png" alt="Open Account" /> 
                    </div>
                    <h3 className="text-lg font-semibold text-[#4F1D81] mb-1">Open Account</h3>
                    <p className="text-sm text-[#7F7F7F]">to view orders</p>
                  </div>
                )}

                {activeBottomTab === 'option' && (
                  <div className="flex flex-col items-center justify-center px-4"> 
                    <div className="mb-4">
                      <Clipboard size={64} className="text-gray-300" strokeWidth={1} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#4F1D81] mb-1">Open Account</h3>
                    <p className="text-sm text-[#7F7F7F]">to view options</p>
                  </div>
                )}

                {activeBottomTab === 'related' && (
                  <div className="flex flex-col items-center justify-center px-4"> 
                    <div className="mb-4">
                      <Clipboard size={64} className="text-gray-300" strokeWidth={1} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#4F1D81] mb-1">Open Account</h3>
                    <p className="text-sm text-[#7F7F7F]">to view related items</p>
                  </div>
                )}
              </div>
            </Resizable>
          </div>
        </Resizable>

        {/* RIGHT BLOCK */}
        <Resizable
          size={{
            width: `${rightWidth}%`,
            height: '100%',
          }}
          onResizeStop={(e, direction, ref) => {
            const containerWidth = ref.parentElement.clientWidth;
            const newWidth = (ref.clientWidth / containerWidth) * 100;
            setLeftWidth(100 - Math.max(20, Math.min(80, newWidth)));
          }}
          minWidth="20%"
          maxWidth="80%"
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          className="bg-gray-50 rounded-lg p-4 overflow-hidden border-2 border-gray-200"
        >
          <div className="flex flex-col h-full gap-4">
            {/* Right Top */}
            <Resizable
              defaultSize={{
                width: '100%',
                height: '50%',
              }}
              minHeight="15%"
              maxHeight="85%"
              enable={{
                top: false,
                right: false,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
            >
              {/* Tabs */}
              <div className="flex items-center gap-0 border-b border-gray-200 bg-gray-50">
                <button
                  onClick={() => setActiveRightTopTab('quotes')}
                  className={`px-4 py-2 text-xs lg:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeRightTopTab === 'quotes'
                      ? 'text-gray-900 border-b-gray-900'
                      : 'text-gray-600 border-b-transparent hover:text-gray-900'
                  }`}
                >
                  Quotes
                </button>
                <button
                  onClick={() => setActiveRightTopTab('watchlist')}
                  className={`px-4 py-2 text-xs lg:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeRightTopTab === 'watchlist'
                      ? 'text-gray-900 border-b-gray-900'
                      : 'text-gray-600 border-b-transparent hover:text-gray-900'
                  }`}
                >
                  Watchlist
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-auto">
                {activeRightTopTab === 'quotes' && (
                  <div className="p-6">
                    {/* Top Icons */}
                    <div className="flex justify-end gap-2 mb-6">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Star size={20} className="fill-gray-300" strokeWidth={1.5} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Bell size={20} strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Price Display */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <h2 className="text-4xl font-bold text-green-600">4560.65</h2>
                        <span className="text-lg font-semibold text-green-600">+45.65</span>
                        <span className="text-sm text-green-600 font-medium">+1.10%</span>
                      </div>
                      <p className="text-xs text-gray-500">Open, 03/31 06:10 EDT</p>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Open</p>
                        <p className="text-sm font-semibold text-green-600">4,510.95</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">High</p>
                        <p className="text-sm font-semibold text-green-600">4,510.95</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Low</p>
                        <p className="text-sm font-semibold text-red-600">4,510.95</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Prev Close</p>
                        <p className="text-sm font-semibold text-red-600">4,510.95</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">52 Wk High</p>
                        <p className="text-sm font-semibold text-gray-900">4,510.95</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">52 Wk Low</p>
                        <p className="text-sm font-semibold text-gray-900">4,510.95</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Volume</p>
                        <p className="text-sm font-semibold text-gray-900">0.00</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Market Cap</p>
                        <p className="text-sm font-semibold text-gray-900">0.00</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeRightTopTab === 'watchlist' && (
                  <div className="p-6">
                    <div className="flex flex-col items-center justify-center py-12">
                      <Clipboard size={48} className="text-gray-300 mb-3" strokeWidth={1} />
                      <h3 className="text-lg font-semibold text-gray-700 mb-1">Watchlist Empty</h3>
                      <p className="text-sm text-gray-500">Add symbols to your watchlist</p>
                    </div>
                  </div>
                )}
              </div>
            </Resizable>

            {/* Right Bottom Split */}
            <div className="flex-1 flex gap-4 overflow-hidden">
              {/* Right Bottom Left */}
              <Resizable
                defaultSize={{
                  width: '50%',
                  height: '100%',
                }}
                minWidth="15%"
                maxWidth="85%"
                enable={{
                  top: false,
                  right: true,
                  bottom: false,
                  left: false,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false,
                }}
                className="bg-gray-50 rounded-lg p-4 overflow-hidden border-2 border-gray-200"
              >
                <div className="flex flex-col h-full gap-4">
                  {/* Right Bottom Left Top */}
                  <Resizable
                    defaultSize={{
                      width: '100%',
                      height: '50%',
                    }}
                    minHeight="15%"
                    maxHeight="85%"
                    enable={{
                      top: false,
                      right: false,
                      bottom: true,
                      left: false,
                      topRight: false,
                      bottomRight: false,
                      bottomLeft: false,
                      topLeft: false,
                    }}
                    className="bg-white border-2 border-gray-200 rounded-lg overflow-auto"
                  >
                    <div className="p-4">
                      <h3 className="font-bold text-gray-700 mb-2">Right Bottom - Left Top</h3>
                      <p className="text-gray-600 text-sm">Resizable content area</p>
                    </div>
                  </Resizable>

                  {/* Right Bottom Left Bottom */}
                  <Resizable
                    defaultSize={{
                      width: '100%',
                      height: '50%',
                    }}
                    minHeight="15%"
                    maxHeight="85%"
                    enable={{
                      top: false,
                      right: false,
                      bottom: false,
                      left: false,
                      topRight: false,
                      bottomRight: false,
                      bottomLeft: false,
                      topLeft: false,
                    }}
                    className="bg-white border-2 border-gray-200 rounded-lg overflow-auto"
                  >
                    <div className="p-4">
                      <h3 className="font-bold text-gray-700 mb-2">Right Bottom - Left Bottom</h3>
                      <p className="text-gray-600 text-sm">Resizable content area</p>
                    </div>
                  </Resizable>
                </div>
              </Resizable>

              {/* Right Bottom Right */}
              <Resizable
                defaultSize={{
                  width: '50%',
                  height: '100%',
                }}
                minWidth="15%"
                maxWidth="85%"
                enable={{
                  top: false,
                  right: false,
                  bottom: false,
                  left: true,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false,
                }}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-auto"
              >
                <div className="p-4">
                  <h3 className="font-bold text-gray-700 mb-2">Right Bottom - Right</h3>
                  <p className="text-gray-600 text-sm">Drag the divider to the left to resize</p>
                </div>
              </Resizable>
            </div>
          </div>
        </Resizable>
      </div>
    </div>
  );
};

export default StocksPage;