
import { useState } from 'react';
import { Resizable } from 're-resizable';
import ChartContainer from '../../components/stocks/chart-container';
import OpenAccount from '../../components/stocks/open-account';
import QuotesWatchlist from '../../components/stocks/quotes-watchlist';
import OrdersNOI from '../../components/stocks/orders-noi';

const StocksPage = () => {
  const [leftWidth, setLeftWidth] = useState(50); // percentage 

  const handleLeftResize = (e, direction, ref, delta) => {
    const containerWidth = ref.parentElement.clientWidth;
    const newWidth = (ref.clientWidth / containerWidth) * 100;
    setLeftWidth(Math.max(20, Math.min(80, newWidth)));
  };

  const rightWidth = 100 - leftWidth;

  return (
    <div className="w-full h-screen bg-white overflow-hidden">
      <div className="flex gap-2 h-full">
        {/* LEFT BLOCK */}
        <Resizable
          size={{
            width: `${leftWidth}%`,
            height: '100%',
          }}
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
          className="bg-gray-50 rounded-lg p-4 overflow-hidden border-2 border-gray-200"
        >
          <div className="flex flex-col h-full gap-4">
            <Resizable
                defaultSize={{
                    width: '100%',
                    height: '75%',
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
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
            >
              <ChartContainer />
            </Resizable>
            <Resizable
                defaultSize={{
                    width: '100%',
                    height: '25%',
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
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
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
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          className="bg-gray-50 rounded-lg p-4 overflow-hidden border-2 border-gray-200"
        >
          <div className="flex flex-col h-full gap-4">
            {/* Right Top */}
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
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
            >
              <QuotesWatchlist />
            </Resizable>

            {/* Right Bottom Split */}
            <div className="flex-1 flex gap-4 overflow-hidden">
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
                  right: true,
                  bottom: false,
                  left: false,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false,
                }}
                className="bg-gray-50 rounded-lg p-4 overflow-hidden border-2 border-gray-200"
              >
                <div className="flex flex-col h-full gap-4">
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
                    className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden flex flex-col"
                  >
                    <OrdersNOI />
                  </Resizable>

                  {/* Right Bottom Left Bottom */}
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
                      bottom: false,
                      left: false,
                      topRight: false,
                      bottomRight: false,
                      bottomLeft: false,
                      topLeft: false,
                    }}
                    className="bg-white border-2 border-gray-200 rounded-lg overflow-auto"
                  >
                    <div className="p-4">
                      <h3 className="font-bold text-gray-700 mb-2">Right Bottom - Left Bottom</h3>
                      <p className="text-gray-600 text-sm">Resizable content area</p>
                    </div>
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
                maxWidth="85%"
                enable={{
                  top: false,
                  right: false,
                  bottom: false,
                  left: true,
                  topRight: false,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: false,
                }}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-auto"
              >
                <div className="p-4">
                  <h3 className="font-bold text-gray-700 mb-2">Right Bottom - Right</h3>
                  <p className="text-gray-600 text-sm">Drag the divider to the left to resize</p>
                </div>
              </Resizable>
            </div>
          </div>
        </Resizable>
      </div>
    </div>
  );
};

export default StocksPage;