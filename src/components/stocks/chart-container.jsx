import { useState } from 'react';
import CandlestickChart from './CandleChart';
import { Star, MoreVertical, RotateCcw , ChevronUp } from 'lucide-react';
import ChartControls from './chart-controls';



const ChartContainer = ({ gridLayout = 1, onGridChange }) => {
    const [chartType, setChartType] = useState('candles');
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    return (
        <div className="flex flex-col h-full w-full">
            <ChartControls chartType={chartType} onChartTypeChange={setChartType} gridLayout={gridLayout} onGridChange={onGridChange} />

            {/* Stock Info Header */}
            <div className="flex items-center justify-between flex-wrap gap-2 px-2 lg:px-4 py-1.5 bg-white">
                <div className="flex items-center flex-wrap gap-2 lg:gap-4 pt-3">
                    <div className="flex items-center gap-1.5 min-w-0 border border-[#EDE8F2] rounded-md p-2">  
                        <h3 className="font-semibold text-xs text-gray-900 truncate pr-1 lg:pr-2 border-r border-[#EDE8F2]">XAUUSD Gold/USD</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap pl-1 lg:pl-2 pr-1 lg:pr-2 border-r border-[#EDE8F2]">30 Min</span>
                        <button className="flex-shrink-0 pl-1 lg:pl-2 pr-1 lg:pr-2 border-r border-[#EDE8F2]">
                            <Star size={14} fill="#4F1D81" />
                        </button>
                        <button
                            onClick={() => setShowMoreMenu(!showMoreMenu)}
                            className="text-gray-400 hover:text-gray-600 flex-shrink-0 relative pl-1 lg:pl-2"
                        >
                            <MoreVertical size={14} color='#28303F' className="lg:size-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Technical Indicators */}
            <div className="flex items-center flex-wrap gap-2 px-2 lg:px-4 py-1 lg:py-2 text-xs overflow-x-auto">
                <div className="flex items-center gap-1 whitespace-nowrap">
                    <span className="text-green-600 font-semibold text-xs">O 4000</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                    <span className="text-red-600 font-semibold text-xs">H 4100</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                    <span className="text-green-600 font-semibold text-xs">L 4100</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                    <span className="text-red-600 font-semibold text-xs">C 4100</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                    <span className="text-[black] font-semibold text-xs">+24% (+0.68%)</span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 overflow-hidden min-h-0"> 
                {gridLayout === 1 && (
                    <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                )}
                {gridLayout === 2 && (
                    <div className="flex h-full min-h-0">
                        <div className="flex-1 border-r border-gray-200 overflow-hidden min-h-0">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="flex-1 overflow-hidden min-h-0">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                    </div>
                )}
                {gridLayout === 3 && (
                    <div className="flex flex-col h-full min-h-0">
                        <div className="flex-1 border-b border-gray-200 overflow-hidden min-h-0">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="flex flex-1 overflow-hidden min-h-0">
                            <div className="flex-1 border-r border-gray-200 overflow-hidden min-h-0">
                                <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                            </div>
                            <div className="flex-1 overflow-hidden min-h-0">
                                <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                            </div>
                        </div>
                    </div>
                )}
                {gridLayout === 4 && (
                    <div className="grid grid-cols-2 grid-rows-2 h-full min-h-0">
                        <div className="border-r border-b border-gray-200 overflow-hidden min-h-0">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="border-b border-gray-200 overflow-hidden min-h-0">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="border-r border-gray-200 overflow-hidden min-h-0">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="overflow-hidden min-h-0">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="overflow-x-auto bg-[#EDE8F2] flex items-center justify-between gap-2 border-t border-gray-200">
                <div className='flex items-center justify-start gap-1 px-2 lg:px-4 py-2 lg:py-3 border-t border-gray-200'>
                <div className="flex items-center gap-1 flex-wrap">
                    <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Range:</span>
                        <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap">1D</button>
                        <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden sm:inline">5D</button>
                        <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap flex items-end gap-0.5">1M <ChevronUp strokeWidth={3} size={14} /></button>
                    </div>
                </div>

                <div className="flex items-center gap-1 lg:gap-2 flex-wrap text-xs relative">
                    <span className="font-medium text-gray-600 whitespace-nowrap hidden md:inline mx-2">|</span>
                    <span className="font-medium text-gray-600 whitespace-nowrap hidden md:inline">Interval:</span>
                    <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap">1m</button>
                    <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden sm:inline">5m</button>
                    <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden md:inline">15m</button>
                    <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden lg:inline">30M</button>
                    <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden lg:inline">1H</button>
                    <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden xl:inline">4H</button>
                    <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden xl:inline">D</button>
                    <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden xl:inline">W</button>
                    <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap flex items-end gap-0.5">M <ChevronUp strokeWidth={3} size={14} /></button>
                </div>
                </div>
                <button className="flex items-center gap-1 lg:gap-2 text-xs px-2 lg:px-3 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap flex-shrink-0">
                    <RotateCcw size={12} className="lg:size-3.5" />
                    <span className="hidden sm:inline">Reset Chart</span>
                </button>
            </div>
        </div>  
    )
}

export default ChartContainer;