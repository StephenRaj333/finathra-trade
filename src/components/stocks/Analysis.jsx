import { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import SlidingTabBar from '../common/SlidingTabBar';
import { ANALYST_DATA } from '../../utils/placeholder-data';

const TABS = ['Analysts', 'Quant Rating'];

/* ── Bar color map ── */
const BAR_COLORS = {
    strongBuy: '#187346',
    buy: '#17B667',
    hold: '#CD8F3D',
    underperform: '#F8A8B0',
    sell: '#EC4D5C',
};

/* ══════════════════════════════════════════════════════════════════════════════
 *  Vertical bar chart — Analyst Rating breakdown  
 * ══════════════════════════════════════════════════════════════════════════════ */
function RatingBarChart({ breakdown }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const chart = echarts.init(chartRef.current, null, { renderer: 'canvas' });

        const values = breakdown.map(d => d.percentage);
        const colors = breakdown.map(d => BAR_COLORS[d.color] ?? '#9ca3af');

        chart.setOption({
            animation: true,
            animationDuration: 600,
            animationEasing: 'cubicOut',
            grid: { left: 24, right: 24, top: 28, bottom: 20, containLabel: false },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'none' },
                backgroundColor: '#fff',
                borderColor: '#E0E0E4',
                borderWidth: 1,
                textStyle: { fontSize: 11, color: '#333' },
                formatter: (params) => {
                    const p = params[0];
                    return `<b>${p.value}%</b>`;
                },
            },
            xAxis: {
                type: 'category',
                data: breakdown.map(d => d.label),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false },
            },
            yAxis: {
                type: 'value',
                max: 60,
                show: false,
                splitLine: { show: false },
            },
            series: [
                {
                    type: 'bar',
                    data: values.map((v, i) => ({
                        value: v,
                        itemStyle: { color: colors[i], borderRadius: [0, 0, 0, 0] },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}%',
                            fontSize: 10,
                            fontWeight: 500,
                            color: colors[i],
                        },
                    })),
                    barWidth: 16,
                    barGap: '80%',
                },
            ],
        });

        const ro = new ResizeObserver(() => chart.resize());
        ro.observe(chartRef.current);
        return () => { ro.disconnect(); chart.dispose(); };
    }, [breakdown]);

    return <div ref={chartRef} style={{ width: '100%', height: '220px' }} />;
}

/* ══════════════════════════════════════════════════════════════════════════════
 *  Horizontal bar chart — Analyst Price Target
 * ══════════════════════════════════════════════════════════════════════════════ */
function PriceTargetChart({ high, average, low, current }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const chart = echarts.init(chartRef.current, null, { renderer: 'canvas' });

        const maxVal = Math.max(high, current) * 1.15;

        chart.setOption({
            animation: true,
            animationDuration: 600,
            animationEasing: 'cubicOut',
            grid: { left: 62, right: 56, top: 18, bottom: 40 },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'none' },
                backgroundColor: '#fff',
                borderColor: '#E0E0E4',
                borderWidth: 1,
                textStyle: { fontSize: 11, color: '#333' },
                formatter: (params) => {
                    const p = params[0];
                    return `<span style="font-size:10px;color:#9ca3af">${p.name}</span><br/><b>${p.value.toFixed(2)}</b>`;
                },
            },
            xAxis: {
                type: 'value',
                min: 0,
                max: maxVal,
                show: false,
                splitLine: { show: false },
            },
            yAxis: {
                type: 'category',
                data: ['Low', 'Average', 'High'],
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { fontSize: 11, color: '#000', fontWeight: 500 },
                splitLine: { show: false },
            },
            series: [
                {
                    type: 'bar',
                    data: [low, average, high],
                    barWidth: 12,
                    itemStyle: { color: '#8968AB', borderRadius: [4, 4, 4, 4] },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: (p) => p.value.toFixed(2),
                        fontSize: 12,
                        fontWeight: 500,
                        color: '#7F7F7F',
                    },
                    markLine: {
                        silent: true,
                        symbol: ['none', 'triangle'],
                        symbolSize: [10, 8],
                        symbolRotate: 180,
                        lineStyle: { color: '#724A9A', type: 'dashed', width: 1.5 },
                        data: [{ xAxis: current }],
                        label: { show: false },
                    },
                },
            ],
            graphic: [
                {
                    type: 'group',
                    left: '45%',
                    bottom: 6,
                    children: [
                        {
                            type: 'rect',
                            z: 100,
                            left: 'center',
                            top: 0,
                            shape: { width: 110, height: 26, r: 6 },
                            style: { fill: '#fff', stroke: '#ddd', lineWidth: 1, shadowBlur: 4, shadowColor: 'rgba(0,0,0,0.06)' },
                        },
                        {
                            type: 'text',
                            z: 101,
                            left: 'center',
                            top: 6,
                            style: { text: `Current  ${current.toFixed(2)}`, fill: '#333', fontSize: 12, fontWeight: 600 },
                        },
                    ],
                },
            ],
        });

        const ro = new ResizeObserver(() => chart.resize());
        ro.observe(chartRef.current);
        return () => { ro.disconnect(); chart.dispose(); };
    }, [high, average, low, current]);

    return <div ref={chartRef} style={{ width: '100%', height: '180px' }} />;
}

