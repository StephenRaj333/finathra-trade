import { useState } from "react";
import { Star, Bell, ChevronDown, AlignJustify, ArrowUpDown } from 'lucide-react';

const QuotesWatchlist = () => {
  const [activeRightTopTab, setActiveRightTopTab] = useState('quotes');
    return (
        <>
            {/* Tabs */}
            <div className="flex items-center gap-0 border-b border-gray-200 bg-[#f7f7f7]">
                <button
                    onClick={() => setActiveRightTopTab('quotes')}
                    className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${activeRightTopTab === 'quotes'
                        ? 'bg-white text-black'
                        : 'text-gray-600 border-b-transparent hover:text-gray-900'
                        }`}
                >
                    Quotes
                </button>
                <button
                    onClick={() => setActiveRightTopTab('watchlist')} 
                    className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${activeRightTopTab === 'watchlist'
                        ? 'bg-white text-black'
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
                        <div className="flex justify-end gap-2">
                            <button className="text-gray-400 hover:text-gray-600">
                                <Star size={20} className="fill-gray-300" strokeWidth={1.5} />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                                <Bell size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Price Display */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-4xl font-bold text-green-600">4560.65</h2>
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold text-green-600">+45.65</span>
                                    <span className="text-sm text-green-600 font-medium">+1.10%</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Open, 03/31 06:10 EDT</p>
                        </div>

                        {/* Info Grid */}
                        <div className="flex items-center justify-between gap-40">
                            <div className="left-block flex flex-col gap-2.5 w-1/2">
                                <div className='flex items-center justify-between'>
                                    <p className="text-xs text-gray-500 mb-1">Open</p>
                                    <p className="text-sm font-semibold text-green-600">4,510.95</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-xs text-gray-500 mb-1">High</p>
                                    <p className="text-sm font-semibold text-green-600">4,510.95</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-xs text-gray-500 mb-1">Low</p>
                                    <p className="text-sm font-semibold text-red-600">4,510.95</p>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <p className="text-xs text-gray-500 mb-1">Prev Close</p>
                                    <p className="text-sm font-semibold text-red-600">4,510.95</p>
                                </div>
                            </div>
                            <div className="right-block flex flex-col gap-2.5 w-1/2">
                                <div className='flex items-center justify-between'>
                                    <p className="text-xs text-gray-500 mb-1">52 Wk High</p>
                                    <p className="text-sm font-semibold text-gray-900">4,510.95</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-xs text-gray-500 mb-1">52 Wk Low</p>
                                    <p className="text-sm font-semibold text-gray-900">4,510.95</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-xs text-gray-500 mb-1">Volume</p>
                                    <p className="text-sm font-semibold text-gray-900">0.00</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-xs text-gray-500 mb-1">Market Cap</p>
                                    <p className="text-sm font-semibold text-gray-900">0.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeRightTopTab === 'watchlist' && (
                    <div className="flex flex-col">
                        {/* Recently Viewed Dropdown Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200 cursor-pointer select-none">
                            <span className="text-sm font-medium text-gray-700">Recently Viewed</span>
                            <ChevronDown size={18} className="text-gray-500" />
                        </div>

                        {/* Column Headers */}
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <AlignJustify size={13} strokeWidth={1.8} />
                                <span>Symbol</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <ArrowUpDown size={13} strokeWidth={1.8} /> 
                                <span>Price/Change</span>
                            </div>
                        </div>

                        {/* Stock Rows */}
                        <div className="flex flex-col">
                            {/* XAUUSD — selected */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#EDE9F8] border-b border-gray-100">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-tight">XAUUSD</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">GOLD/USD</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-green-600 leading-tight">4556.18</p>
                                    <p className="text-[11px] text-green-600 mt-0.5">+0.77 +0.17%</p>
                                </div>
                            </div>

                            {/* BCH */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-tight">BCH</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">Bitcoin Cash</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-green-600 leading-tight">467.18</p>
                                    <p className="text-[11px] text-green-600 mt-0.5">+0.77 +0.17%</p>
                                </div>
                            </div>

                            {/* AAPL */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-tight">AAPL</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">Apple Inc</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-red-500 leading-tight">467.18</p>
                                    <p className="text-[11px] text-red-500 mt-0.5">-0.77 -0.17%</p>
                                </div>
                            </div>

                            {/* AAPL 2 */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-tight">AAPL</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">Apple Inc</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-red-500 leading-tight">467.18</p>
                                    <p className="text-[11px] text-red-500 mt-0.5">-0.77 -0.17%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default QuotesWatchlist;