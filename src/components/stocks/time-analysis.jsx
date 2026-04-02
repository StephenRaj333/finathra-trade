import { useState } from "react";

const TimeAnalysis = () => {
    const [activeTimeSalesTab, setActiveTimeSalesTab] = useState('timeSales');
    return (
        <>
            {/* Tabs Header */}
            <div className="flex items-center gap-0 border-b border-gray-200 bg-[#f7f7f7]">
                <button
                    onClick={() => setActiveTimeSalesTab('timeSales')}
                    className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${activeTimeSalesTab === 'timeSales'
                        ? 'bg-white text-black'
                        : 'text-gray-600 border-b-transparent hover:text-gray-900'
                        }`}
                >
                    Time&Sales
                </button>
                <button
                    onClick={() => setActiveTimeSalesTab('volAnalysis')}
                    className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${activeTimeSalesTab === 'volAnalysis'
                        ? 'bg-white text-black'
                        : 'text-gray-600 border-b-transparent hover:text-gray-900'
                        }`}
                >
                    Vol Analysis
                </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex items-center justify-center overflow-auto">
                {activeTimeSalesTab === 'timeSales' && (  
                    <div className="flex flex-col items-center justify-center py-12 px-4 gap-2 max-w-[75%] text-center mx-auto"> 
                        <div className="img-wrapper">
                            <img src="/icons/search-data.png" alt="search data" />
                        </div>
                        <h3 className="text-lg font-normal text-[#7F7F7F]">Time&Sales is not available for this security</h3>
                    </div>
                )}

                {activeTimeSalesTab === 'volAnalysis' && ( 
                    <div className="flex flex-col items-center justify-center py-12 px-4 gap-2 max-w-[75%] text-center mx-auto"> 
                        <div className="img-wrapper">
                            <img src="/icons/search-data.png" alt="search data" />
                        </div>
                        <h3 className="text-lg font-normal text-[#7F7F7F]">Vol Analysis is not available for this security</h3>
                    </div> 
                )}
            </div>
        </>
    )
}  

export default TimeAnalysis;