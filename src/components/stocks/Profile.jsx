
import { useState } from 'react';
import SlidingTabBar from '../common/SlidingTabBar';
import { PROFILE_DATA, KEY_EXECUTIVES_DATA } from '../../utils/placeholder-data';

const TABS = ['Profile', 'Key Executives'];

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Profile');

    return (
        <div className="flex flex-col h-full overflow-hidden bg-transparent">
            {/* ── Tab Bar ── */}
            <SlidingTabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} />

            {/* ── Profile Tab ── */}
            {activeTab === 'Profile' && (
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    <div className="space-y-3">
                        {/* ── Name Section ── */}
                        <div>
                            <h3 className="text-xs font-bold text-[#616161] tracking-wide mb-2">Name</h3>
                            <div className="text-sm text-[#616161] leading-relaxed">
                                <p className="font-semibold">{PROFILE_DATA.name}</p>
                                <p className="text-xs text-[#666] mt-1">{PROFILE_DATA.address}</p>
                                <p className="text-xs text-[#666] mt-0.5">{PROFILE_DATA.phone}</p>
                            </div>
                        </div>
            
                        {/* ── Industry Section ── */}
                        <div>
                            <h3 className="text-xs font-bold text-[#616161] tracking-wide mb-2">Industry</h3>
                            <p className="text-sm text-[#666]">{PROFILE_DATA.industry}</p> 
                        </div>

                        {/* ── Listing Date Section ── */}
                        <div>
                            <h3 className="text-xs font-bold text-[#616161] tracking-wide mb-2">Listing Date</h3>
                            <p className="text-sm text-[#666]">{PROFILE_DATA.listingDate}</p>
                        </div>

                        {/* ── Website Section ── */}
                        <div>
                            <h3 className="text-xs font-bold text-[#616161] tracking-wide mb-2">Website</h3>
                            <a
                                href={PROFILE_DATA.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#2563EB]" 
                            >   
                                {PROFILE_DATA.website}
                            </a>
                        </div>

                        {/* ── Summary Section ── */}
                        <div>
                            <h3 className="text-xs font-bold text-[#616161] tracking-wide mb-2">Summary</h3>
                            <p className="text-sm text-[#616161] leading-relaxed">{PROFILE_DATA.summary}</p>
                        </div> 
                    </div>
                </div>
            )}

            {/* ── Key Executives Tab ── */}
            {activeTab === 'Key Executives' && (
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    <div className="space-y-3">
                        {KEY_EXECUTIVES_DATA.map((exec) => (
                            <div
                                key={exec.id}
                                className="flex items-center gap-3 px-4 py-3 bg-[#F5F5F5] rounded"
                            >
                                {/* ── Avatar ── */}
                                <img
                                    src={exec.imageUrl}
                                    alt={exec.name}
                                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 bg-gray-300"
                                />

                                {/* ── Info ── */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#616161] leading-tight">{exec.name}</p>
                                    <p className="text-xs text-[#666] mt-0.5 truncate">{exec.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;  