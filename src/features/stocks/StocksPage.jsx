
import { useState } from 'react';
import { Resizable } from 're-resizable';

import MainTabs from '../../components/stocks/main-tabs';
import OpenAccount from '../../components/stocks/open-account';
import QuotesWatchlist from '../../components/stocks/quotes-watchlist';
import OrdersNOI from '../../components/stocks/orders-noi';
import TimeAnalysis from '../../components/stocks/time-analysis';
import TurboTradeLadder from '../../components/stocks/turbo-trade-ladder'; 

const StocksPage = () => {
  const [leftWidth, setLeftWidth] = useState(52); // percentage
  const [gridLayout, setGridLayout] = useState(1);

  const handleLeftResize = (e, direction, ref) => {
    const containerWidth = ref.parentElement.clientWidth;
    const newWidth = (ref.clientWidth / containerWidth) * 100;
    setLeftWidth(Math.max(20, Math.min(80, newWidth)));
  };

  const rightWidth = 100 - leftWidth;

  return (
    <div className="w-full h-[150vh] bg-white overflow-hidden">
      <div className="flex gap-1 h-full">
        {/* LEFT BLOCK */}
        <Resizable
          size={{
            width: `${leftWidth}%`,
            height: '100%',
          }}
          onResize={handleLeftResize}
          onResizeStop={handleLeftResize}
          minWidth="20%"
          maxWidth="80%"
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          className="bg-gray-50 rounded-lg overflow-hidden pl-1"
        >
          <div className="flex flex-col h-full gap-1">
            <Resizable
                defaultSize={{
                    width: '100%',
                    height: '60%',
                }}
                minHeight="15%"
                maxHeight="85%"
                enable={{
                    top: false,
                    right: false,
                    bottom: true,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                className="border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
                style={{background: 'conic-gradient(from 20deg at 48.04% 45.06%, #FFF 0deg, #FFFDF5 167.88461208343506deg, #FFFDF5 194.79776859283447deg, #FEFFFA 360deg)'}}
            >
              <MainTabs gridLayout={gridLayout} onGridChange={setGridLayout} />
            </Resizable>
            <Resizable
                defaultSize={{
                    width: '100%',
                    height: '39.5%',
                }}
                minHeight="15%"
                maxHeight="85%"
                enable={{
                    top: false,
                    right: false,
                    bottom: false,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                className="border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
                style={{background: 'conic-gradient(from 20deg at 48.04% 45.06%, #FFF 0deg, #FFFDF5 167.88461208343506deg, #FFFDF5 194.79776859283447deg, #FEFFFA 360deg)'}} 
            > 
             <OpenAccount />
            </Resizable> 
          </div>
        </Resizable>

        {/* RIGHT BLOCK */}
        <Resizable
          size={{
            width: `${rightWidth}%`,
            height: '100%',
          }}
          onResizeStop={(e, direction, ref) => {
            const containerWidth = ref.parentElement.clientWidth;
            const newWidth = (ref.clientWidth / containerWidth) * 100;
            setLeftWidth(100 - Math.max(20, Math.min(80, newWidth)));
          }}
          minWidth="20%"
          maxWidth="80%"
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          className="bg-gray-50 rounded-lg overflow-hidden pr-1"
        >
          <div className="flex flex-col h-full gap-1">
            {/* Right Top */}
            <Resizable
              defaultSize={{
                width: '100%',
                height: '32%',   
              }}
              minHeight="15%"
              maxHeight="85%"
              enable={{
                top: false,
                right: false,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              className="border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
              style={{background: "conic-gradient(from 20deg at 48.04% 45.06%, #FFF 0deg, #FFFDF5 167.88461208343506deg, #FFFDF5 194.79776859283447deg, #FEFFFA 360deg)"}} 
            >
              <QuotesWatchlist />
            </Resizable>

            {/* Right Bottom Split */}
            <div className="flex-1 flex gap-1 overflow-hidden">
              {/* Right Bottom Left */}
              <Resizable
                defaultSize={{
                  width: '50%',
                  height: '100%',
                }}
                minWidth="15%"
                maxWidth="85%"
                enable={{
                  top: false,
                  right: false,
                  bottom: false,
                  left: false,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false,
                }}
              >
                <div className="flex flex-col h-full gap-1">
                  {/* Right Bottom Left Top */}
                  <Resizable
                    defaultSize={{
                      width: '100%',
                      height: '50%',
                    }}
                    minHeight="15%"
                    maxHeight="85%"
                    enable={{
                      top: false,
                      right: false,
                      bottom: true,
                      left: false,
                      topRight: false,
                      bottomRight: false,
                      bottomLeft: false,
                      topLeft: false,
                    }}
                    className="border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
                    style={{background: 'conic-gradient(from 20deg at 48.04% 45.06%, #FFF 0deg, #FFFDF5 167.88461208343506deg, #FFFDF5 194.79776859283447deg, #FEFFFA 360deg)'}}
                  >
                    <OrdersNOI />
                  </Resizable>

                  {/* Right Bottom Left Bottom */}
                  <Resizable
                    defaultSize={{
                      width: '100%',
                      height: '49.5%', 
                    }}
                    minHeight="15%"
                    maxHeight="85%"
                    enable={{
                      top: false,
                      right: false,
                      bottom: false,
                      left: false,
                      topRight: false,
                      bottomRight: false,
                      bottomLeft: false,
                      topLeft: false,
                    }}
                    className="border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
                    style={{background: 'conic-gradient(from 20deg at 48.04% 45.06%, #FFF 0deg, #FFFDF5 167.88461208343506deg, #FFFDF5 194.79776859283447deg, #FEFFFA 360deg)'}}
                  >
                    <TimeAnalysis />
                  </Resizable>
                </div>
              </Resizable>

              {/* Right Bottom Right */}
              <Resizable
                defaultSize={{
                  width: '50%',
                  height: '100%',
                }}
                minWidth="15%"
                maxWidth="49.5%"
                enable={{
                  top: false,
                  right: false,
                  bottom: false,
                  left: false,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false,
                }}
                className="border-2 border-gray-200 rounded-lg overflow-auto flex flex-col"
                style={{background: 'conic-gradient(from 20deg at 48.04% 45.06%, #FFF 0deg, #FFFDF5 167.88461208343506deg, #FFFDF5 194.79776859283447deg, #FEFFFA 360deg)'}}
              >
                <TurboTradeLadder /> 
              </Resizable>
            </div>
          </div>
        </Resizable>
      </div>
    </div>
  );
};

export default StocksPage;