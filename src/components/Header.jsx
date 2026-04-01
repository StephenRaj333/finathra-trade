import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import logo from "../assets/logo.png";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-20 z-40 bg-gradient-to-r from-[#AA278F] via-[#1D1E19] to-[#5B1BA3]">
      <div className="flex h-full items-center justify-between px-6"> 
        {/* Left Section - Logo */}
        <div className="text-white font-bold text-2xl">
          <img className='w-full max-w-[100px]' src={logo} alt="finartha logo" />
        </div>

        {/* Right Section - User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-opacity-30 rounded-lg px-4 py-2 transition-all duration-300"
          >
            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AK</span>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-start">
              <span className="text-white font-semibold text-sm">Ahmed K.</span>
              <span className="text-white text-xs opacity-90">Premium - AED</span>
            </div>

            {/* Dropdown Arrow */}
            <ChevronDown 
              size={20} 
              color="white" 
              className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 transition-colors">
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 transition-colors">
                Subscription
              </button>
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 transition-colors">
                Help
              </button>
              <hr className="my-2" />
              <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 