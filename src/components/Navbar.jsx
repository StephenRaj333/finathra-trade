import { Link, useLocation } from 'react-router-dom';
import { ChartCandlestick , Globe, ArrowDownUp , Percent , Settings, CircleUser, Headset } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const mainLinks = [
    { path: '/stocks', label: 'Stocks', icon: (color) => <ChartCandlestick color={color} /> },
    { path: '/markets', label: 'Markets', icon: (color) => <Globe color={color} /> },
    { path: '/portfolio', label: 'Trade', icon: (color) => <ArrowDownUp color={color} /> },
    { path: '/porfolio', label: 'Portfolio', icon: (color) => <Percent color={color} /> },
    { path: '/account', label: 'Account', icon: (color) => <CircleUser color={color} /> },
  ];
  
  const isActive = (path) => location.pathname === path;

  return ( 
    <nav className="fixed left-0 top-0 h-screen pt-20 w-full max-w-20 bg-[#EDE8F2] flex flex-col items-center py-2">
      {/* Main Navigation */}
      <div className="flex-1 flex flex-col gap-0 w-full"> 
        {mainLinks?.map(({ path, label, icon }) => ( 
          <Link
            key={path}
            to={path}
            className={`w-full h-20 flex flex-col items-center justify-center transition-all duration-300 group ${
              isActive(path) 
                ? 'bg-[#38155C]' 
                : ''
            }`}
            title={label}
          >
            <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
              {icon(isActive(path) ? 'white' : '#38155C')}
            </span> 
            <span className={`text-xs font-semibold text-center leading-tight ${
              isActive(path) ? 'text-white' : 'text-[#38155C]'
            }`}>
              {label}
            </span>
          </Link>
        ))}
      </div>  

      {/* Bottom Icons - Contact and Settings */}
      <div className="mt-auto mb-2 w-full flex flex-col gap-2">
        <Link
          to="/contact"
          className={`w-full h-20 flex flex-col items-center justify-center transition-all duration-300 group ${
            isActive('/contact')
              ? 'bg-[#38155C]'
              : ''
          }`}
          title="Contact"
        >
          <Headset color={isActive('/contact') ? 'white' : '#38155C'} />
          <span className={`text-xs font-semibold ${
            isActive('/contact') ? 'text-white' : 'text-[#38155C]'
          }`}>Contact</span>
        </Link>

        <Link
          to="/settings"
          className={`w-full h-20 flex flex-col items-center justify-center transition-all duration-300 group ${
            isActive('/settings')
              ? 'bg-[#38155C]'
              : ''
          }`}
          title="Settings"
        >
          <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
            <Settings color={isActive('/settings') ? 'white' : '#38155C'} />
          </span>
          <span className={`text-xs font-semibold ${
            isActive('/settings') ? 'text-white' : 'text-[#38155C]'
          }`}>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
