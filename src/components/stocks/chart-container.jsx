import { useState } from 'react';
import CandlestickChart from './CandleChart';
import { RotateCcw , ChevronUp } from 'lucide-react';
import ChartToolbar from './chart-toolbar';
import ChartSlot from './ChartSlot';



const ChartContainer = ({ gridLayout = 1, onGridChange }) => {
    const [chartType, setChartType] = useState('candles');
    // Persist selected symbols for up to 3 extra slots (indices 0–2)
    const [slotSymbols, setSlotSymbols] = useState([null, null, null]);

    const handleSlotSelect = (slotIndex, symbol) => {
        setSlotSymbols(prev => {
            const next = [...prev];
            next[slotIndex] = symbol;
            return next; 
        });
    };

    return (
        <div className="flex flex-col h-full w-full" style={{background: 'conic-gradient(from 20deg at 48.04% 45.06%, #FFF 0deg, #FFFDF5 167.88461208343506deg, #FFFDF5 194.79776859283447deg, #FEFFFA 360deg)'}}>
            <ChartToolbar chartType={chartType} onChartTypeChange={setChartType} gridLayout={gridLayout} onGridChange={onGridChange} />

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
                            <ChartSlot slotIndex={0} selectedSymbol={slotSymbols[0]} onSelect={handleSlotSelect} chartType={chartType} onChartTypeChange={setChartType} />
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
                                <ChartSlot slotIndex={0} selectedSymbol={slotSymbols[0]} onSelect={handleSlotSelect} chartType={chartType} onChartTypeChange={setChartType} />
                            </div>
                            <div className="flex-1 overflow-hidden min-h-0">
                                <ChartSlot slotIndex={1} selectedSymbol={slotSymbols[1]} onSelect={handleSlotSelect} chartType={chartType} onChartTypeChange={setChartType} />
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
                            <ChartSlot slotIndex={0} selectedSymbol={slotSymbols[0]} onSelect={handleSlotSelect} chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="border-r border-gray-200 overflow-hidden min-h-0">
                            <ChartSlot slotIndex={1} selectedSymbol={slotSymbols[1]} onSelect={handleSlotSelect} chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                        <div className="overflow-hidden min-h-0">
                            <ChartSlot slotIndex={2} selectedSymbol={slotSymbols[2]} onSelect={handleSlotSelect} chartType={chartType} onChartTypeChange={setChartType} />
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="overflow-x-auto bg-[#EDE8F2] flex items-center justify-between gap-2 border-t border-gray-200">
                <div className='flex items-center justify-start gap-1 px-2 lg:px-4 py-2 lg:py-3 border-t border-gray-200'>
                <div className="flex items-center gap-1 flex-wrap">
                    <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-xs font-medium text-[black] whitespace-nowrap">Range:</span>
                        <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap">1D</button>
                        <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap hidden sm:inline">5D</button>
                        <button className="text-xs px-1 py-0.5 lg:py-1 text-gray-600 hover:bg-gray-200 rounded whitespace-nowrap flex items-end gap-0.5">1M <ChevronUp strokeWidth={3} size={14} /></button>
                    </div>
                </div>

                <div className="flex items-center gap-1 lg:gap-2 flex-wrap text-xs relative">
                    <span className="font-medium text-gray-600 whitespace-nowrap hidden md:inline mx-2">|</span>
                    <span className="font-medium text-[black] whitespace-nowrap hidden md:inline">Interval:</span>
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