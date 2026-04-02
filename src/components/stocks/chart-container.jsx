import { useState } from 'react';
import CandlestickChart from './CandleChart';
import { Star, MoreVertical, RotateCcw } from 'lucide-react';
import ChartControls from './chart-controls';



const ChartContainer = ({ gridLayout = 1, onGridChange }) => {
    const [chartType, setChartType] = useState('candles');
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    return (
        <>
            <ChartControls chartType={chartType} onChartTypeChange={setChartType} gridLayout={gridLayout} onGridChange={onGridChange} />

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
            <div className="flex-1 overflow-hidden">
                {gridLayout === 1 && (
                    <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                )}
                {gridLayout === 2 && (
                    <div className="flex h-full">
                        <div className="flex-1 border-r border-gray-200 overflow-auto">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="flex-1 overflow-auto">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                    </div>
                )}
                {gridLayout === 3 && (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 border-b border-gray-200 overflow-auto">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="flex flex-1 overflow-hidden">
                            <div className="flex-1 border-r border-gray-200 overflow-auto">
                                <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                            </div>
                            <div className="flex-1 overflow-auto">
                                <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                            </div>
                        </div>
                    </div>
                )}
                {gridLayout === 4 && (
                    <div className="grid grid-cols-2 grid-rows-2 h-full">
                        <div className="border-r border-b border-gray-200 overflow-auto">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="border-b border-gray-200 overflow-auto">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="border-r border-gray-200 overflow-auto">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="overflow-auto">
                            <CandlestickChart symbol="XAUUSD" chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                    </div>
                )}
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
        </>
    )
}

export default ChartContainer;