import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Search, X, Loader2 } from 'lucide-react';
import logo from "../../assets/logo.png";
import { SEARCH_SUGGESTIONS } from '../../utils/placeholder-data';

const DEBOUNCE_MS = 300;

/* ── Type badge colors ── */
const TYPE_BADGE = {
  Stock:     'bg-[#724A9A]/20 text-[#c49de8]',
  Index:     'bg-blue-500/20 text-blue-300',
  Forex:     'bg-emerald-500/20 text-emerald-300',
  Crypto:    'bg-orange-500/20 text-orange-300',
  ETF:       'bg-cyan-500/20 text-cyan-300',
  Commodity: 'bg-amber-500/20 text-amber-300',
};

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /* ── Search state ── */
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef(null);
  const searchWrapRef = useRef(null);
  const userDropdownRef = useRef(null);
  const debounceRef = useRef(null);
  const listRef = useRef(null);

  /* ── Close on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setActiveIndex(-1);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── Scroll active item into view ── */
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const item = listRef.current.children[activeIndex];
    item?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  /* ── Debounced search (simulates API call) ── */
  const handleQueryChange = useCallback((e) => {
    const val = e.target.value;
    setQuery(val);
    setActiveIndex(-1);
    clearTimeout(debounceRef.current);
  
    if (!val.trim()) {
      setResults([]);
      setIsLoading(false);
      setIsSearchOpen(false);
      return;
    }

    setIsLoading(true);
    setIsSearchOpen(true);

    debounceRef.current = setTimeout(() => {
      const q = val.toLowerCase();
      const filtered = SEARCH_SUGGESTIONS.filter(
        (s) =>
          s.symbol.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q)
      ).slice(0, 8);
      setResults(filtered);
      setIsLoading(false);
    }, DEBOUNCE_MS);
  }, []);

  /* ── Keyboard navigation ── */
  const handleKeyDown = useCallback((e) => {
    if (!isSearchOpen) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (activeIndex >= 0 && results[activeIndex]) {
          handleSelect(results[activeIndex]);
        }
        break;
      case 'Escape':
        setIsSearchOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  }, [isSearchOpen, activeIndex, results]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (item) => {
    setQuery(item.symbol);
    setIsSearchOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
    // TODO: navigate to item detail page
  };

  const clearQuery = () => {
    setQuery('');
    setResults([]);
    setIsSearchOpen(false);
    setActiveIndex(-1);
    clearTimeout(debounceRef.current);
    inputRef.current?.focus();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#AA278F] via-[#1D1E19] to-[#5B1BA3]" style={{ height: '52px' }}>
      <div className="flex h-full items-center px-5 gap-4">

        {/* Left – Logo */}
        <div className="flex-none">
          <img className="h-7 w-auto" src={logo} alt="Finartha logo" />
        </div>

        {/* Center – Search */}
        <div className="flex-1 flex justify-end">
          <div className="relative w-full max-w-[400px]" ref={searchWrapRef}>
            {/* Input box */}
            <div className="flex items-center gap-2 bg-[#2a0a38]/70 rounded-md px-3 py-1.5 border border-white/10 focus-within:border-[#724A9A]/60 transition-colors duration-150">
              {isLoading
                ? <Loader2 size={14} className="text-[#c49de8] animate-spin flex-none" />
                : <Search size={14} className="text-gray-400 flex-none" />
              }
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (results.length > 0) setIsSearchOpen(true); }}
                placeholder="Search stocks, indices, crypto…"
                className="bg-transparent text-white text-sm placeholder:text-gray-400 outline-none w-full"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={clearQuery}
                  className="text-gray-400 hover:text-white transition-colors flex-none"
                  tabIndex={-1}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Dropdown */}
            <div
              className={`absolute top-full left-0 right-0 mt-1.5 bg-[#160826] border border-white/10 rounded-xl shadow-2xl shadow-black/60 z-50 overflow-hidden transition-all duration-200 origin-top ${
                isSearchOpen
                  ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none'
              }`}
              style={{ maxHeight: '340px' }}
            >
              {isLoading ? (
                /* Loading state */
                <div className="flex items-center justify-center gap-2 py-8 text-gray-400 text-xs">
                  <Loader2 size={14} className="animate-spin text-[#724A9A]" />
                  <span>Searching…</span>
                </div>
              ) : results.length === 0 ? (
                /* Empty state */
                <div className="py-8 text-center text-gray-500 text-xs">
                  No results for &ldquo;<span className="text-gray-300">{query}</span>&rdquo;
                </div>
              ) : (
                /* Results */
                <ul ref={listRef} className="overflow-y-auto" style={{ maxHeight: '340px' }}>
                  {results.map((item, i) => (
                    <li
                      key={item.symbol}
                      onMouseDown={(e) => { e.preventDefault(); handleSelect(item); }}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors duration-100 text-xs border-b border-white/[0.04] last:border-b-0 ${
                        i === activeIndex
                          ? 'bg-[#724A9A]/25 text-white'
                          : 'text-gray-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-mono font-bold text-white text-[11.5px] w-[72px] shrink-0 tracking-wide">
                          {item.symbol}
                        </span>
                        <span className="text-gray-400 text-[11px] truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-[9px] text-gray-500 font-medium">{item.exchange}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${TYPE_BADGE[item.type] ?? 'bg-gray-700/50 text-gray-300'}`}>
                          {item.type}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Right – Controls + User */}
        <div className="flex items-center text-white text-xs gap-3">
          {/* Separator */}
          <span className="h-5 w-px bg-white mx-3 block" />

          {/* Open */}
          <button className="flex items-center gap-1 hover:text-white/80 transition-colors whitespace-nowrap">
            <span className="text-white/70">Open:</span>
            <span className="tracking-widest font-medium">***</span>
            <ChevronDown size={12} className="text-white/60" />
          </button>

          {/* Separator */}
          <span className="h-5 w-px bg-white mx-3 block" />

          {/* Working */}
          <button className="flex items-center gap-1 hover:text-white/80 transition-colors whitespace-nowrap">
            <span className="text-white/70">Working</span>
            <span className="tracking-widest font-medium">***</span>
            <ChevronDown size={12} className="text-white/60" />
          </button>

          {/* Separator */}
          <span className="h-5 w-px bg-white mx-3 block" />

          {/* TAV */}
          <button className="flex items-center gap-1 hover:text-white/80 transition-colors whitespace-nowrap">
            <span className="text-white/70">TAV</span>
            <span className="tracking-widest font-medium">***</span>
            <ChevronDown size={12} className="text-white/60" />
          </button>

          {/* Separator */}
          <span className="h-5 w-px bg-white mx-3 block" />

          {/* User Profile */}
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-none">
                <img src="/user.png" alt="user info" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-white font-semibold text-xs">Ahmed K.</span>
                <span className="text-purple-300 text-[10px] font-medium">Premium • AEB</span>
              </div>
              <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown */}
            <div
              className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 transition-all duration-200 origin-top-right ${
                isDropdownOpen
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 transition-colors text-sm">Profile</button>
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 transition-colors text-sm">Subscription</button>
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 transition-colors text-sm">Help</button>
              <hr className="my-2" />
              <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors text-sm">Logout</button>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
