import { useRef, useEffect } from 'react';
import {Recycle} from 'lucide-react';
import { createChart, CandlestickSeries } from 'lightweight-charts';

// Generate random OHLC candle data
const generateCandleData = () => {
    const data = [];
    const baseTime = new Date('2026-03-30T09:30:00');
    let close = 4510.95;
    for (let i = 0; i < 50; i++) {
        const time = new Date(baseTime.getTime() + i * 30 * 60 * 1000);
        const open = close + (Math.random() - 0.48) * 15;
        const high = Math.max(open, close) + Math.random() * 10;
        const low = Math.min(open, close) - Math.random() * 10;
        close = open + (Math.random() - 0.45) * 20;
        data.push({
            time: Math.floor(time.getTime() / 1000),
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2)),
        });
    }
    return data;
};

// Cache to avoid regenerating data on re-render
const candleCache = new Map();
const getCandleData = (key) => {
    if (!candleCache.has(key)) candleCache.set(key, generateCandleData());
    return candleCache.get(key);
};

export const CandlePopup = ({ row, position, visible, onMouseEnter, onMouseLeave }) => {
    const containerRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !visible) return;
        const el = containerRef.current.querySelector('.lw-chart');
        if (!el) return;

        const chart = createChart(el, {
            width: 460,
            height: 260,
            layout: { background: { color: '#ffffff' }, textColor: '#333' },
            grid: {
                vertLines: { color: '#f0f0f0' },
                horzLines: { color: '#f0f0f0' },
            },
            rightPriceScale: { borderColor: '#e0e0e0' },
            timeScale: { borderColor: '#e0e0e0', timeVisible: true, secondsVisible: false },
            crosshair: { mode: 0 },
        });
        chartRef.current = chart;

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#17B667',
            downColor: '#ef4444',
            borderDownColor: '#ef4444',
            borderUpColor: '#17B667',
            wickDownColor: '#ef4444',
            wickUpColor: '#17B667',
        });

        const candleData = getCandleData(row.symbol);
        candleSeries.setData(candleData);
        chart.timeScale().fitContent();

        return () => { chart.remove(); chartRef.current = null; };
    }, [visible, row.symbol]);

    const candleData = getCandleData(row.symbol);
    const last = candleData[candleData.length - 1];
    const first = candleData[0];
    const priceChange = (last.close - first.open).toFixed(2);
    const pctChange = ((priceChange / first.open) * 100).toFixed(2);
    const changePositive = parseFloat(priceChange) >= 0;
    const changeColorCls = changePositive ? 'text-[#17B667]' : 'text-red-500';

    return (
        <div className="candle-popup-wrapper"> 
            <div
                ref={containerRef}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave} 
                className={`fixed z-[9999] p-2.5 bg-white rounded-xl overflow-hidden transition-all duration-200 origin-bottom ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                style={{
                    top: position.top,
                    left: position.left,
                    width: 520,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
                }}
            >
                {/* Header */}
                <div className="px-5 p-2"> 
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] font-bold text-gray-900 tracking-wide">{row.symbol}</span>
                                <span className="text-[11px] text-gray-400 font-normal">{row.name} (NASDAQ)</span>
                            </div>
                            <div className="flex items-baseline gap-3 mt-1.5">
                                <span className={`text-2xl font-bold ${changeColorCls}`}>
                                    {last.close.toFixed(2)}
                                </span>
                                <span className={`text-xs font-medium ${changeColorCls}`}>
                                    {changePositive ? '+' : ''}{priceChange}
                                </span>
                                <span className={`text-xs font-medium ${changeColorCls}`}>
                                    {changePositive ? '+' : ''}{pctChange}%
                                </span>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5">
                                Pre: 0.1347 &nbsp;−0.2578 &nbsp;−65.68%
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-[11px] mt-0.5">
                            <div className="text-gray-400">Open <span className="text-[#17B667] font-medium ml-1">{first.open.toFixed(2)}</span></div>
                            <div className="text-gray-400">High <span className="text-[#17B667] font-medium ml-1">{last.high.toFixed(2)}</span></div>
                            <div className="text-gray-400">Low <span className="text-[#17B667] font-medium ml-1">{last.low.toFixed(2)}</span></div>
                            <div className="text-gray-400">Volume <span className="text-gray-700 font-medium ml-1">{row.volume}</span></div>
                            <div className="text-gray-400">Prev Close <span className="text-gray-700 font-medium ml-1">{first.open.toFixed(2)}</span></div>
                            <div className="text-gray-400">Market Cap <span className="text-gray-700 font-medium ml-1">{row.marketCap}</span></div>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="p-2 border border-[#AE97C5] rounded-lg mb-2">
                    <div className="lw-chart rounded-lg overflow-hidden" />  
                </div>

                {/* Footer toolbar */} 
                <div className="flex items-center gap-1 px-2.5 rounded py-2.5 text-[10px] text-[#616161] border-t border-gray-100 bg-[#EDE8F2] flex-wrap">
                    <span className="font-semibold text-black mr-0.5">Range:</span>
                    {['1D', '5D', '1M'].map(r => (
                        <button key={r} className="px-1 py-0.5 rounded hover:bg-gray-200 transition-colors">{r}</button>
                    ))}
                    <span className="text-gray-300 mx-0.5">|</span>
                    <span className="font-semibold text-black mr-0.5">Interval:</span>
                    {['1m', '5m', '15M', '30M', '1H', '4H', 'D', 'W'].map(r => (
                        <button key={r} className="px-1 py-0.5 rounded hover:bg-gray-200 transition-colors">{r}</button>
                    ))}
                    <button className="ml-auto px-1 py-0.5 rounded hover:bg-gray-200 transition-colors flex items-center gap-0.5"><Recycle color={"#616161"} size={14} strokeWidth={1.3} /> Reset Chart</button>
                </div>
            </div>
        </div>  
    );
};
