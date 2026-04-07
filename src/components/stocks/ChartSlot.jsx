import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { chartsymbolNameSuggestions } from '../../utils/placeholder-data';
import CandlestickChart from './CandleChart';

const ChartSlot = ({ slotIndex, selectedSymbol, onSelect, chartType, onChartTypeChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);

    const filtered = searchQuery.trim()
        ? chartsymbolNameSuggestions.filter(s =>
            s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : chartsymbolNameSuggestions;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsSearchFocused(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (suggestion) => {
        onSelect(slotIndex, suggestion.symbol);
        setSearchQuery('');
        setIsSearchFocused(false);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!isSearchFocused || filtered.length === 0) return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => prev < filtered.length - 1 ? prev + 1 : prev);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) handleSelect(filtered[highlightedIndex]);
                break;
            case 'Escape':
                e.preventDefault();
                setIsSearchFocused(false);
                setSearchQuery('');
                setHighlightedIndex(-1);
                break;
            default:
                break;
        }
    };

    if (selectedSymbol) {
        return (
            <CandlestickChart
                symbol={selectedSymbol}
                chartType={chartType}
                onChartTypeChange={onChartTypeChange}
            />
        );
    }

    return (
        <div className="w-full h-full flex flex-col bg-[conic-gradient(from_20deg_at_48.04%_45.06%,_#FFF_0deg,_#FFFDF5_167.8846deg,_#FFFDF5_194.7978deg,_#FEFFFA_360deg)] border border-[#DDB8D8] rounded-lg overflow-visible">
            {/* Search Input - top left */}
            <div ref={wrapperRef} className="relative m-3 w-52">
                <div className={`flex items-center gap-2 rounded-lg px-3 py-2 border transition-all duration-300 ${
                    isSearchFocused
                        ? 'bg-[#EDE8F280] border-[#AE6DA2]'
                        : 'bg-white border-[#DDB8D8]'
                }`}>  
                    <Search size={14} color={isSearchFocused ? '#C79BBF' : '#C79BBF'} className="flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Symbol/Name"
                        className="font-medium text-xs text-gray-700 outline-none bg-transparent flex-1 placeholder:text-[#C79BBF] placeholder:font-normal"
                    />
                </div>

                {/* Dropdown */}
                {isSearchFocused && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-purple-200 rounded-lg shadow-xl z-50 max-h-56 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                        {filtered.map((s, index) => (
                            <div
                                key={s.symbol}
                                onMouseDown={() => handleSelect(s)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                className={`flex flex-col px-4 py-2.5 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                                    highlightedIndex === index ? 'bg-[#EDE8F2]' : 'hover:bg-[#F5F0FF]'
                                }`}
                            >
                                <span className="text-[12px] font-medium text-black mb-0.5">{s.name}</span>
                                <span className="text-[10px] text-[#7F7F7F]">{s.symbol}</span>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <div className="px-4 py-3 text-sm text-gray-400">No results found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChartSlot;
