import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Users, ShoppingBag, TrendingUp,
  Settings, CheckCircle, XCircle, Clock,
  Search, Bell, Menu, X,
  PlayCircle, Activity, ArrowUpRight,
  Star, Flame, ChevronRight, Heart
} from 'lucide-react';
import axios from 'axios';
import Logo from '../../components/Logo';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pendingPartners, setPendingPartners] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    foodPartners: 0,
    activeReels: 0,
    pendingReqs: 0
  });

  useEffect(() => {
    fetchDashboardData();
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [pendingRes, statsRes] = await Promise.all([
        axios.get("http://localhost:3000/api/food-partner/admin/pending", { withCredentials: true }),
        axios.get("http://localhost:3000/api/admin/stats", { withCredentials: true })
      ]);

      setPendingPartners(pendingRes.data.pendingPartners || []);
      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/admin/login");
        return;
      }
      // Demo fallback
      setStats(prev => ({
        ...prev,
        totalUsers: 1458,
        foodPartners: 92,
        activeReels: 412,
        pendingReqs: 5
      }));
    }
  };

  const handleApprove = async (id, status) => {
    const actionText = status === 'approved' ? 'Approve' : 'Reject';
    if (!window.confirm(`Are you sure you want to ${actionText} this partner?`)) return;

    try {
      await axios.put(`http://localhost:3000/api/food-partner/admin/approve/${id}`, { status }, { withCredentials: true });
      fetchDashboardData();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get("http://localhost:3000/api/auth/admin/logout", { withCredentials: true });
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#4A3728] flex font-['Poppins'] relative overflow-hidden">
      {/* --- Desert Sunset Decorative Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FDE68A]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-[#FDBA74]/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Organic Shapes Background */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#FEF3C7]/40 rounded-full blur-[120px] pointer-events-none opacity-50" />

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#4A3728]/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Warm Theme */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#FFFFFF] border-r border-[#F3E8D9] transform transition-all duration-500 ease-in-out shadow-[10px_0_40px_rgba(74,55,40,0.02)] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center justify-center transition-transform hover:scale-105">
              <Logo className="w-10 h-10 drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none text-[#4A3728]">CraveScroll</h1>
              <span className="text-[9px] text-[#D97706] font-bold uppercase tracking-[2px]">Management</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <SidebarLink icon={<Activity size={18} />} label="Overview" active />
            <SidebarLink icon={<Users size={18} />} label="Users" />
            <SidebarLink icon={<ShoppingBag size={18} />} label="Partners" />
            <SidebarLink icon={<PlayCircle size={18} />} label="Reels" />
            <SidebarLink icon={<Settings size={18} />} label="Settings" />
          </nav>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="group mt-auto w-full relative h-[56px] flex items-center justify-center 
              bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] 
              border border-[#F3E8D9] rounded-2xl 
              text-[#A8A29E] hover:text-[#D97706]
              transition-all duration-300 ease-out overflow-hidden
              hover:border-[#D97706]/30 hover:shadow-lg hover:shadow-[#D97706]/5"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D97706]/5 to-transparent -translate-x-full group-hover:transition-transform group-hover:duration-1000 group-hover:translate-x-full" />

            <div className="relative flex items-center gap-3">
              <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
              <span className="font-black text-[10px] uppercase tracking-[2px]">
                {loading ? 'Processing...' : 'Logout Admin'}
              </span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2.5 bg-white border border-[#F3E8D9] rounded-xl text-[#4A3728] shadow-sm hover:bg-[#FAF7F2]"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden sm:block">
              <h2 className="text-xl font-bold text-[#4A3728]">Welcome Back, Admin</h2>
              <p className="text-[10px] text-[#A8A29E] font-medium tracking-wide">Here's your platform summary</p>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E] w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                className="bg-white border border-[#F3E8D9] rounded-2xl py-2.5 pl-10 pr-6 text-sm focus:outline-none focus:border-[#D97706]/40 w-60 lg:w-72 transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-white border border-[#F3E8D9] rounded-xl text-[#A8A29E] hover:text-[#D97706] transition-all shadow-sm relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#D97706] rounded-full border-2 border-white" />
              </button>
              <div className="h-8 w-[1px] bg-[#F3E8D9] hidden sm:block" />
              <div className="flex items-center gap-3 bg-white border border-[#F3E8D9] p-1.5 pr-4 rounded-2xl hover:bg-[#FAF7F2] transition-all cursor-pointer shadow-sm group">
                <img src="https://ui-avatars.com/api/?name=Admin&background=d97706&color=fff" className="w-8 h-8 rounded-lg" alt="Admin" />
                <span className="text-[10px] font-bold text-[#4A3728] hidden lg:block">ISHA SINGH</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 custom-scrollbar">
          {/* Hero Banner - Warm Sunset */}
          <div className="mb-8 p-10 rounded-[32px] bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border border-[#F3E8D9] relative overflow-hidden group shadow-sm">
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000')] bg-cover bg-center opacity-[0.05] lg:opacity-10 group-hover:opacity-15 transition-opacity" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D97706]/10 text-[#D97706] rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                <Flame size={12} /> Spotlight
              </div>
              <h3 className="text-3xl lg:text-5xl font-black mb-3 tracking-tight text-[#4A3728]">
                Healthy growth <span className="text-[#D97706]">today!</span>
              </h3>
              <p className="text-[#78716C] max-w-md leading-relaxed font-medium text-sm lg:text-base">
                Your community is thriving. Keep reviewing partners to maintain quality content.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Users size={20} />}
              label="Total Residents"
              value={stats.totalUsers}
              trend="+128"
              color="#D97706"
            />
            <StatCard
              icon={<ShoppingBag size={20} />}
              label="Food Partners"
              value={stats.foodPartners}
              trend="+4"
              color="#A16207"
            />
            <StatCard
              icon={<PlayCircle size={20} />}
              label="Reels Served"
              value={stats.activeReels}
              trend="+24"
              color="#B45309"
            />
            <StatCard
              icon={<Bell size={20} />}
              label="Queue Status"
              value={stats.pendingReqs}
              isUrgent={stats.pendingReqs > 0}
              trend="Priority"
              color="#92400E"
            />
          </div>

          {/* Verification Table */}
          <div className="bg-[#FFFFFF] border border-[#F3E8D9] rounded-[32px] shadow-sm overflow-hidden">
            <div className="p-8 border-b border-[#F3E8D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#D97706] rounded-full" />
                  Partner Applications
                </h4>
                <p className="text-xs text-[#A8A29E] mt-1 font-medium">Verification requests needing attention</p>
              </div>
              <div className="px-5 py-2.5 bg-[#FFFBEB] text-[#D97706] rounded-2xl font-black text-xl border border-[#FEF3C7]">
                {pendingPartners.length}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#FAF7F2] text-[#A8A29E] text-[10px] uppercase tracking-[2px] font-extrabold">
                    <th className="px-8 py-5">Partner Profile</th>
                    <th className="px-8 py-5">Legal Name</th>
                    <th className="px-8 py-5">Requested</th>
                    <th className="px-8 py-5 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3E8D9]">
                  {pendingPartners.length > 0 ? (
                    pendingPartners.map((partner) => (
                      <tr key={partner._id} className="hover:bg-[#FAF7F2]/50 transition-all group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#D97706] font-black text-lg border border-[#FDE68A]">
                              {partner.businessName[0]}
                            </div>
                            <div>
                              <div className="font-bold text-[#4A3728] text-base group-hover:text-[#D97706] transition-colors">{partner.businessName}</div>
                              <div className="text-[11px] text-[#A8A29E] font-medium">{partner.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-[#4A3728] font-semibold text-sm">{partner.contactName}</div>
                          <div className="text-[9px] text-[#D97706] font-bold uppercase mt-0.5 tracking-wider">Entrepreneur</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#78716C]">
                            <Clock size={14} className="text-[#D97706]" />
                            {partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : 'Awaiting'}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-end gap-2 text-right">
                            <button
                              onClick={() => handleApprove(partner._id, 'approved')}
                              className="px-5 py-2.5 rounded-xl bg-[#D97706] text-white hover:bg-[#B45309] transition-all font-bold text-[10px] uppercase tracking-widest shadow-md shadow-[#D97706]/10"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => handleApprove(partner._id, 'rejected')}
                              className="p-2.5 rounded-xl border border-[#F3E8D9] text-[#A8A29E] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-all"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-10 py-24 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center justify-center">
                            <Logo className="w-16 h-16 opacity-30 grayscale" />
                          </div>
                          <p className="text-xs font-bold text-[#D6D3D1] uppercase tracking-[3px]">All Caught Up!</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// UI Components
const SidebarLink = ({ icon, label, active = false }) => (
  <button className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all relative group ${active
    ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] shadow-sm'
    : 'text-[#A8A29E] hover:text-[#4A3728] hover:bg-[#FAF7F2]'
    }`}>
    <span className={`${active ? 'text-[#D97706]' : 'group-hover:scale-110 transition-all'}`}>{icon}</span>
    <span className="font-bold text-sm tracking-tight">{label}</span>
    {active && <div className="ml-auto w-1 h-3 bg-[#D97706] rounded-full" />}
  </button>
);

const StatCard = ({ icon, label, value, trend, color, isUrgent = false }) => (
  <div className="bg-white p-6 rounded-[28px] border border-[#F3E8D9] hover:border-[#D97706]/20 transition-all cursor-pointer shadow-sm group relative overflow-hidden">
    <div className="flex items-center justify-between mb-6">
      <div className="w-12 h-12 bg-[#FAF7F2] rounded-2xl flex items-center justify-center text-[#D97706] border border-[#F3E8D9] group-hover:scale-110 transition-transform shadow-sm">
        {icon}
      </div>
      <div className={`text-[10px] font-black px-3 py-1 rounded-full border tracking-widest ${isUrgent
        ? 'bg-[#EF4444] text-white border-[#EF4444] animate-pulse'
        : 'bg-[#FAF7F2] text-[#A8A29E] border-[#F3E8D9]'
        }`}>
        {trend}
      </div>
    </div>
    <div className="relative z-10">
      <div className="text-4xl font-extrabold mb-1 tracking-tighter text-[#4A3728] group-hover:text-[#D97706] transition-colors leading-none italic">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-[9px] text-[#A8A29E] font-extrabold uppercase tracking-[2px] ml-0.5">{label}</div>
    </div>
  </div>
);

export default AdminDashboard;
