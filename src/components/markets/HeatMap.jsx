import { useState, useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
import { HEATMAP_DATA, BEST_PERFORMING_INDUSTRIES, MOST_POPULAR_ETFS } from '../../utils/placeholder-data';

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


const INDUSTRIES = Object.keys(HEATMAP_DATA);

const MARKETS_OPTIONS = ['Stock Market', 'Crypto', 'Commodities', 'Forex', 'Futures'];
const REGIONS_OPTIONS = ['North America', 'Europe', 'Asia Pacific', 'Emerging Markets', 'Global'];

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
    width="14" height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`transition-transform duration-300 ease-out ${open ? 'rotate-0' : '-rotate-90'}`} 
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Collapsible Dropdown ── */
const Dropdown = ({ label, value, options, onChange, open, onToggle }) => (
  <div className='p-1'>
    <button
      onClick={onToggle}
      className="w-full flex border border-[#E0E0E4] bg-[#F7F7F7] rounded items-center justify-between p-2 mb-1 text-xs font-normal text-[#38155C] hover:bg-gray-50 transition-colors"
    >
      <span>{label}</span>
      <ChevronDown open={open} />
    </button>
    {open && (
      <div className="max-h-[100px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-300">
        {options.map((opt) => (
          <div
            key={opt} 
            onClick={() => onChange(opt)}
            className={`px-3 py-2 text-xs cursor-pointer transition-all duration-200 truncate ${
              value === opt
                ? 'bg-[#EDE8F2] text-[#38155C] font-normal'
                : 'text-[#616161] hover:bg-gray-50' 
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
  const [selectedMarket, setSelectedMarket] = useState('Stock Market');
  const [selectedRegion, setSelectedRegion] = useState('North America');

  // Dropdown open/close states — all closed by default
  const [industryOpen, setIndustryOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);

  // Trigger to (re)apply chart options after init
  const [applyOptions, setApplyOptions] = useState(0);

  // ECharts ref
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  /* ── Build ECharts treemap data from selected filters ── */
  const buildTreemapData = useCallback(() => {
    let raw = [];
    
    if (mainTab === 'Heat Map') {
      raw = HEATMAP_DATA[selectedIndustry] || [];
      // Filter by market and region
      raw = raw.filter(item => {
        const matchMarket = !selectedMarket || item.market === selectedMarket;
        const matchRegion = !selectedRegion || item.region === selectedRegion;  
        return matchMarket && matchRegion;
      });
    } else if (mainTab === 'Best-Performing Industries') { 
      raw = BEST_PERFORMING_INDUSTRIES;
    } else if (mainTab === 'Most Popular ETFs') {
      raw = MOST_POPULAR_ETFS;
    }
    
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
  }, [selectedIndustry, selectedMarket, selectedRegion, mainTab]);

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
          return `<b class='font-normal text-sm'>${name}</b><br/>Market Cap: ${value}B<br/>Change: ${sign}${data.change}%`;
        },
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        containLabel: false,
      },
      series: [
        {
          type: 'treemap',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          roam: false,
          nodeClick: false,
          breadcrumb: { show: false },
          label: {
            show: true,
            textAlign: 'center',
            verticalAlign: 'middle',
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
                fontWeight: 'medium',
                color: '#fff',
                lineHeight: 20,
                align: 'center',
              },
              change: {
                fontSize: 10,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 16,
                align: 'center',
              },
              small: {
                fontSize: 9,
                color: '#fff',
                fontWeight: 500,  
                align: 'center',
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

  /* ── Cleanup on component unmount only ── */
  useEffect(() => {
    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, []);

  /* ── Trigger resize when switching back to Heat Map ── */
  useEffect(() => {
    if (mainTab === 'Heat Map') {
      requestAnimationFrame(() => {
        chartInstance.current?.resize(); 
        setApplyOptions((n) => n + 1);
      });
    }
  }, [mainTab]);

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

      {/* ── Heat Map — always mounted so ECharts instance is never destroyed ── */}
      <div className="flex flex-1 overflow-hidden min-h-0" style={{ display: mainTab === 'Heat Map' ? 'flex' : 'none' }}>
        {/* Left Sidebar */}
        <div className="w-[180px] shrink-0 flex flex-col border-r border-gray-100 overflow-y-auto bg-white hide-scrollbar">
          <Dropdown
            label="Industries"
            value={selectedIndustry}
            options={INDUSTRIES}
            onChange={(v) => { setSelectedIndustry(v); }}
            open={industryOpen}
            onToggle={() => {
              setIndustryOpen(!industryOpen);
              if (!industryOpen) { setMarketOpen(false); setRegionOpen(false); }
            }}
          />
          <Dropdown
            label="Markets"
            value={selectedMarket}
            options={MARKETS_OPTIONS}
            onChange={(v) => { setSelectedMarket(v); }}
            open={marketOpen}
            onToggle={() => {
              setMarketOpen(!marketOpen);
              if (!marketOpen) { setIndustryOpen(false); setRegionOpen(false); }
            }}
          />
          <Dropdown
            label="Regions"
            value={selectedRegion}
            options={REGIONS_OPTIONS}
            onChange={(v) => { setSelectedRegion(v); }}
            open={regionOpen}
            onToggle={() => {
              setRegionOpen(!regionOpen);
              if (!regionOpen) { setIndustryOpen(false); setMarketOpen(false); }
            }}
          />
        </div>
        {/* ECharts Treemap — always in DOM */}
        <div className="flex-1 w-full min-w-0 min-h-0 overflow-hidden" ref={chartContainerRef} />
      </div>

      {/* ── Best-Performing Industries ── */}
      {mainTab === 'Best-Performing Industries' && (
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#EDE8F2] sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-black">#</th>
                <th className="px-4 py-2 text-left font-medium text-black">Industry</th>
                <th className="px-4 py-2 text-right font-medium text-black">Market Cap (B)</th>
                <th className="px-4 py-2 text-right font-medium text-black">% Change</th>
                <th className="px-4 py-2 text-right font-medium text-black">Sparkline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {BEST_PERFORMING_INDUSTRIES.map((item, idx) => (
                <tr key={item.name} className="hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-4 py-2 text-gray-400 font-normal">{idx + 1}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-2 text-right text-gray-600">${item.value.toLocaleString()}</td>
                  <td className={`px-4 py-2 text-right font-medium ${item.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </td>
                  <td className="px-4 py-2 text-right">
                    <svg width="60" height="20" viewBox="0 0 60 20">
                      <polyline
                        points={`0,${item.change >= 0 ? 16 : 4} 15,${item.change >= 0 ? 12 : 8} 30,${item.change >= 0 ? 8 : 14} 45,${item.change >= 0 ? 5 : 10} 60,${item.change >= 0 ? 3 : 16}`}
                        fill="none"
                        stroke={item.change >= 0 ? '#22c55e' : '#ef4444'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Most Popular ETFs ── */}
      {mainTab === 'Most Popular ETFs' && (
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#EDE8F2] sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-black">#</th>
                <th className="px-4 py-2 text-left font-medium text-black">ETF</th>
                <th className="px-4 py-2 text-right font-medium text-black">AUM (B)</th>
                <th className="px-4 py-2 text-right font-medium text-black">% Change</th>
                <th className="px-4 py-2 text-right font-medium text-black">Sparkline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOST_POPULAR_ETFS.map((item, idx) => (
                <tr key={item.name} className="hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-4 py-2 text-gray-400 font-normal">{idx + 1}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-2 text-right text-gray-600">${item.value.toLocaleString()}</td>
                  <td className={`px-4 py-2 text-right font-medium ${item.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </td>
                  <td className="px-4 py-2 text-right">
                    <svg width="60" height="20" viewBox="0 0 60 20">
                      <polyline
                        points={`0,${item.change >= 0 ? 16 : 4} 15,${item.change >= 0 ? 10 : 10} 30,${item.change >= 0 ? 7 : 14} 45,${item.change >= 0 ? 4 : 12} 60,${item.change >= 0 ? 2 : 17}`}
                        fill="none"
                        stroke={item.change >= 0 ? '#22c55e' : '#ef4444'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
