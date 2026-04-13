import { useRef, useState, useEffect } from 'react';

const SlidingTabBar = ({ tabs, active, onSelect }) => {
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const containerRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    const activeButton = buttonRefs.current[active];
    if (activeButton) {
      setIndicatorWidth(activeButton.offsetWidth);
      setIndicatorLeft(activeButton.offsetLeft);
    }
  }, [active]);

  return (
    <div className="relative border-b border-gray-100 bg-white" ref={containerRef}> 
      {/* Sliding indicator behind tabs */}
      <div
        className="absolute bottom-0 h-px bg-[#724A9A] transition-all duration-300 ease-out"
        style={{
          width: `${indicatorWidth}px`,
          left: `${indicatorLeft}px`
        }}
      />
      
      {/* Tabs container */}
      <div className="flex relative z-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            ref={(el) => (buttonRefs.current[tab] = el)}
            onClick={() => onSelect(tab)}
            className={`px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
              active === tab ? 'text-[#724A9A]' : 'text-[#7F7F7F]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlidingTabBar;
