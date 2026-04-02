import { useState } from 'react';
import { Youtube, CloudMoon, VS, GridIcon, CandlesIcon, EditIcon, GraphIcon, Coin, Delete, EyeIcon, Magnet, PencilDraw, SettingArrow, SettingArr, FilterArr, TextIcon, DoubleStickLeft, DoubleStickRight, CandleH, NIcon, WaveOutlineIcon, WaveFilledIcon, CandlesFilled, CandlesOutline } from "../../utils/SvgCode";

const ChartControls = () => {
    const [activeTab, setActiveTab] = useState(0);

    const clickableTabs = [
        { icon: GraphIcon },
        { icon: EditIcon },
        { icon: CandlesIcon },
    ];

    const staticTabs = [
        { icon: GridIcon },
        { icon: VS },
        { icon: CloudMoon },
        { icon: Coin },
        { icon: Youtube },
    ];

    return (
        <>
            <div className="chart-controls bg-[#EDE8F2] py-2 px-4 flex items-center gap-4">
                <div className="tabs w-fit flex items-center gap-4 border-r-2 border-[#AE97C5]">
                    {/* Clickable tabs */}
                    {clickableTabs.map((tab, index) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className="tab"
                            >
                                <IconComponent color={activeTab === index ? "#4F1D81" : undefined} />
                            </button>
                        );
                    })}
                    {/* Static tabs (no click handler) */}
                    {staticTabs.map((tab, index) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={index + clickableTabs.length}
                                className={`tab ${index === staticTabs.length - 1 ? 'pr-3' : ''}`}
                            >
                                <IconComponent />
                            </button>
                        );
                    })}
                </div>  
                <div className="tab-content">
                    {/* content 1 */}
                    <div className={`content-1 flex items-center ${activeTab === 0 ? '' : 'hidden'}`}>
                        <button className="text-xs pl-0 px-4 text-[#242424] border-r border-[#242424]">Volume</button>
                        <button className="text-xs px-4 text-[#242424] border-r border-[#242424]">VWAP</button>
                        <button className="text-xs px-4 text-[#242424] border-r border-[#242424]">MACD</button>
                        <button className="text-xs px-4 text-[#242424] border-r border-[#242424]">All Indicators</button>
                        <button className="text-xs px-4 text-[#242424]">Script Editor</button>
                    </div>
                    {/* content 2 */}
                    <div className={`content-2 flex items-center gap-4 ${activeTab === 1 ? '' : 'hidden'}`}>
                        <div className="flex items-center gap-4 border-r-2 border-[#AE97C5]">
                            <button><SettingArr /></button>
                            <button><SettingArrow /></button>
                            <button><FilterArr /></button>
                            <button className="pr-3"><TextIcon /></button>
                        </div>
                        <div className="flex items-center gap-4">
                            <button><Delete /></button>
                            <button><EyeIcon /></button>
                            <button><Magnet /></button>
                            <button><PencilDraw /></button>
                        </div>
                    </div>
                    {/* content 3 */}  
                    <div className={`content-3 flex items-center gap-4 ${activeTab === 2 ? '' : 'hidden'}`}>
                        <button><WaveOutlineIcon /></button>
                        <button><WaveFilledIcon /></button>
                        <button><CandlesFilled /></button>
                        <button><CandlesOutline /></button>
                        <button><NIcon /></button>
                        <button><DoubleStickRight /></button>
                        <button><DoubleStickLeft /></button>
                        <button><CandleH /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChartControls;