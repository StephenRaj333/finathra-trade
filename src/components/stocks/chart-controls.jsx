import { useState, useRef, useEffect } from "react";
import { Star, Pencil, Search } from 'lucide-react';
import { chartsymbolNameSuggestions } from "../../utils/placeholder-data";  

const ChartControls = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('XAUUSD Gold/USD');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);

    const filtered = searchQuery.trim()
        ? chartsymbolNameSuggestions.filter(s =>
            s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : chartsymbolNameSuggestions;

    // Close on outside click and reset search stat
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsSearchMode(false);
                setSearchQuery('');
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (suggestion) => {
        setSelectedLabel(`${suggestion.symbol} ${suggestion.name}`);
        setIsSearchMode(false);
        setSearchQuery('');
        setHighlightedIndex(-1); 
    };

    const handleKeyDown = (e) => {
        if (!isSearchMode || filtered.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => 
                    prev < filtered.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleSelect(filtered[highlightedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsSearchMode(false);
                setSearchQuery('');
                setHighlightedIndex(-1);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="chart-controls-wrapper">
                {/* Stock Info Header */}
                <div className="flex hover-action items-center justify-between flex-wrap gap-2 px-2 lg:px-4 py-1.5"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="flex items-center flex-wrap gap-2 lg:gap-4 pt-3">
                        <div ref={wrapperRef} className="relative w-full max-w-64">   
                            {/* Symbol text / search input */}  
                            {isSearchMode ? (
                                <div className="flex items-center gap-2 bg-[#EDE8F280] border border-[#AE6DA2] rounded-lg px-3 py-2">
                                    <Search 
                                        size={16} 
                                        color='#C79BBF' 
                                        className="flex-shrink-0"
                                    />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Symbol/Name"
                                        className="font-medium text-xs text-gray-700 outline-none bg-transparent flex-1 placeholder:text-[#C79BBF] placeholder:font-normal transition-all duration-200"
                                        autoFocus
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 min-w-0 border border-[#EDE8F2] rounded-md p-2">
                                    <h3
                                        onClick={() => setIsSearchMode(true)}
                                        className="font-semibold text-xs text-[#4F1D81] truncate cursor-pointer pr-1 lg:pr-2 border-r border-[#EDE8F2] transition-all duration-200" 
                                    >
                                        {selectedLabel}
                                    </h3>

                                    {/* Hidden on hover - 30 Min and Star */} 
                                    <span 
                                        className={`text-xs text-gray-500 whitespace-nowrap pl-1 lg:pl-2 pr-1 lg:pr-2 border-r border-[#EDE8F2] transition-all duration-200 ${!isHovering && !isSearchMode ? 'opacity-100' : 'opacity-0 hidden'}`}
                                    >
                                        30 Min
                                    </span>
                                    <button 
                                        className={`flex-shrink-0 pl-1 lg:pl-2 pr-1 lg:pr-2 border-r border-[#EDE8F2] transition-all duration-200 ${!isHovering && !isSearchMode ? 'opacity-100' : 'opacity-0 hidden'}`}
                                    >
                                        <Star size={14} fill="#4F1D81" />
                                    </button>

                                    {/* Pencil icon - always visible except in search mode */} 
                                    <button
                                        onClick={() => setIsSearchMode(true)}
                                        className={`text-gray-400 hover:text-gray-600 flex-shrink-0 relative pl-1 lg:pl-2 transition-all duration-200 ${!isSearchMode ? 'opacity-100' : 'opacity-0 hidden'}`}
                                    >
                                        <Pencil size={14} color='#AE97C5' className="lg:size-4" /> 
                                    </button>
                                </div>
                            )}  

                            {/* Dropdown suggestions */}
                            {isSearchMode && (
                                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-purple-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    {filtered.map((s, index) => (
                                        <div
                                            key={s.symbol}
                                            onMouseDown={() => handleSelect(s)}
                                            onMouseEnter={() => setHighlightedIndex(index)}
                                            className={`flex flex-col px-4 py-2 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                                                highlightedIndex === index 
                                                    ? 'bg-[#EDE8F2]' 
                                                    : 'hover:bg-[#EDE8F2]'
                                            }`} 
                                        >   
                                            <span className="text-[12px] font-medium text-black mb-0.5">{s.name}</span>
                                            <span className="text-[10px] text-[#7F7F7F] truncate">{s.symbol} {s.type || 'forex'}</span>
                                        </div>
                                    ))}
                                    {filtered.length === 0 && (
                                        <div className="px-4 py-3 text-sm text-gray-400">No results found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Technical Indicators */}  
                <div className="flex items-center flex-wrap gap-2 px-2 lg:px-4 py-1 lg:py-2 text-xs overflow-x-auto">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className="text-green-600 font-semibold text-xs">O 4000</span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className="text-red-600 font-semibold text-xs">H 4100</span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className="text-green-600 font-semibold text-xs">L 4100</span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className="text-red-600 font-semibold text-xs">C 4100</span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className="text-[black] font-semibold text-xs">+24% (+0.68%)</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChartControls;