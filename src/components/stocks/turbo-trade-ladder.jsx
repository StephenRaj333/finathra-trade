import { ChevronDown, Menu, Info, Layers, Pencil } from 'lucide-react';
import { useState } from 'react';

const TurboTradeLadder = () => {
    const [activeTradeTab, setActiveTradeTab] = useState('trade');
    const [buySellMode, setBuySellMode] = useState('buy');
    const [orderType, setOrderType] = useState('limit');
    const [limitPrice, setLimitPrice] = useState('4565.56');
    const [stopLossChecked, setStopLossChecked] = useState(false);
    const [takeProfitChecked, setTakeProfitChecked] = useState(false);
    const [stopLossVal, setStopLossVal] = useState('-10%');
    const [takeProfitVal, setTakeProfitVal] = useState('40%');

    return (
        <>
            {/* Tab Navigation */}
            <div className="flex justify-between items-center bg-[#f7f7f7] border-b border-gray-200 sticky top-0 pr-4"> 
                <div className="flex items-center">
                    {[
                        { key: 'trade', label: 'Trade' },
                        { key: 'turbo', label: 'TurboTrader' },
                        { key: 'ladder', label: 'Ladder' },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTradeTab(key)}
                            className={`py-3 px-3 text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-colors whitespace-nowrap ${
                                activeTradeTab === key
                                    ? 'bg-white text-black'
                                    : 'text-gray-500 border-b-1 border-transparent hover:text-gray-700'
                            }`}
                        >
                            {label} 
                        </button>
                    ))}
                </div>
                <div className='ml-auto'> 
                    <Menu size={16}  />
                </div>
            </div>

            {/* Tab Content */}
            <div className="overflow-auto hide-scrollbar"> 
                {activeTradeTab === 'trade' && (
                    <div className="p-3 space-y-3">

                        {/* Side – Buy / Sell */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1.5">Side</p>
                            <div className={`relative flex h-10 rounded-md overflow-hidden transition-all ${
                                buySellMode === 'buy' ? 'bg-[#FFEBEB]' : 'bg-green-50' 
                            }`}>
                                {/* Diagonal colored fill */}
                                <div
                                    className={`absolute inset-0 transition-all ${buySellMode === 'buy' ? 'bg-[#4CAF50]' : 'bg-[#F44336]'}`}
                                    style={{
                                        clipPath: buySellMode === 'buy'
                                            ? 'polygon(0 0, 58% 0, 48% 100%, 0 100%)'
                                            : 'polygon(52% 0, 100% 0, 100% 100%, 42% 100%)',
                                    }}
                                />  
                                <button
                                    onClick={() => setBuySellMode('buy')}
                                    className={`relative flex-1 z-10 text-sm font-semibold pl-5 text-left transition-colors ${
                                        buySellMode === 'buy' ? 'text-white' : 'text-[#4CAF50]'
                                    }`}
                                >
                                    Buy
                                </button>
                                <button
                                    onClick={() => setBuySellMode('sell')}
                                    className={`relative flex-1 z-10 text-sm font-semibold pr-5 text-right transition-colors ${
                                        buySellMode === 'sell' ? 'text-white' : 'text-[#F44336]'
                                    }`}
                                >
                                    Sell
                                </button>
                            </div>
                        </div>

                        {/* Order Type – pill selector */}
                        <div>
                            <div className="flex items-center gap-1 mb-1.5">
                                <p className="text-xs text-gray-500">Order Type</p>
                                <Info size={12} className="text-gray-400" />
                            </div>
                            <div className="flex gap-0">
                                {[
                                    { key: 'limit', label: 'Limit' },
                                    { key: 'market', label: 'Market' },
                                    { key: 'stop', label: 'Stop' },
                                ].map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => setOrderType(key)}
                                        className={`flex-1 py-2 text-xs font-medium border first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br transition-colors ${
                                            orderType === key
                                                ? 'bg-[#EDE7F6] text-[#7B1FA2] border-gray-300'
                                                : 'bg-white text-gray-600 border-gray-300'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Order Type – quantity input row */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1.5">Order Type</p>
                            {/* Input with icons */}
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-2">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    className="flex-1 px-3 py-2 text-sm outline-none text-gray-400"
                                />
                                <button className="w-8 h-9 flex items-center justify-center bg-[#EDE7F6] border-l border-gray-300">
                                    <Layers size={14} className="text-[#7B1FA2]" />
                                </button>
                                <button className="w-8 h-9 flex items-center justify-center border-l border-gray-300 text-gray-500 text-xs font-bold">
                                    %
                                </button>
                                <button className="w-8 h-9 flex items-center justify-center border-l border-gray-300 text-gray-500 text-xs font-bold">
                                    $
                                </button>
                            </div>
                            {/* Quick Qty Buttons */}
                            <div className="grid grid-cols-6 gap-1">
                                {['10', '50', '100', '500', '+1', '-1'].map((v) => (
                                    <button
                                        key={v}
                                        className="py-1.5 text-xs bg-[#EDE8F2] font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Limit Price */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1.5">Limit Price</p>
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <input
                                    type="text"
                                    value={limitPrice}
                                    onChange={(e) => setLimitPrice(e.target.value)}
                                    className="flex-1 px-3 py-2 text-sm outline-none text-gray-900"
                                />
                                {/* Spinner arrows */}
                                <div className="flex flex-col border-l border-gray-300">
                                    <button className="px-2 py-0.5 text-gray-500 hover:bg-gray-100 text-xs leading-none">▲</button>
                                    <button className="px-2 py-0.5 text-gray-500 hover:bg-gray-100 text-xs leading-none border-t border-gray-200">▼</button>
                                </div>
                                <button className="w-9 h-full flex items-center justify-center border-l border-gray-300 text-gray-400 hover:bg-gray-50">
                                    <Pencil size={13} />
                                </button>
                            </div>
                        </div>

                        {/* Time-in-Force + Trading Hours */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-xs text-gray-500 mb-1.5">Time-in-Force</p>
                                <div className="relative">
                                    <select className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 outline-none pr-7">
                                        <option>Day</option>
                                        <option>GTC</option>
                                        <option>OPG</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1.5">Trading Hours</p>
                                <div className="relative">
                                    <select className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 outline-none pr-7">
                                        <option>Only Regular Hours</option>
                                        <option>Extended</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Stop Loss + Take-Profit */}
                        <div className="grid grid-cols-2 gap-2">
                            {/* Stop Loss */}
                            <div>
                                <label className="flex items-center gap-1.5 mb-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={stopLossChecked}
                                        onChange={(e) => setStopLossChecked(e.target.checked)}
                                        className="w-3.5 h-3.5 accent-gray-600"
                                    />
                                    <span className="text-xs font-medium text-gray-700">Stop Loss</span>
                                </label>
                                <p className="text-[10px] text-gray-400 mb-1">Stop Price ($247.42-$244.8)</p>
                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                    <input
                                        type="text"
                                        value={stopLossVal}
                                        onChange={(e) => setStopLossVal(e.target.value)}
                                        className="flex-1 px-2 py-1.5 text-xs outline-none text-gray-700 min-w-0"
                                    />
                                    <span className="px-2 text-xs text-gray-500 border-l border-gray-300 py-1.5">%</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Est.P&L:---</p>
                            </div>
                            {/* Take-Profit */}
                            <div>
                                <label className="flex items-center gap-1.5 mb-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={takeProfitChecked}
                                        onChange={(e) => setTakeProfitChecked(e.target.checked)}
                                        className="w-3.5 h-3.5 accent-gray-600"
                                    />
                                    <span className="text-xs font-medium text-gray-700">Take-Profit</span>
                                </label>
                                <p className="text-[10px] text-gray-400 mb-1">Stop Price ($247.42-$244.8)</p>
                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                    <input
                                        type="text"
                                        value={takeProfitVal}
                                        onChange={(e) => setTakeProfitVal(e.target.value)}
                                        className="flex-1 px-2 py-1.5 text-xs outline-none text-gray-700 min-w-0"
                                    />
                                    <span className="px-2 text-xs text-gray-500 border-l border-gray-300 py-1.5">%</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Est.P&L:---</p>
                            </div>
                        </div>

                        {/* Time in Force (Sub-orders) */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1.5">Time in Force (Sub-orders)</p>
                            <div className="relative">
                                <select className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 outline-none pr-7">
                                    <option>Day</option>
                                    <option>GTC</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Buy / Sell Button */}
                        <button
                            className={`w-full py-3 rounded text-sm font-semibold text-white transition-colors ${
                                buySellMode === 'buy'
                                    ? 'bg-[#4CAF50] hover:bg-[#43A047]'
                                    : 'bg-[#F44336] hover:bg-[#E53935]'
                            }`} 
                        >
                            {buySellMode === 'buy' ? 'Buy' : 'Sell'}
                        </button>

                        {/* Order Summary */}
                        <div className="border-t border-gray-200 pt-3 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Estimated Amount</span>
                                <span className="text-gray-900 font-medium">$47,192.00</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Estimated Fee</span>
                                <span className="text-gray-500">--</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Buying Power</span>
                                <span className="text-gray-900 font-medium">$</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Max Shares to Buy</span>
                                <span className="text-gray-500"></span>
                            </div>
                        </div>

                    </div>
                )}

                {activeTradeTab === 'turbo' && (
                    <div className="flex items-center justify-center h-40 text-gray-500 text-sm p-4">
                        <p>TurboTrader interface coming soon</p>
                    </div>
                )}

                {activeTradeTab === 'ladder' && (
                    <div className="flex items-center justify-center h-40 text-gray-500 text-sm p-4">
                        <p>Ladder interface coming soon</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default TurboTradeLadder;