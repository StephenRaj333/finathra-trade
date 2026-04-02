import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import logo from "../assets/logo.png";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#AA278F] via-[#1D1E19] to-[#5B1BA3]" style={{ height: '52px' }}>
      <div className="flex h-full items-center px-5 gap-4">

        {/* Left – Logo */}
        <div className="flex-none">
          <img className="h-7 w-auto" src={logo} alt="Finartha logo" /> 
        </div>

        {/* Center – Search */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 bg-[#2a0a38]/70 rounded-md px-3 py-1.5 w-full max-w-xs border border-white/10 max-w-[400px]">
            <Search size={14} className="text-gray-400 flex-none" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white text-sm placeholder:text-gray-400 outline-none w-full"
            />
          </div>
        </div>

        {/* Right – Controls + User */}
        <div className="flex items-center text-white text-xs gap-3">
          {/* Separator */}
          <span className="h-5 w-px bg-white mx-3 block" />

          {/* Open */}
          <button className="flex items-center gap-1 hover:text-white/80 transition-colors whitespace-nowrap">
            <span className="text-white/70">Open:</span>
            <span className="tracking-widest font-medium">***</span>
            <ChevronDown size={12} className="text-white/60" />
          </button>

          {/* Separator */}
          <span className="h-5 w-px bg-white mx-3 block" />

          {/* Working */}
          <button className="flex items-center gap-1 hover:text-white/80 transition-colors whitespace-nowrap">
            <span className="text-white/70">Working</span>
            <span className="tracking-widest font-medium">***</span>
            <ChevronDown size={12} className="text-white/60" />
          </button>

          {/* Separator */}
          <span className="h-5 w-px bg-white mx-3 block" />

          {/* TAV */}
          <button className="flex items-center gap-1 hover:text-white/80 transition-colors whitespace-nowrap">
            <span className="text-white/70">TAV</span>
            <span className="tracking-widest font-medium">***</span>
            <ChevronDown size={12} className="text-white/60" />
          </button>

          {/* Separator */}
          <span className="h-5 w-px bg-white mx-3 block" />

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-none">
                <img src="/user.png" alt="user info" /> 
              </div>

              {/* Name + Badge */}
              <div className="flex flex-col items-start leading-tight">
                <div className='flex flex-col items-start leading-tight'>
                  <span className="text-white font-semibold text-xs">Ahmed K.</span>
                  <span className="text-purple-300 text-[10px] font-medium">Premium • AEB</span>
                </div>
              </div>
              <div className="img-wrapper"> 
                  <ChevronDown size={16} />
                </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 transition-colors text-sm">
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 transition-colors text-sm">
                  Subscription
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50 transition-colors text-sm">
                  Help
                </button>
                <hr className="my-2" />
                <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors text-sm">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
