import { useState } from 'react';
import TabsComponent from './TabsComponent';
import { newsData } from '../../utils/placeholder-data';
import { SquarePlus, Search, Trash2 , CircleX} from 'lucide-react';
import Modal from '../Modal';

const News = () => {
    const [activeTab, setActiveTab] = useState('Symbol News');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const history = [
        { name: 'Gold/USD', description: 'XAUUSD  forex  FX' },
        { name: 'Bitcoin Cash', description: 'BCH  crypto  CCC' },
        { name: 'Gold/USD', description: 'XAUUSD  forex  FX' },
    ];

    return (
        <div className="news-wrapper flex flex-col h-full bg-white">
            {/* Tabs */}
            <div className="tabs-header w-full flex items-center justify-between">
                <div className="left w-3/5">
                    <TabsComponent
                        tabs={['Symbol News', 'Market News', 'Watchlist News']}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>
                <div className="right w-2/5 flex justify-end items-center gap-3">
                    <div className='bg-[#EDE8F2] p-1.5 text-sm font-normal rounded w-fit text-[#4F1D81] tracking-wider'>SLV</div>
                    <div>
                        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            <SquarePlus size={24} strokeWidth={1.3} color="#724A9A" />
                            <p className='text-xs text-[#9E5190] font-normal'>Add Symbol</p>
                        </div>
                    </div>
                </div>
            </div>  
    
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'Symbol News' && (
                    <div>
                        <ul>
                            {newsData.map((news, index) => (
                                <li key={index} className='flex items-center justify-between flex-wrap gap-2 border-t border-[#EDE8F2] py-2'>
                                    <div className="text-[12px] text-black font-normal">{news.title}</div>
                                    <div className='desc'>
                                        <p className='text-[#7F7F7F] text-xs font-normal'>{news.source} {news.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'Market News' && (
                    <div>
                        <ul>
                            {newsData.map((news, index) => (
                                <li key={index} className='flex items-center justify-between flex-wrap gap-2 border-t border-[#EDE8F2] py-2'>
                                    <div className="text-[12px] text-black font-normal">{news.title}</div>
                                    <div className='desc'>
                                        <p className='text-[#7F7F7F] text-xs font-normal'>{news.source} {news.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'Watchlist News' && (
                    <div>
                        <ul>
                            {newsData.map((news, index) => (
                                <li key={index} className='flex items-center justify-between flex-wrap gap-2 border-t border-[#EDE8F2] py-2'>
                                    <div className="text-[12px] text-black font-normal">{news.title}</div>
                                    <div className='desc'>
                                        <p className='text-[#7F7F7F] text-xs font-normal'>{news.source} {news.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Add Symbol Modal */}
            <Modal isOpen={isModalOpen}>
                {/* Header */}
                <div className="bg-[#EDE8F2] px-6 py-3 flex items-center justify-center relative">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Add Symbol</h2>
                    <button
                        className='flex justify-end text-right absolute right-4'
                        onClick={() => setIsModalOpen(false)} 
                    >
                        <CircleX size={24} strokeWidth={1.5} color='#616161' />
                    </button>
                </div> 
                <div className="px-4 pt-4 pb-6">
                    {/* Search Input */}
                    <div className="flex items-center gap-2 border border-[#C47BBF] bg-[#EDE8F280] rounded-md px-4 py-2.5 mb-5 focus-within:ring-1 focus-within:ring-[#724A9A]">
                        <Search size={16} color="#C47BBF" strokeWidth={2} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Symbol/Name" 
                            className="flex-1 text-sm text-gray-500 placeholder-[#C79BBF] outline-none bg-transparent"
                        />
                    </div>

                    {/* History Header */}
                    <div className="flex items-center justify-between px-1 mb-2">
                        <span className="text-sm text-[#9E9E9E] font-normal">History</span>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Trash2 size={16} color="#724A9A" strokeWidth={1.8} />
                        </button>
                    </div>

                    {/* History List */}
                    <ul className="space-y-1">
                        {history.map((item, index) => (
                            <li
                                key={index}
                                className={`px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                                    index === 0 ? 'bg-[#EDE8F2]' : 'hover:bg-[#EDE8F2]'
                                }`}
                            >
                                <p className="text-sm font-semibold text-[#1A1A1A]">{item.name}</p>
                                <p className="text-xs text-[#9E9E9E] mt-0.5">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>

        </div>
    )
}

export default News; 