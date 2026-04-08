import { useState, useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';

/* ──────────────────────────────────────────────────────────────────────────────
 *  DUMMY DATA — Replace with API calls during backend integration.
 *  
 *  Expected API response shape per industry:
 *  {
 *    name: string,            // Ticker symbol e.g. "NVDA"
 *    value: number,           // Market cap in billions (determines block size)
 *    change: number,          // % change (determines block color)
 *  }
 *
 *  Three filters drive the data:
 *    1. industry   — which sector to show  (left sidebar dropdown #1)
 *    2. sortBy     — how to weight blocks   (left sidebar dropdown #2)
 *    3. timeframe  — period for % change    (left sidebar dropdown #3)
 *
 *  To integrate:
 *    Replace `HEATMAP_DATA[industry]` lookups with:
 *      fetch(`/api/heatmap?industry=${industry}&sort=${sortBy}&tf=${timeframe}`)
 * ────────────────────────────────────────────────────────────────────────────── */

const HEATMAP_DATA = {
  'Healthcare Providers': [
    { name: 'UNH', value: 4800, change: 1.23 },
    { name: 'CVS', value: 1200, change: 0.44 },
    { name: 'HCA', value: 800, change: -0.22 },
    { name: 'CNC', value: 600, change: 0.88 },
    { name: 'ELV', value: 900, change: 0.15 },
    { name: 'HUM', value: 500, change: -0.65 },
  ],
  'Communications & Ne...': [
    { name: 'CSCO', value: 2200, change: 0.15 },
    { name: 'CMCSA', value: 1600, change: 0.33 },
    { name: 'T', value: 1400, change: -0.18 },
    { name: 'VZ', value: 1100, change: 0.05 },
    { name: 'NFLX', value: 2800, change: 0.77 },
    { name: 'DIS', value: 1800, change: 0.42 },
  ],
  'Semiconductors & Se...': [
    { name: 'NVDA', value: 3200, change: 0.26 },
    { name: 'TSM', value: 2800, change: 1.04 },
    { name: 'AVGO', value: 2400, change: 6.21 },
    { name: 'AMD', value: 1200, change: 0.55 },
    { name: 'INTC', value: 1100, change: -0.45 },
    { name: 'KLAC', value: 900, change: 0.33 },
    { name: 'ASML', value: 1500, change: 0.82 },
    { name: 'AMAT', value: 800, change: 0.28 },
    { name: 'LRCX', value: 700, change: 0.12 },
    { name: 'QCOM', value: 1400, change: 0.19 },
    { name: 'MRVL', value: 500, change: -0.35 },
    { name: 'MU', value: 600, change: 0.44 },
  ],
  'Electronic Equipment ...': [
    { name: 'APH', value: 900, change: 0.66 },
    { name: 'GLW', value: 500, change: 0.22 },
    { name: 'TEL', value: 700, change: -0.11 },
    { name: 'KEYS', value: 400, change: 0.33 },
  ],
  'Oil & Gas Related Equi...': [
    { name: 'SLB', value: 800, change: -0.22 },
    { name: 'BKR', value: 600, change: 0.35 },
    { name: 'HAL', value: 500, change: 0.11 },
    { name: 'FTI', value: 300, change: -0.55 },
  ],
  'Natural Gas Utilities': [
    { name: 'LNG', value: 1200, change: 0.44 },
    { name: 'KINDER', value: 800, change: 0.18 },
    { name: 'WMB', value: 700, change: 0.55 },
    { name: 'OKE', value: 500, change: -0.12 },
  ],
  'Software & IT Services': [
    { name: 'MSFT', value: 3100, change: 0.88 },
    { name: 'ORCL', value: 1800, change: 0.45 },
    { name: 'CRM', value: 1400, change: -0.33 },
    { name: 'NOW', value: 1100, change: 0.66 },
    { name: 'ADBE', value: 1300, change: 0.22 },
    { name: 'INTU', value: 900, change: 0.55 },
  ],
  'Oil & Gas': [
    { name: 'CVX', value: 2800, change: 0.77 },
    { name: 'XOM', value: 3200, change: 0.55 },
    { name: 'COP', value: 1700, change: 0.12 },
    { name: 'EOG', value: 800, change: -0.33 },
    { name: 'PXD', value: 600, change: 0.28 },
  ],
  'Electric Utilities & IPPs': [
    { name: 'NEE', value: 1600, change: 0.44 },
    { name: 'DUK', value: 1200, change: 0.18 },
    { name: 'SO', value: 1000, change: -0.22 },
    { name: 'GEV', value: 700, change: 0.33 },
  ],
  'Metals & Mining': [
    { name: 'BHP', value: 1800, change: 0.55 },
    { name: 'RIO', value: 1500, change: 0.33 },
    { name: 'NEM', value: 900, change: -0.44 },
    { name: 'FCX', value: 700, change: 0.22 },
    { name: 'VALE', value: 600, change: -0.18 },
  ],
};

const INDUSTRIES = Object.keys(HEATMAP_DATA);

const SORT_OPTIONS = ['Market Cap', 'Performance', 'Volatility'];
const TIMEFRAME_OPTIONS = ['1D', '1W', '1M', '3M', '1Y'];

/* ── Color logic: green for gains, red for losses, intensity by magnitude ── */
const getColor = (change) => {
  if (change > 3)    return '#16a34a'; // dark green
  if (change > 1)    return '#22c55e'; // green
  if (change > 0.5)  return '#4ade80'; // medium green
  if (change > 0)    return '#86efac'; // light green
  if (change > -0.5) return '#fca5a5'; // light red
  if (change > -1)   return '#f87171'; // medium red
  return '#ef4444';                     // dark red
};

/* ── Chevron icon ── */
const ChevronDown = ({ open }) => (
  <svg
    width="10" height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Collapsible Dropdown ── */
const Dropdown = ({ label, value, options, onChange, open, onToggle }) => (
  <div className="border-b border-gray-100">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <span>{label}</span>
      <ChevronDown open={open} />
    </button>
    {open && (
      <div className="max-h-[180px] overflow-y-auto">
        {options.map((opt) => (
          <div
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-2 text-xs cursor-pointer transition-colors truncate ${
              value === opt
                ? 'bg-[#EDE8F2] text-[#724A9A] font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {opt}
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════════
 *  MAIN COMPONENT
 * ══════════════════════════════════════════════════════════════════════════════ */
export default function HeatMap() {
  const mainTabs = ['Heat Map', 'Best-Performing Industries', 'Most Popular ETFs'];
  const [mainTab, setMainTab] = useState('Heat Map');

  // Dropdown states
  const [selectedIndustry, setSelectedIndustry] = useState('Semiconductors & Se...');
  const [sortBy, setSortBy] = useState('Market Cap');
  const [timeframe, setTimeframe] = useState('1D');

  // Dropdown open/close states — all closed by default
  const [industryOpen, setIndustryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [timeframeOpen, setTimeframeOpen] = useState(false);

  // Trigger to (re)apply chart options after init
  const [applyOptions, setApplyOptions] = useState(0);

  // ECharts ref
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  /* ── Build ECharts treemap data from selected filters ── */
  const buildTreemapData = useCallback(() => {
    const raw = HEATMAP_DATA[selectedIndustry] || [];
    return raw.map((item) => ({
      name: item.name,
      value: item.value,
      change: item.change,
      itemStyle: {
        color: getColor(item.change),
        borderColor: '#fff',
        borderWidth: 2,
        gapWidth: 2,
      },
    }));
  }, [selectedIndustry, sortBy, timeframe]);

  /* ── Init ECharts (deferred so container has real dimensions) ── */
  useEffect(() => {
    if (!chartContainerRef.current) return;
    let rafId;
    const container = chartContainerRef.current;

    const init = () => {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(container);
      }
    };

    // Defer to after layout paint, then apply current options
    rafId = requestAnimationFrame(() => {
      init();
      chartInstance.current?.resize();
      // Trigger initial option render now that chart exists
      setApplyOptions((n) => n + 1);
    });

    const observer = new ResizeObserver(() => {
      if (!chartInstance.current) init();
      chartInstance.current?.resize();
    });
    observer.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  /* ── Update options when data changes ── */
  useEffect(() => {
    if (!chartInstance.current) return;

    const treeData = buildTreemapData();

    const option = {
      tooltip: {
        formatter: (info) => {
          const { name, value, data } = info;
          const sign = data.change > 0 ? '+' : '';
          return `<b>${name}</b><br/>Market Cap: ${value}B<br/>Change: ${sign}${data.change}%`;
        },
      },
      series: [
        {
          type: 'treemap',
          width: '100%',
          height: '100%',
          roam: false,
          nodeClick: false,
          breadcrumb: { show: false },
          label: {
            show: true,
            formatter: (params) => {
              const change = params.data.change;
              const sign = change > 0 ? '+' : '';
              if (params.data.value > 1500) {
                return `{name|${params.name}}\n{change|${sign}${change}%}`;
              }
              return `{small|${params.name}}`;
            },
            rich: {
              name: {
                fontSize: 13,
                fontWeight: 'bold',
                color: '#fff',
                lineHeight: 20,
              },
              change: {
                fontSize: 10,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 16,
              },
              small: {
                fontSize: 9,
                color: '#fff',
                fontWeight: 600,
              },
            },
          },
          itemStyle: {
            gapWidth: 2,
            borderColor: '#fff',
            borderWidth: 2,
          },
          data: treeData,
          animationDurationUpdate: 500,
        },
      ],
    };

    chartInstance.current.setOption(option, true);
    chartInstance.current.resize();
  }, [buildTreemapData, applyOptions]); 

  /* ── Cleanup ── */
  useEffect(() => {
    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden heatmap-container">  

      {/* ── Tabs ── */}
      <div className="flex items-center border-b border-[#E0E0E4] bg-[#f7f7f7] shrink-0">
        {mainTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`px-4 py-2 text-xs font-medium border-r border-[#E0E0E4] rounded-tr-lg transition-all whitespace-nowrap ${
              mainTab === tab
                ? 'bg-white text-black'
                : 'text-gray-600 border-b-transparent hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {mainTab === 'Heat Map' ? (
        <div className="flex flex-1 overflow-hidden min-h-0">

          {/* ── Left Sidebar — 3 collapsible dropdowns ── */}
          <div className="w-[180px] shrink-0 flex flex-col border-r border-gray-100 overflow-y-auto bg-white hide-scrollbar">
            <Dropdown
              label="Industries"
              value={selectedIndustry}
              options={INDUSTRIES}
              onChange={(v) => { setSelectedIndustry(v); setIndustryOpen(false); }}
              open={industryOpen}
              onToggle={() => setIndustryOpen((p) => !p)}
            />
            <Dropdown
              label="Sort By"
              value={sortBy}
              options={SORT_OPTIONS}
              onChange={(v) => { setSortBy(v); setSortOpen(false); }}
              open={sortOpen}
              onToggle={() => setSortOpen((p) => !p)} 
            />
            <Dropdown
              label="Timeframe"
              value={timeframe}
              options={TIMEFRAME_OPTIONS}
              onChange={(v) => { setTimeframe(v); setTimeframeOpen(false); }}
              open={timeframeOpen}
              onToggle={() => setTimeframeOpen((p) => !p)}
            />
          </div>

          {/* ── ECharts Treemap ── */}
          <div className="flex-1 min-w-0 min-h-0 overflow-hidden" ref={chartContainerRef} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-300 text-sm">
          {mainTab}
        </div>
      )}
    </div>
  );
}
