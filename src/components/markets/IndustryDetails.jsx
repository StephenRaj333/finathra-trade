import { useEffect, useRef, useState, useCallback } from 'react';
import * as echarts from 'echarts';
import { HISTORY_DATA } from '../../utils/placeholder-data';

/* ──────────────────────────────────────────────────────────────────────────────
 *  DUMMY DATA — Replace with API calls during backend integration.
 *
 *  Expected API response shape:
 *  {
 *    dates: string[],         // Array of date strings e.g. ["2025-04-11", ...]
 *    values: number[],        // Corresponding PE or PB values
 *    currentValue: number,    // Latest value e.g. 37.03
 *    percentile: number,      // Percentile rank e.g. 1.89
 *    industryName: string,    // e.g. "Software & IT Service"
 *  }
 *
 *  Filters:
 *    timeframe — 1Y, 3Y, 5Y        (dropdown)
 *    historyType — PE / PB          (sub-tab)
 * 
 *  To integrate:
 *    Replace `HISTORY_DATA[historyType][timeframe]` with:
 *      fetch(`/api/industry-details?type=${historyType}&tf=${timeframe}`)
 * ────────────────────────────────────────────────────────────────────────────── */

const TIMEFRAME_OPTIONS = ['1Y', '3Y', '5Y'];

/* ── Chevron icon ── */
const ChevronDown = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════════════
 *  MAIN COMPONENT
 * ══════════════════════════════════════════════════════════════════════════════ */
export default function IndustryDetails() {
  const [mainTab, setMainTab] = useState('Details');
  const [subTab, setSubTab] = useState('PE History');
  const [timeframe, setTimeframe] = useState('1Y');
  const [tfDropdownOpen, setTfDropdownOpen] = useState(false);

  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  /* ── Derive the history type from subTab ── */
  const historyType = subTab === 'PE History' ? 'PE' : 'PB';

  /* ── Get current dataset ── */
  const getData = useCallback(() => {
    return HISTORY_DATA[historyType]?.[timeframe] || {};
  }, [historyType, timeframe]);

  /* ── Format date for display ── */
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
  };

  /* ── Init ECharts ── */
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const container = chartContainerRef.current;

    // Always reinitialize when mainTab changes to 'Details'
    if (mainTab === 'Details') {
      // Dispose old instance if it exists
      if (chartInstance.current) { 
        chartInstance.current.dispose();
      }
      // Create new instance
      chartInstance.current = echarts.init(container);
    }

    const observer = new ResizeObserver(() => {
      chartInstance.current?.resize();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [mainTab]);

  /* ── Update chart when data changes ── */
  useEffect(() => {
    if (!chartInstance.current || mainTab !== 'Details') return;

    const data = getData();
    const { dates = [], values = [] } = data;
    
    // Guard against empty data
    if (!dates.length || !values.length) { 
      return;
    }

    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);
    const padding = (maxVal - minVal) * 0.15;

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        borderColor: '#E0E0E4',
        borderWidth: 1,
        textStyle: { fontSize: 10, color: '#333' },
        formatter: (params) => {
          const p = params[0];
          return `<span style="font-size:10px;color:#9ca3af">${p.name}</span><br/><b style="color:#724A9A">${p.value}</b>`;
        },
        axisPointer: {
          lineStyle: { color: '#d1d5db', type: 'dashed' },
        },
      },
      grid: {
        left: 8,
        right: 8,
        top: 12,
        bottom: 8,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: false,
        axisLabel: {
          show: true,
          fontSize: 9,
          color: '#9ca3af',
          formatter: (val, idx) => {
            if (idx === 0) return formatDate(val);
            if (idx === dates.length - 1) return formatDate(val);
            return '';
          },
          showMinLabel: true,
          showMaxLabel: true,
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        min: Math.floor((minVal - padding) * 100) / 100,
        max: Math.ceil((maxVal + padding) * 100) / 100,
        splitNumber: 3,
        axisLabel: {
          fontSize: 9,
          color: '#9ca3af',
          formatter: (val) => val.toFixed(2),
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: { color: '#f3f4f6', type: 'dashed' },
        },
      },
      series: [
        {
          type: 'line',
          data: values,
          smooth: 0.3,
          symbol: 'none',
          lineStyle: {
            color: '#ef4444',
            width: 1.5,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(239, 68, 68, 0.12)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0.01)' },
            ]),
          },
          animationDuration: 800,
          animationEasing: 'cubicOut',
        },
      ],
    };

    chartInstance.current.setOption(option);
    chartInstance.current.resize(); 
  }, [getData, mainTab, timeframe, subTab]);

  /* ── Resize when switching tabs or timeframe ── */
  useEffect(() => {
    if (mainTab === 'Details' && chartInstance.current) {
      setTimeout(() => {
        chartInstance.current?.resize();
      }, 0);
    }
  }, [mainTab]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, []);

  const data = getData();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Main tabs ── */}
      <div className="flex items-center border-b border-[#E0E0E4] bg-[#f7f7f7] shrink-0">
        {['Details', 'Related Stocks'].map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`px-4 py-2 text-xs font-medium border-r border-[#E0E0E4] rounded-tr-lg transition-all whitespace-nowrap ${
              mainTab === tab ? 'bg-white text-black' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto pr-3 text-gray-400 cursor-pointer hover:text-gray-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      </div>

      {mainTab === 'Details' ? (
        <>
          {/* ── Sub controls: timeframe dropdown + PE/PB tabs ── */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 shrink-0 bg-white">
            {/* Timeframe dropdown */}
            <div className="relative">
              <button
                onClick={() => setTfDropdownOpen(!tfDropdownOpen)}
                className="flex items-center gap-1 border border-gray-200 rounded px-2 py-0.5 text-xs text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                {timeframe}
                <ChevronDown />
              </button>
              {tfDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-10 min-w-[60px]">
                  {TIMEFRAME_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => { setTimeframe(opt); setTfDropdownOpen(false); }}
                      className={`px-3 py-1.5 text-xs cursor-pointer transition-colors ${
                        timeframe === opt
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

            {/* PE / PB History tabs with sliding indicator */}
            <div className="relative flex">
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-[#724A9A] transition-all duration-300 ease-out rounded-full"
                style={{
                  width: '50%',
                  transform: `translateX(${['PE History', 'PB History'].indexOf(subTab) * 100}%)`,
                }}
              />
              {['PE History', 'PB History'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSubTab(tab)}
                  className={`px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                    subTab === tab ? 'text-[#724A9A]' : 'text-[#7F7F7F] hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ── Description text ── */}
          <div className="px-3 py-2.5 shrink-0 bg-white">
            <p className="text-[11px] text-gray-600 leading-[1.6]">
              The <span className="font-semibold text-[#724A9A]">{historyType}</span> value of {data.industryName || 'Software & IT Service'} industry is{' '}
              <span className="font-bold text-gray-800">{data.currentValue}</span> and the current valuation is higher than the{' '}
              <span className="font-bold text-[#724A9A]">{data.percentile}%</span> time in the past {timeframe === '1Y' ? '1' : timeframe === '3Y' ? '3' : '5'} year(s).
            </p>
          </div>

          {/* ── ECharts area chart — always mounted ── */}
          <div className="flex-1 min-h-0 min-w-0 overflow-hidden px-1 pb-1" ref={chartContainerRef} />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-300 text-xs">
          Related Stocks
        </div>
      )}
    </div>
  );
}
