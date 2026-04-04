import { useState, useEffect, useRef, useCallback } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'; 

// Real geographic coordinates [longitude, latitude]
const MARKERS = [
  { id: 'nasdaq',   label: 'NASDAQ',    value: '+0.1%',  positive: true,  color: '#17B667', size: 140, coords: [-100, -37] },
  { id: 'sp500',    label: 'S&P 500',   value: '-0.8%',  positive: false, color: '#17B667', size: 140, coords: [-90,  42] },
  { id: 'dax',      label: 'DAX',       value: '+0.62%', positive: true,  color: '#FF6977', size: 140, coords: [8.6821,    50.1109] },
  { id: 'shanghai', label: 'Shanghai',  value: '-0.1%',  positive: false, color: '#DA6AAB', size: 140, coords: [121.4737,  31.2304] },
];

const WIDTH = 900; 
const HEIGHT = 500;

export default function GlobalMap() {
  const [activeTab, setActiveTab] = useState('Index');
  const [geoPaths, setGeoPaths] = useState([]);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef(null);
  const svgRef = useRef(null);

  const projection = geoMercator()
    .scale(140)
    .center([20, 20])
    .translate([WIDTH / 2, HEIGHT / 2]);

  const pathGenerator = geoPath().projection(projection);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topology) => {
        const countries = feature(topology, topology.objects.countries);
        setGeoPaths(countries.features.map((f) => ({ id: f.id, d: pathGenerator(f) })));
        setMarkerPositions(
          MARKERS.map((m) => {
            const [px, py] = projection(m.coords);
            return { ...m, px, py };
          })
        );
      });
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    setTransform((prev) => {
      const newK = Math.max(0.8, Math.min(8, prev.k * delta));
      const rect = svgRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const scale = newK / prev.k;
      return { k: newK, x: mx - scale * (mx - prev.x), y: my - scale * (my - prev.y) };
    });
  }, []);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const handleMouseDown = (e) => {
    setIsPanning(true);
    panStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
  };
  const handleMouseMove = (e) => {
    if (!isPanning || !panStart.current) return;
    setTransform((prev) => ({ ...prev, x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y }));
  };
  const handleMouseUp = () => setIsPanning(false);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f7f7f7]">
      {/* ── Header ── */} 
      <div className="flex items-center justify-between px-4 pl-0 border-b border-gray-200 bg-[#f7f7f7] shrink-0">
        <h2 className="px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap bg-white text-black">Global</h2>
        <button className="text-gray-500 hover:text-gray-700"> 
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /> 
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Tab Bar ── */}
      <div className="flex items-center bg-white shrink-0 px-4 py-2 gap-3"> 
        <div className="border border-[#EDE8F2] rounded-sm bg-white">   
        {['Index', 'Forex'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}  
            className={`px-3 py-1 text-xs font-normal tracking-wide transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-[#EDE8F2] text-[#4F1D81]' : 'text-black'
            }`} 
          >
            {tab}
          </button>
        ))}
        </div>
        {activeTab === 'Index' && (
          <div className="ml-auto flex items-center gap-2 select-none">
            <button onClick={() => setTransform((p) => ({ ...p, k: Math.min(p.k * 1.4, 8) }))}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm">+</button>
            <button onClick={() => setTransform((p) => ({ ...p, k: Math.max(p.k / 1.4, 0.8) }))}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm">−</button>
            <button onClick={() => setTransform({ x: 0, y: 0, k: 1 })}
              className="px-2 h-6 text-[10px] rounded bg-gray-100 hover:bg-gray-200 text-gray-500">Reset</button>
          </div>
        )}
      </div>

      {/* ── Map ── */}
      {activeTab === 'Index' ? (
        <div className="flex-1 relative overflow-hidden bg-[#f5f1e8]"
          style={{ cursor: isPanning ? 'grabbing' : 'grab' }}>

          {tooltip && (
            <div className="absolute z-20 pointer-events-none bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg"
              style={{ left: tooltip.x + 14, top: tooltip.y - 40 }}>
              <div className="font-bold">{tooltip.label}</div>  
              <div className={tooltip.positive ? 'text-green-400' : 'text-red-400'}>{tooltip.value}</div>
            </div>
          )}

          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
              <rect x={-2000} y={-2000} width={6000} height={6000} fill="#fff" />
              {geoPaths.map(({ id, d }, idx) => (
                <path key={idx} d={d} fill="#ddcebf7a" stroke="#ddcebf7a" strokeWidth={0.5 / transform.k} />
              ))} 
              {markerPositions.map((m) => {
                const r = m.size / 2;
                const s = transform.k;
                return (
                  <g key={m.id} transform={`translate(${m.px},${m.py})`} style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                      const rect = svgRef.current.getBoundingClientRect();
                      const pt = svgRef.current.createSVGPoint();
                      pt.x = m.px; pt.y = m.py;
                      const sp = pt.matrixTransform(svgRef.current.getScreenCTM());
                      setTooltip({ x: sp.x - rect.left, y: sp.y - rect.top, label: m.label, value: m.value, positive: m.positive });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <circle r={(r + 6) / s} fill={m.color} opacity={0.22} />
                    <circle r={r / s} fill={m.color} style={{ filter: `drop-shadow(0 3px 8px ${m.color}aa)` }} />
                    <text className='tracking-wide text-xs text-white' textAnchor="middle" y={-3 / s}
                      style={{ fontSize: Math.max(3, (r * 0.36) / s), fontWeight: 400, fill: '#fff', pointerEvents: 'none', userSelect: 'none' }}>
                      {m.label}
                    </text>
                    <text textAnchor="middle" y={(r * 0.45) / s}
                      style={{ fontSize: Math.max(2.5, (r * 0.32) / s), fontWeight: 400, fill: 'rgba(255,255,255,0.95)', pointerEvents: 'none', userSelect: 'none' }}>
                      {m.value}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-2">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Forex Data Coming Soon</p>
            <p className="text-gray-400 text-xs mt-1">Check back for currency pair analysis</p>
          </div>
        </div>
      )}
    </div> 
  );
}

