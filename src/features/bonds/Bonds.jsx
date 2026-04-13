import {Search} from 'lucide-react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {SEED,REGION_LABELS,COLUMNS} from '../../utils/placeholder-data';
const CIRC = 88;

const SELECT_ARROW = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23724A9A' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
};

// /* ── Brand Colors ── */
// const BRAND_PRIMARY = '#724A9A';     // Purple - Primary brand color
// const BRAND_BG = '#f7f7f7';          // Light gray - Backgrounds
// const STATUS_UP = '#ef4444';         // Red - Negative/Up yield
// const STATUS_DOWN = '#10b981';       // Green - Positive/Down yield
// const STATUS_NEUTRAL = '#2e4070';    // Dark blue - Neutral
// const STATUS_REDUCED = '#f59e0b';    // Amber - Reduced session
// const STATUS_CYAN = '#06b6d4';       // Cyan - Info
// const ACCENT_BLUE = '#3b82f6';       // Blue - Accent (data viz)
// const ACCENT_LIGHT = '#60a5fa';      // Light blue - Hover states 

function bondPrice(yld, matYr, coupon) {
  if (matYr <= 0) return 100;
  const y = yld / 100, c = coupon / 100, n = Math.floor(matYr);
  if (y <= 0) return 100 * (1 + c * n);
  return Math.round(((c * (1 - Math.pow(1 + y, -n)) / y) + Math.pow(1 + y, -n)) * 100 * 100) / 100;
}

function randn() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function getSession(region) {
  const h = new Date().getUTCHours();
  if (region === 'Americas') return h >= 12 && h < 21 ? 'open' : h >= 11 && h < 22 ? 'reduced' : 'closed';
  if (region === 'Europe') return h >= 7 && h < 17 ? 'open' : h >= 6 && h < 18 ? 'reduced' : 'closed';
  if (region === 'Asia-Pacific') return h >= 0 && h < 8 ? 'open' : h >= 22 || h < 9 ? 'reduced' : 'closed';
  return 'closed';
}

function ratingClass(r) {
  if (r.startsWith('AAA')) return 'bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.22)]';
  if (r.startsWith('AA')) return 'bg-[rgba(6,182,212,0.12)] text-[#06b6d4] border border-[rgba(6,182,212,0.22)]';
  if (r.startsWith('A')) return 'bg-[rgba(245,158,11,0.12)] text-[#f59e0b] border border-[rgba(245,158,11,0.22)]';
  return 'bg-[rgba(239,68,68,0.12)] text-[#ef4444] border border-[rgba(239,68,68,0.22)]';
}

const SESSION_DOT = {
  open: 'bg-[#10b981] shadow-[0_0_6px_#10b981]',
  reduced: 'bg-[#f59e0b] shadow-[0_0_6px_#f59e0b]',
  closed: 'bg-[#2e4070]',
};
const SESSION_TXT = { open: 'text-[#10b981]', reduced: 'text-[#f59e0b]', closed: 'text-[#2e4070]' };
const SESSION_LABEL = { open: 'Open', reduced: 'Pre/Post', closed: 'Closed' };

