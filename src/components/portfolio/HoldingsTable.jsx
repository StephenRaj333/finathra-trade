import { useEffect, useRef, useState, useMemo } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { PORTFOLIO_HOLDINGS } from '../../utils/placeholder-data';
import { TriangleUp, TriangleDown } from '../../utils/SvgCode';
import { ChevronRight } from 'lucide-react';

echarts.use([LineChart, GridComponent, CanvasRenderer]);

const Sparkline = ({ data, color = 'green' }) => {
  const ref = useRef(null);
  const lineColor = color === 'red' ? '#EF4444' : '#17B667';
  const gradientStart = color === 'red' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(23, 182, 103, 0.25)';
  const gradientEnd = color === 'red' ? 'rgba(239, 68, 68, 0)' : 'rgba(23, 182, 103, 0)';

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption({
      grid: { top: 2, right: 2, bottom: 2, left: 2 },
      xAxis: { type: 'category', show: false, data: data.map((_, i) => i), boundaryGap: false },
      yAxis: { type: 'value', show: false, min: Math.min(...data) - 0.5, max: Math.max(...data) + 0.5 },
      series: [{
        type: 'line',
        data,
        smooth: 0.6,
        symbol: 'none',
        lineStyle: { color: lineColor, width: 1.5 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: gradientStart },
            { offset: 1, color: gradientEnd },
          ]),
        },
      }],
      animation: false,
    });
    return () => chart.dispose();
  }, [data]);
  return <div ref={ref} style={{ width: 80, height: 30, flexShrink: 0 }} />;
};

export default function HoldingsTable() {
  // null = original order | 'green_first' | 'red_first'
  const [companySort, setCompanySort] = useState(null);
  // null = original order | 'desc' | 'asc'
  const [totalSort, setTotalSort] = useState(null);

  const sortedData = useMemo(() => {
    const data = [...PORTFOLIO_HOLDINGS];
    if (companySort === 'green_first') {
      return data.sort((a, b) => (b.isGain ? 1 : 0) - (a.isGain ? 1 : 0));
    }
    if (companySort === 'red_first') {
      return data.sort((a, b) => (a.isGain ? 1 : 0) - (b.isGain ? 1 : 0));
    }
    if (totalSort === 'desc') {
      return data.sort((a, b) => b.totalNum - a.totalNum);
    }
    if (totalSort === 'asc') {
      return data.sort((a, b) => a.totalNum - b.totalNum);
    }
    return data; // original backend order
  }, [companySort, totalSort]);

  const handleCompanySort = () => {
    setCompanySort(prev => {
      if (prev === null) return 'green_first';
      if (prev === 'green_first') return 'red_first';
      return null;
    });
    setTotalSort(null);
  };

  // Calculate overall portfolio performance
  const portfolioTotalGain = useMemo(() => {
    return PORTFOLIO_HOLDINGS.reduce((sum, row) => sum + row.totalNum, 0);
  }, []);

  const isPortfolioGain = portfolioTotalGain >= 0;

  const handleTotalSort = () => {
    setTotalSort(prev => (prev === 'desc' ? 'asc' : 'desc'));
    setCompanySort(null);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse" style={{ minWidth: 620 }}>
          <thead>
            <tr className="bg-[#EDE8F2] sticky top-0 z-10">
              <th
                className="px-4 py-2.5 text-left text-xs font-semibold text-black whitespace-nowrap w-[28%] cursor-pointer select-none"
                onClick={handleCompanySort}
              >
                <span className="flex items-center gap-1">
                  Company
                  {companySort === 'red_first'
                    ? <TriangleDown color="#ef4444" />
                    : <TriangleUp color="#079E53" />}
                </span>
              </th>
              <th className="px-3 py-2.5 text-right text-xs font-semibold text-black whitespace-nowrap">Units</th>
              <th className="px-3 py-2.5 text-right text-xs font-semibold text-black whitespace-nowrap">Avg Price</th>
              <th className="px-3 py-2.5 text-right text-xs font-semibold text-black whitespace-nowrap">Invested Value</th>
              <th className="px-3 py-2.5 text-right text-xs font-semibold text-black whitespace-nowrap">Current Value</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold whitespace-nowrap">
                <span className={`flex items-center justify-end gap-1`}>
                  Total <span className={`${isPortfolioGain ? 'text-[#079E53]' : 'text-[#ef4444]'}`}>(40.48%)</span>  
                  {isPortfolioGain ? <TriangleUp color="#079E53" /> : <TriangleDown color="#ef4444" />}
                </span>  
              </th> 
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-[#faf9ff] transition-colors cursor-pointer"
              >
                {/* Company + sparkline */}
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3 justify-between">
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-black leading-tight">{row.company}</p>
                      <p className="text-xxs text-[#7F7F7F] leading-tight mt-0.5">{row.index} &nbsp;·&nbsp; {row.timeAgo}</p>
                    </div>
                    <Sparkline data={row.sparkline} color={row.sparklineColor} />
                  </div>
                </td>
                {/* Units */}
                <td className="px-3 py-2.5 text-right text-[12px] font-semibold text-[#616161] whitespace-nowrap">
                  {row.units}
                </td>
                {/* Avg Price */}
                <td className="px-3 py-2.5 text-right text-[12px] font-bold text-black whitespace-nowrap">
                  {row.avgPrice}
                </td>
                {/* Invested Value */}
                <td className="px-3 py-2.5 text-right text-[12px] font-semibold text-[#616161] whitespace-nowrap">
                  {row.investedValue}
                </td>
                {/* Current Value */}
                <td className="px-3 py-2.5 text-right whitespace-nowrap">
                  <div className={`text-[12px] font-semibold leading-tight flex items-center justify-end gap-1.5 ${row.currentDirection === 'up' ? 'text-[#079E53]' : 'text-red-500'}`}>
                    <span>{row.currentValue}</span>
                    {row.currentDirection === 'up' ? <TriangleUp color="#22c55e" /> : <TriangleDown color="#ef4444" />}
                  </div> 
                </td>
                {/* Total */}
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2 justify-end">
                    <div className="flex flex-col items-end">
                      <div className={`text-[12px] font-semibold leading-tight flex items-center gap-1.5 ${row.isGain ? 'text-[#079E53]' : 'text-red-500'}`}>
                        <span>{row.total}</span>
                        {row.totalDirection === 'up' ? <TriangleUp color="#22c55e" /> : <TriangleDown color="#ef4444" />}
                      </div>
                      <p className={`text-xxs ${row.isGain ? 'text-[#079E53]' : 'text-[#ef4444]'} font-medium leading-tight mt-0.5`}>{row.totalPct}</p>
                    </div>
                    <ChevronRight size={16} color="#724A9A" /> 
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

