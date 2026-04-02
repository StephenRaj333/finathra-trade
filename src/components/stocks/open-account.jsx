
import { Resizable } from 're-resizable';
import { Clipboard, } from 'lucide-react';
import { useState } from 'react';

const OpenAccount = () => {
    const [activeBottomTab, setActiveBottomTab] = useState('order');
    return (
        <>

            {/* Tabs */}
            <div className="flex items-center gap-0 border-b border-gray-200 bg-[#f7f7f7]">
                <button
                    onClick={() => setActiveBottomTab('order')}
                    className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${activeBottomTab === 'order'
                        ? 'bg-white text-black'
                        : 'text-gray-600 border-b-transparent hover:text-gray-900'
                        }`}
                >
                    Order (Today)
                </button>
                <button
                    onClick={() => setActiveBottomTab('option')}
                    className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${activeBottomTab === 'option'
                        ? 'bg-white text-black'
                        : 'text-gray-600 border-b-transparent hover:text-gray-900'
                        }`}
                >
                    Option
                </button>
                <button
                    onClick={() => setActiveBottomTab('related')}
                    className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${activeBottomTab === 'related'
                        ? 'bg-white text-black'
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
        </>
    )
}

export default OpenAccount;