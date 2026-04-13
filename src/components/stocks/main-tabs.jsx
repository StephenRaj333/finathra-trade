import { useState } from 'react';
import { Menu } from 'lucide-react';
import ChartContainer from './chart-container';
import Note from './note';
import News from './news';
import Analysis from './Analysis';
import OrderFlow from './Order-Flow'; 
import Releases from './Releases'; 
import Profile from './Profile';

const TABS = [
    'Chart',
    'Option',
    'Related',
    'Note',
    'News',
    'Comments',
    'Profile',
    'Analysis',
    'Corp Actions',
    'Releases',
    'Order Flow',
];

const MainTabs = ({ gridLayout = 1, onGridChange }) => {
    const [activeTab, setActiveTab] = useState('Releases');

    return (
        <div className="flex flex-col h-full"> 
            {/* Tab Bar */}
            <div className="flex items-center bg-[#f7f7f7] border-b border-gray-200 flex-shrink-0 overflow-x-auto hide-scrollbar">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2 py-2 border-r border-[#C8B9D8] rounded-tr-lg text-xs text-black font-medium whitespace-nowrap transition-colors ${
                            activeTab === tab
                                ? 'bg-white text-black'
                                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
                <button className="ml-auto px-3 py-2.5 flex-shrink-0 text-gray-500 hover:text-gray-800">
                    <Menu size={16} />
                </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'Chart' && (
                    <ChartContainer gridLayout={gridLayout} onGridChange={onGridChange} />
                )}
                {activeTab === 'Option' && (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Option — coming soon
                    </div>
                )}
                {activeTab === 'Related' && (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Related — coming soon
                    </div>
                )}
                {activeTab === 'Note' && (
                    <div className='p-2 h-full'> 
                        <Note />
                    </div>
                )}
                {activeTab === 'News' && (
                    <div className='p-2 h-full'> 
                        <News />
                    </div>
                )}
                {activeTab === 'Comments' && (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Comments — coming soon
                    </div>
                )}
                {activeTab === 'Profile' && (
                    <Profile /> 
                )}
                {activeTab === 'Analysis' && (
                    <div className='analysis-wrapper'> 
                        <Analysis />  
                    </div>
                )}
                {activeTab === 'Corp Actions' && (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Corp Actions — coming soon
                    </div>
                )}
                {activeTab === 'Releases' && (
                    <div className="releases-wraper">
                        <Releases />  
                    </div>
                )}
                {activeTab === 'Order Flow' && (
                    <div className='order-flow-wrapper'>
                        <OrderFlow /> 
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainTabs;