export default function Bond() {
  const [bonds, setBonds] = useState(() => JSON.parse(JSON.stringify(SEED)));
  const [sortCol, setSortCol] = useState('volume_bn');
  const [sortAsc, setSortAsc] = useState(false);
  const [regionFilter, setRegionFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [maturityFilter, setMaturityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [clockText, setClockText] = useState('—');
  const [updatedAt, setUpdatedAt] = useState('07 Apr 2026 14:19 UTC');
  const [flashMap, setFlashMap] = useState({});
  const prevYieldsRef = useRef({});
  const countdownRef = useRef(30);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const d = now.toLocaleDateString('en-GB', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
      const t = now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false });
      setClockText(d + '  ' + t + ' UTC');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Simulate update
  const simulateUpdate = useCallback(() => {
    setBonds(prev => {
      const prevMap = {};
      prev.forEach(b => { prevMap[b.id] = b.yield; });
      prevYieldsRef.current = prevMap;
      return prev.map(b => {
        const sigma = b.data_source === 'live' ? 0.003 : 0.008;
        const noise = randn() * sigma;
        const coupon = SEED.find(s => s.id === b.id).yield;
        const newYld = Math.round((b.yield + noise) * 1000) / 1000;
        const np = bondPrice(newYld, b.mat_yr, coupon);
        const op = bondPrice(b.yield, b.mat_yr, coupon);
        return {
          ...b,
          yield_change: Math.round((b.yield_change + noise) * 1000) / 1000,
          price_change: Math.round((np - op) * 1000) / 1000,
          yield: newYld,
          price: np,
          volume_bn: Math.round(b.volume_bn * (1 + randn() * 0.01) * 10) / 10,
        };
      });
    });
    setUpdatedAt(
      new Date().toLocaleString('en-GB', { timeZone: 'UTC', hour12: false }).replace(',', '') + ' UTC'
    );
  }, []);

  // Flash detection
  useEffect(() => {
    const prevMap = prevYieldsRef.current;
    if (!Object.keys(prevMap).length) return;
    const newFlash = {};
    bonds.forEach(b => {
      const prev = prevMap[b.id];
      if (prev !== undefined && b.yield !== prev) {
        newFlash[b.id] = b.yield > prev ? 'red' : 'green';
      }
    });
    if (Object.keys(newFlash).length) {
      setFlashMap(newFlash);
      const timeout = setTimeout(() => setFlashMap({}), 2000);
      return () => clearTimeout(timeout);
    }
  }, [bonds]);

  // Countdown
  useEffect(() => {
    const id = setInterval(() => {
      countdownRef.current -= 1;
      if (countdownRef.current <= 0) {
        simulateUpdate();
        countdownRef.current = 30;
      }
      setCountdown(countdownRef.current);
    }, 1000);
    return () => clearInterval(id);
  }, [simulateUpdate]);

  const handleManualUpdate = () => {
    simulateUpdate();
    countdownRef.current = 30;
    setCountdown(30);
  };

  // Derived data
  const countries = useMemo(() => [...new Set(bonds.map(b => b.country))].sort(), [bonds]);

  const filtered = useMemo(() => {
    return bonds.filter(b => {
      if (countryFilter && b.country !== countryFilter) return false;
      if (maturityFilter && b.maturity !== maturityFilter) return false;
      if (regionFilter && b.region !== regionFilter) return false;
      if (searchQuery) {
        const s = searchQuery.toLowerCase();
        if (!(b.country.toLowerCase().includes(s) || b.name.toLowerCase().includes(s) ||
              b.instrument.toLowerCase().includes(s) || b.maturity.toLowerCase().includes(s)))
          return false;
      }
      return true;
    });
  }, [bonds, countryFilter, maturityFilter, regionFilter, searchQuery]);

  const { maxVol, maxYld, maxAbsChg } = useMemo(() => ({
    maxVol: Math.max(...filtered.map(b => b.volume_bn), 1),
    maxYld: Math.max(...filtered.map(b => b.yield), 1),
    maxAbsChg: Math.max(...filtered.map(b => Math.abs(b.yield_change)), 0.01),
  }), [filtered]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = a[sortCol], vb = b[sortCol];
      if (typeof va === 'string') return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortAsc ? va - vb : vb - va;
    });
  }, [filtered, sortCol, sortAsc]);

  const stats = useMemo(() => {
    if (!filtered.length) return null;
    const vol = filtered.reduce((s, b) => s + b.volume_bn, 0);
    const avg = filtered.reduce((s, b) => s + b.yield, 0) / filtered.length;
    const up = filtered.filter(b => b.yield_change > 0.005).length;
    const dn = filtered.filter(b => b.yield_change < -0.005).length;
    const fl = filtered.length - up - dn;
    const srt = [...filtered].sort((a, b2) => b2.yield - a.yield);
    return { vol, avg, up, dn, fl, hi: srt[0], lo: srt[srt.length - 1] };
  }, [filtered]);

  // Handlers
  const handleSort = (col) => {
    if (!col) return;
    if (sortCol === col) {
      setSortAsc(prev => !prev);
    } else {
      setSortCol(col);
      setSortAsc(col === 'country' || col === 'instrument');
    }
  };

  const handleReset = () => {
    setCountryFilter('');
    setMaturityFilter('');
    setSearchQuery('');
    setRegionFilter('');
    setSortCol('volume_bn');
    setSortAsc(false);
  };

  const getSortIcon = (colKey) => {
    if (sortCol === colKey) return sortAsc ? '↑' : '↓';
    return '⇅';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
        @keyframes flashG{0%{background-color:rgba(16,185,129,.15)}100%{background-color:#ffffff}}
        @keyframes flashR{0%{background-color:rgba(239,68,68,.15)}100%{background-color:#ffffff}}
        .font-jb{font-family:'JetBrains Mono','Courier New',monospace}
        .animate-flashG{animation:flashG 2s ease}
        .animate-flashR{animation:flashR 2s ease}
        .animate-pulse-dot{animation:pulse 2s ease-in-out infinite}
      `}</style>

      <div
        className="min-h-screen bg-white text-[#333] text-[13px] leading-normal"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {/* ─── Header ─── */}
        <header className="bg-white border-b border-[#E0E0E4] py-3 px-6 flex items-center justify-between sticky top-[52px] z-10 max-[760px]:py-2.5 max-[760px]:px-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5a3a7d] to-[#724A9A] rounded-[10px] flex items-center justify-center text-[22px] shrink-0 shadow-[0_4px_18px_rgba(114,74,154,0.35)]">
              📊
            </div>
            <div>
              <div className="text-[18px] font-bold text-[#333] tracking-[-0.3px]">Global Bond Market</div>
              <div className="text-[10px] text-[#724A9A] uppercase tracking-[0.7px] mt-px font-medium">
                Top 10 Most Traded Government Bonds — Live Yields &amp; Market Data
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[18px]">
            <div className="font-jb text-[12px] text-[#724A9A] tracking-[0.8px] max-[760px]:hidden font-medium">
              {clockText}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[34px] h-[34px] relative shrink-0" title="Next update">
                <svg width="34" height="34" viewBox="0 0 34 34" className="block" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="17" cy="17" r="14" fill="none" stroke="rgba(114,74,154,0.15)" strokeWidth="2.5" />
                  <circle
                    cx="17" cy="17" r="14"
                    fill="none"
                    stroke="#724A9A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={(CIRC * (1 - countdown / 30)).toFixed(2)}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-jb text-[9px] text-[#724A9A] font-medium">
                  {countdown}
                </span>
              </div>
              <button
                onClick={handleManualUpdate}
                className="bg-[rgba(114,74,154,0.12)] border border-[rgba(114,74,154,0.25)] text-[#724A9A] py-[5px] px-3.5 rounded-[7px] cursor-pointer text-[11px] font-medium transition-all duration-150 hover:bg-[rgba(114,74,154,0.22)] hover:border-[#724A9A]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ↻ Update
              </button>
            </div>
          </div>
        </header>

        {/* ─── Stats ─── */}
        <div className="py-3 px-6 grid grid-cols-5 gap-2.5 border-b border-[#E0E0E4] bg-[#f7f7f7] max-[1100px]:grid-cols-3 max-[760px]:grid-cols-2 max-[760px]:py-3 max-[760px]:px-4">
          <div className="border border-[rgba(114,74,154,0.18)] rounded-[9px] py-3 px-3.5 bg-white transition-colors duration-200 hover:border-[#724A9A]">
            <div className="text-[10px] uppercase tracking-[0.8px] text-[#724A9A] mb-[5px] font-medium">Total Daily Volume</div>
            <div className="font-jb text-[19px] font-semibold text-[#333]">
              {stats ? `$${Math.round(stats.vol).toLocaleString('en')}B` : '—'}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">USD Equivalent</div>
          </div>
          <div className="border border-[rgba(114,74,154,0.18)] rounded-[9px] py-3 px-3.5 bg-white transition-colors duration-200 hover:border-[#724A9A]">
            <div className="text-[10px] uppercase tracking-[0.8px] text-[#724A9A] mb-[5px] font-medium">Average Yield</div>
            <div className="font-jb text-[19px] font-semibold text-[#333]">
              {stats ? `${stats.avg.toFixed(2)}%` : '—'}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">All bonds</div>
          </div>
          <div className="border border-[rgba(114,74,154,0.18)] rounded-[9px] py-3 px-3.5 bg-white transition-colors duration-200 hover:border-[#724A9A]">
            <div className="text-[10px] uppercase tracking-[0.8px] text-[#724A9A] mb-[5px] font-medium">Daily Movers</div>
            <div className="font-jb text-[19px] font-semibold text-[#333]">
              {stats ? (
                <>
                  <span className="text-[#ef4444]">{stats.up}↑</span>{' '}
                  <span className="text-gray-400">{stats.fl}—</span>{' '}
                  <span className="text-[#10b981]">{stats.dn}↓</span>
                </>
              ) : '—'}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">Yield up / flat / down</div>
          </div>
          <div className="border border-[rgba(114,74,154,0.18)] rounded-[9px] py-3 px-3.5 bg-white transition-colors duration-200 hover:border-[#724A9A]">
            <div className="text-[10px] uppercase tracking-[0.8px] text-[#724A9A] mb-[5px] font-medium">Highest Yield</div>
            <div className="font-jb text-[19px] font-semibold text-[#333]">
              {stats ? `${stats.hi.yield.toFixed(2)}%` : '—'}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              {stats ? `${stats.hi.flag} ${stats.hi.maturity} ${stats.hi.instrument}` : '—'}
            </div>
          </div>
          <div className="border border-[rgba(114,74,154,0.18)] rounded-[9px] py-3 px-3.5 bg-white transition-colors duration-200 hover:border-[#724A9A]">
            <div className="text-[10px] uppercase tracking-[0.8px] text-[#724A9A] mb-[5px] font-medium">Lowest Yield</div>
            <div className="font-jb text-[19px] font-semibold text-[#333]">
              {stats ? `${stats.lo.yield.toFixed(2)}%` : '—'}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              {stats ? `${stats.lo.flag} ${stats.lo.maturity} ${stats.lo.instrument}` : '—'}
            </div>
          </div>
        </div>

        {/* ─── Controls ─── */}
        <div className="py-2.5 px-6 flex items-center gap-2.5 flex-wrap border-b border-[#E0E0E4] bg-[#f7f7f7] max-[760px]:py-2 max-[760px]:px-4">
          <span className="text-[10px] uppercase tracking-[0.6px] text-[#724A9A] font-medium">Country</span>
          <select
            value={countryFilter}
            onChange={e => setCountryFilter(e.target.value)}
            className="bg-white border border-[rgba(114,74,154,0.25)] text-[#333] py-[5px] pr-7 pl-2.5 rounded-[6px] text-[12px] cursor-pointer appearance-none outline-none transition-colors duration-150 hover:border-[#724A9A] focus:border-[#724A9A]"
            style={{ ...SELECT_ARROW, fontFamily: "'Inter', sans-serif" }}
          >
            <option value="">All Countries</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <span className="text-[10px] uppercase tracking-[0.6px] text-[#724A9A] font-medium">Maturity</span>
          <select
            value={maturityFilter}
            onChange={e => setMaturityFilter(e.target.value)}
            className="bg-white border border-[rgba(114,74,154,0.25)] text-[#333] py-[5px] pr-7 pl-2.5 rounded-[6px] text-[12px] cursor-pointer appearance-none outline-none transition-colors duration-150 hover:border-[#724A9A] focus:border-[#724A9A]"
            style={{ ...SELECT_ARROW, fontFamily: "'Inter', sans-serif" }}
          >
            <option value="">All</option>
            <option value="2Y">2Y</option>
            <option value="5Y">5Y</option>
            <option value="10Y">10Y</option>
            <option value="30Y">30Y</option>
          </select>

          <span className="text-[10px] uppercase tracking-[0.6px] text-[#724A9A] font-medium">Region</span>
          <div className="flex gap-[5px]">
            {Object.entries(REGION_LABELS).map(([val, label]) => (
              <button
                key={val || 'all'}
                onClick={() => setRegionFilter(val)}
                className={`py-1 px-[11px] rounded-[20px] text-[11px] cursor-pointer border transition-all duration-150 ${
                  regionFilter === val
                    ? 'border-[#724A9A] text-[#724A9A] bg-[rgba(114,74,154,0.1)]'
                    : 'border-[rgba(114,74,154,0.10)] text-[#6278a0] bg-transparent hover:border-[#724A9A] hover:text-[#724A9A] hover:bg-[rgba(114,74,154,0.1)]'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="w-px h-[18px] bg-[rgba(114,74,154,0.20)] mx-0.5" />

          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-[#724A9A] pointer-events-none"><Search size={14} /></span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search…"
              className="bg-white border border-[rgba(114,74,154,0.25)] text-[#333] placeholder:text-gray-400 py-[5px] pl-7 pr-2.5 rounded-[6px] text-[12px] outline-none w-40 transition-colors duration-150 focus:border-[#724A9A]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <button
            onClick={handleReset}
            className="bg-white border border-[rgba(114,74,154,0.25)] text-[#724A9A] py-[5px] px-3 rounded-[6px] cursor-pointer text-[11px] transition-all duration-150 hover:border-[#724A9A] hover:bg-[rgba(114,74,154,0.06)]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ⊗ Reset
          </button>

          <div className="ml-auto flex items-center gap-[5px] bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.22)] py-[3px] px-2.5 rounded-[20px] text-[10px] text-[#10b981] uppercase tracking-[0.7px]">
            <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse-dot" />
            LIVE
          </div>

          <div className="text-[11px] text-gray-400">
            Data as of: <span>{updatedAt}</span>
          </div>
        </div>

        {/* ─── Table ─── */}
        <div className="px-6 pb-7 bg-white max-[760px]:px-4 max-[760px]:pb-6">
          <div className="overflow-x-auto rounded-[10px]">
            <table className="w-full border-separate border-spacing-0 min-w-[1100px] mt-1">
              <thead>
                <tr>
                  {COLUMNS.map((col, i) => {
                    const isSorted = sortCol === col.key;
                    const isFirst = i === 0;
                    const isLast = i === COLUMNS.length - 1;
                    return (
                      <th
                        key={col.label}
                        onClick={() => col.key && handleSort(col.key)}
                        className={`bg-[#EDE8F2] py-[9px] px-3 text-left text-[9.5px] font-semibold uppercase tracking-[0.9px] border-b border-[#C8B9D8] whitespace-nowrap select-none transition-colors duration-150 ${
                          col.key ? 'cursor-pointer hover:text-[#38155C]' : ''
                        } ${isSorted ? 'text-[#724A9A]' : 'text-[#38155C]'} ${
                          isFirst ? 'rounded-tl-[7px]' : ''
                        } ${isLast ? 'rounded-tr-[7px]' : ''}`}
                      >
                        {col.label}
                        {col.key && (
                          <span className={`ml-[3px] text-[9px] ${isSorted ? 'opacity-100' : 'opacity-[0.28]'}`}>
                            {getSortIcon(col.key)}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center py-12 text-gray-400 text-[13px]">
                      No bonds match the filters.
                    </td>
                  </tr>
                ) : (
                  sorted.map((b, idx) => {
                    const bpsR = b.yield_change * 100;
                    const bps = bpsR.toFixed(1);
                    const up = b.yield_change > 0.005;
                    const dn = b.yield_change < -0.005;
                    const chgColor = up ? 'text-[#ef4444]' : dn ? 'text-[#10b981]' : 'text-[#2e4070]';
                    const chgArw = up ? '▲' : dn ? '▼' : '—';
                    const chgSign = up ? '+' : '';
                    const chgBarW = Math.min(100, Math.abs(bpsR) / (maxAbsChg * 100) * 100).toFixed(0);
                    const chgBarColor = up ? 'bg-[rgba(239,68,68,0.35)]' : dn ? 'bg-[rgba(16,185,129,0.35)]' : '';
                    const yBarW = (b.yield / maxYld * 100).toFixed(0);
                    const vBarW = (b.volume_bn / maxVol * 100).toFixed(0);
                    const pcColor = b.price_change > 0 ? 'text-[#10b981]' : b.price_change < 0 ? 'text-[#ef4444]' : 'text-[#2e4070]';
                    const pcSign = b.price_change > 0 ? '+' : '';
                    const sess = getSession(b.region);
                    const isLast = idx === sorted.length - 1;
                    const tdBorder = isLast ? '' : 'border-b border-gray-100';
                    const flash = flashMap[b.id] === 'green' ? 'animate-flashG' : flashMap[b.id] === 'red' ? 'animate-flashR' : '';

                    return (
                      <tr
                        key={b.id}
                        className={`bg-white transition-colors duration-100 hover:bg-gray-50 ${flash}`}
                      >
                        {/* Country */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <div className="flex items-center gap-[9px]">
                            <span className="text-[20px] leading-none">{b.flag}</span>
                            <div>
                              <div className="text-[13px] font-medium text-[#333]">{b.country}</div>
                              <div className="text-[10px] text-gray-400 mt-px">{b.name}</div>
                            </div>
                          </div>
                        </td>
                        {/* Instrument */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <span className="text-[12px] text-gray-400">{b.instrument}</span>
                        </td>
                        {/* Maturity */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <span className="bg-[rgba(114,74,154,0.1)] text-[#724A9A] border border-[rgba(114,74,154,0.2)] py-0.5 px-[9px] rounded-[5px] font-jb text-[11px] font-medium">
                            {b.maturity}
                          </span>
                        </td>
                        {/* Session */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <div className="flex items-center gap-[5px] text-[11px]">
                            <div className={`w-[7px] h-[7px] rounded-full shrink-0 ${SESSION_DOT[sess]}`} />
                            <span className={SESSION_TXT[sess]}>{SESSION_LABEL[sess]}</span>
                          </div>
                        </td>
                        {/* Yield */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <div className="font-jb text-[15px] font-semibold text-[#333]">{b.yield.toFixed(3)}%</div>
                          <div className="mt-[3px] h-0.5 bg-gray-100 rounded-sm w-[76px] overflow-hidden">
                            <div
                              className="h-full rounded-sm bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] transition-[width] duration-[600ms] ease-out"
                              style={{ width: `${yBarW}%` }}
                            />
                          </div>
                        </td>
                        {/* Chg (bps) */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <div className={`font-jb text-[12px] font-medium flex items-center gap-[3px] ${chgColor}`}>
                            {chgArw} {chgSign}{bps}
                            <span className="text-[9px] ml-0.5">bps</span>
                          </div>
                          <div
                            className={`mt-[3px] h-0.5 rounded-sm max-w-[60px] ${chgBarColor}`}
                            style={{ width: `${chgBarW}%` }}
                          />
                        </td>
                        {/* Price */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <span className="font-jb text-[13px] text-[#333]">{b.price.toFixed(2)}</span>
                        </td>
                        {/* Px Chg */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <span className={`font-jb text-[11px] ${pcColor}`}>{pcSign}{b.price_change.toFixed(2)}</span>
                        </td>
                        {/* Volume */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap min-w-[130px] ${tdBorder}`}>
                          <div className="font-jb text-[13px] text-[#333] mb-1">${b.volume_bn.toFixed(1)}B</div>
                          <div className="h-[3px] bg-gray-100 rounded-sm overflow-hidden">
                            <div
                              className="h-full rounded-sm bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] transition-[width] duration-[600ms] ease-out"
                              style={{ width: `${vBarW}%` }}
                            />
                          </div>
                        </td>
                        {/* Rating */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <span className={`py-0.5 px-2 rounded-[4px] font-jb text-[10.5px] font-semibold ${ratingClass(b.rating)}`}>
                            {b.rating}
                          </span>
                        </td>
                        {/* CCY */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          <span className="text-[10px] font-jb text-gray-400 bg-gray-100 py-0.5 px-[7px] rounded-[4px]">
                            {b.currency}
                          </span>
                        </td>
                        {/* Source */}
                        <td className={`py-[11px] px-3 align-middle whitespace-nowrap ${tdBorder}`}>
                          {b.data_source === 'live' ? (
                            <span className="text-[10px] text-[#10b981]" title="Yahoo Finance real-time">● Live</span>
                          ) : b.data_source === 'delayed' ? (
                            <span className="text-[10px] text-[#f59e0b]" title="1-day delayed">◐ Delayed</span>
                          ) : (
                            <span className="text-[10px] text-[#2e4070]" title="Market estimate">○ Est.</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Footer ─── */}
        <div className="border-t border-[#E0E0E4] bg-[#f7f7f7] py-3 px-6 flex justify-between items-center text-[10.5px] text-gray-400 flex-wrap gap-2">
          <div>
            Data: <b>Yahoo Finance</b> (US Treasuries 2Y/5Y/10Y/30Y — real-time at load) ·{' '}
            <b>Indicative estimates</b> (JGB · Bunds · OATs · Gilts · CGB · GoC · ACGB · KTB · BTP) ·{' '}
            Intraday micro-movements simulated every 30s
          </div>
          <div>For informational purposes only. Not investment advice.</div>
        </div>
      </div>
    </>
  );
}