/* ══════════════════════════════════════════════════════════════════════════════
 *  Main Analysis Component
 * ══════════════════════════════════════════════════════════════════════════════ */
const Analysis = () => {
    const [activeTab, setActiveTab] = useState('Analysts');
    const { rating, priceTarget } = ANALYST_DATA;

    return (
        <div className="flex flex-col h-full overflow-hidden bg-transparent"> 

            <SlidingTabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} />

            {/* ── Analysts Tab ── */}
            {activeTab === 'Analysts' && (
                <div className="flex justify-between min-h-0 w-full overflow-auto p-3 gap-2">

                    {/* ── Left card: Analyst Rating ── */}
                    <div className='w-1/2'>

                        {/* Header */}
                        <div className="px-4 pt-3 pb-1 bg-[#EDE8F2] rounded mb-4">
                            <div className="text-black text-sm font-normal leading-normal">Analyst Rating</div>
                            <div className="text-[#7F7F7F] text-xxs font-normal">Update on {rating.updatedAt}</div>
                        </div>

                        {/* BUY badge — gradient */}
                        <div className="flex flex-col items-start pt-2.5 pb-1 px-4 max-w-[158px]">
                            <div className='py-2.5 text-sm font-semibold px-5 w-full text-right text-white' style={{ background: 'linear-gradient(90deg, #FFF 0%, #37E790 35.4%)' }}>
                                {rating.overallRating}
                            </div>
                            <div className="text-xxs text-black font-normal mt-0.5 text-right ml-auto tracking-wide">
                                Based on {rating.basedOnCount} analysts
                            </div>
                        </div>

                        {/* Vertical bar chart */}
                        <div className="flex-1 min-h-0 px-2">
                            <RatingBarChart breakdown={rating.breakdown} />
                        </div>

                        {/* X-axis text labels */}
                        <div className="flex px-6 pb-3 -mt-2">
                            {rating.breakdown.map((d) => {
                                const parts = d.label.split(/[\s]+|(?<=-)/).filter(Boolean);
                                return (
                                    <div key={d.label} className="flex-1 text-center text-xxs font-medium text-black leading-tight">
                                        {parts.length > 2 ? (
                                            parts.map((w, i) => (
                                                <span key={i} className="block">{w}</span>
                                            ))
                                        ) : (
                                            d.label
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Vertical Divider ── */}
                    <div className="w-px bg-[#EDE8F2]"></div>  

                    {/* ── Right card: Analyst Price Target ── */}
                    <div className='w-1/2'>

                        {/* Header */}
                        <div className="px-4 pt-3 pb-1 bg-[#EDE8F2] rounded mb-4">
                            <div className="text-black text-sm font-normal leading-normal">Analyst Price Target</div>
                            <div className="text-[#7F7F7F] text-xxs font-normal">Updated on {priceTarget.updatedAt}</div>
                        </div>

                        {/* Horizontal bar chart with current marker */}
                        <div className="flex-1 flex items-center px-2">
                            <div className="w-full">
                                <PriceTargetChart
                                    high={priceTarget.high}
                                    average={priceTarget.average}
                                    low={priceTarget.low}
                                    current={priceTarget.current}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* ── Quant Rating Tab — placeholder ── */}
            {activeTab === 'Quant Rating' && (
                <div className="flex-1 flex items-center justify-center text-gray-300 text-xs">
                    Quant Rating — coming soon
                </div>
            )}

            {/* ── Disclaimer ── */}
            <div className="shrink-0 px-4 py-2.5">
                <p className="text-[#7F7F7F] text-xs font-normal leading-normal">
                    Date disclaimer: Rating and price Target Provided by S&P Global are for informational purposed only and should not be
                    considered as an investment advice.
                </p>
            </div>
        </div>
    );
};

export default Analysis;
