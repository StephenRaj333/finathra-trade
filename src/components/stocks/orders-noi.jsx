
import { Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const OrdersNOI = () => {  
    const [activeTab, setActiveTab] = useState('orderBook');
    const [activeOrderBookTab, setActiveOrderBookTab] = useState('all');
    return (
        <>
            {/* Order Book / NOI Header Tabs */}
            <div className="flex items-center justify-between pl-0 px-4 border-b border-gray-200 bg-[#f7f7f7]"> 
                <div className="flex items-center gap-0 rounded-lg overflow-hidden">
                    <button
                        onClick={() => setActiveTab('orderBook')}
                        className={`px-4 py-2.5 text-sm font-semibold border-r border-[#C8B9D8] rounded-tr-lg transition-colors ${
                            activeTab === 'orderBook'
                                ? 'bg-white text-gray-900'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        Order Book
                    </button>
                    <div className="w-px bg-gray-300"></div>  
                    <button
                        onClick={() => setActiveTab('noi')}
                        className={`px-4 py-2.5 text-sm font-semibold border-r border-[#C8B9D8] rounded-tr-lg transition-colors ${
                            activeTab === 'noi'
                                ? 'bg-white text-gray-900'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        NOII
                    </button>
                </div>
                <button className="text-gray-600 hover:text-gray-900">
                    <Menu size={18} />
                </button>
            </div>

            {/* Order Book Tabs with Icons */}
            {activeTab === 'orderBook' && (
                <>
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
                        <button
                            onClick={() => setActiveOrderBookTab('all')}
                            className={`p-2 rounded transition-colors ${activeOrderBookTab === 'all'
                                ? 'bg-[#EDE8F2] text-gray-900'
                                : 'bg-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            title="All Orders"
                        >
                            <img className='w-full h-full max-w-[20px] max-h-[20px]' width={8} height={8} src="/icons/common-marker.png" alt="common marker" /> 
                            {/* <BarChart3 size={18} /> */}
                        </button>
                        <button
                            onClick={() => setActiveOrderBookTab('buy')}
                            className={`p-2 rounded transition-colors ${activeOrderBookTab === 'buy'
                                ? 'bg-[#EDE8F2] text-green-600'
                                : 'bg-transparent text-gray-500 hover:text-green-600'
                                }`}
                            title="Buy Orders"
                        >
                            <img className='w-full h-full max-w-[20px] max-h-[20px]' width={8} height={8} src="/icons/inflating.png" alt="common marker" /> 
                        </button>
                        <button
                            onClick={() => setActiveOrderBookTab('sell')}
                            className={`p-2 rounded transition-colors ${activeOrderBookTab === 'sell'
                                ? 'bg-[#EDE8F2] text-red-600'
                                : 'bg-transparent text-gray-500 hover:text-red-600'
                                }`}
                            title="Sell Orders"
                        >
                            <img className='w-full h-full max-w-[20px] max-h-[20px]' width={8} height={8} src="/icons/deflating.png" alt="common marker" /> 
                        </button>

                        {/* Price Selector */}
                        <div className="ml-auto flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#616161]">
                            <span>0.00001</span>
                            <ChevronDown size={20} />
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 grid grid-cols-3 gap-4 text-xs font-normal text-[#616161]">
                        <div>Price USD</div>
                        <div>Size(XAU)</div>
                        <div>Total(XAU)</div>
                    </div>

                    {/* Table Content */}
                    <div className="flex-1 overflow-auto">  
                        {(activeOrderBookTab === 'all' || activeOrderBookTab === 'sell') && (
                            <div className="bg-[url('/icons/deflation-bg.png')] bg-no-repeat bg-right bg-[length(50%_50%)]"> 
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-[#EC4D5C]">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-[#EC4D5C]">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-[#EC4D5C]">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-[#EC4D5C]">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-[#EC4D5C]">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                            </div>
                        )}

                        {(activeOrderBookTab === 'all' || activeOrderBookTab === 'buy') && (
                            <div className="bg-[url('/icons/inflation-bg.png')] bg-no-repeat bg-right bg-[length(50%_50%)]"> 
                                <div className="px-4 py-2 flex gap-4 text-xs bg-[#F7F7F7] transition-colors font-bold items-center justify-between">
                                    <div className="text-green-600 text-lg">$4560.65</div>
                                    <div className="text-gray-700">
                                        <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs">M</span> 4560.65
                                    </div>
                                </div>
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-green-600">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-green-600">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-green-600">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-green-600">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                                <div className="px-4 py-2 grid grid-cols-3 gap-4 text-xs transition-colors">
                                    <div className="font-semibold text-green-600">$4560.65</div>
                                    <div className="text-gray-700">55,55,500</div>
                                    <div className="text-gray-700 px-2 py-1 rounded">55,55,500</div>
                                </div>
                            </div> 
                        )}
                    </div>
                </>
            )}

            {/* NOI Tab Content */}
            {activeTab === 'noi' && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center py-12">
                        <p className="text-gray-500">NOI Content Coming Soon</p>
                    </div>
                </div>
            )} 
        </>
    )
}

export default OrdersNOI;