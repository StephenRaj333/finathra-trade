import { MenuIcon } from '../../utils/SvgCode';

const TabBar = ({ tabs, active, onSelect, menuIcon = true }) => (
  <div className="flex items-center border-b border-gray-200 bg-[#f7f7f7] shrink-0">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onSelect(tab)}
        className={`px-4 py-2 text-xs lg:text-sm font-medium border-r border-[#C8B9D8] rounded-tr-lg transition-all whitespace-nowrap ${active === tab ? 'bg-white text-black' : 'text-gray-600 border-b-transparent hover:text-gray-900'
          }`}
      >
        {tab}
      </button>
    ))}
    {menuIcon && (
      <div className="ml-auto pr-3 text-gray-400 cursor-pointer hover:text-gray-600">
        <MenuIcon />
      </div>
    )}
  </div>
);

export default TabBar;
