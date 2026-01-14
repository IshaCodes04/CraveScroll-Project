import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Users, ShoppingBag, TrendingUp,
  Settings, CheckCircle, XCircle, Clock,
  UtensilsCrossed, Search, Bell, Menu, X,
  PlayCircle, Activity, ArrowUpRight,
  Star, Flame
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pendingPartners, setPendingPartners] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    foodPartners: 0,
    activeReels: 0,
    pendingReqs: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats and pending partners in parallel
      const [pendingRes, statsRes] = await Promise.all([
        axios.get("http://localhost:3000/api/food-partner/admin/pending", { withCredentials: true }),
        axios.get("http://localhost:3000/api/admin/stats", { withCredentials: true })
      ]);

      const pending = pendingRes.data.pendingPartners || [];
      setPendingPartners(pending);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      // Fallback for demo if API fails
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers || 1240,
        foodPartners: prev.foodPartners || 85,
        activeReels: prev.activeReels || 312
      }));
    }
  };

  const handleApprove = async (id, status) => {
    const actionText = status === 'approved' ? 'Approve' : 'Reject';
    if (!window.confirm(`Are you sure you want to ${actionText} this partner?`)) return;

    try {
      await axios.put(`http://localhost:3000/api/food-partner/admin/approve/${id}`, { status }, { withCredentials: true });
      fetchDashboardData(); // Refresh everything
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
    <div className="min-h-screen bg-[#050505] text-white flex font-['Poppins'] relative overflow-hidden">
      {/* --- Premium Background Effects --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none opacity-30" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Floating Decorative Food Image */}
      <div className="absolute top-[15%] right-[5%] w-[300px] h-[300px] pointer-events-none hidden xl:block animate-float opacity-40">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
          alt="Salad Bowl"
          className="w-full h-full object-contain rounded-full shadow-[0_0_50px_rgba(249,115,22,0.2)]"
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a]/80 backdrop-blur-2xl border-r border-white/10 transform transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.4)] rotate-3">
              <UtensilsCrossed className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight leading-none">CRAVE</h1>
              <span className="text-[10px] text-primary font-black uppercase tracking-[3px]">Admin Hub</span>
            </div>
          </div>

          <nav className="flex-1 space-y-3">
            <SidebarLink icon={<Activity size={20} />} label="Overview" active />
            <SidebarLink icon={<Users size={20} />} label="Community" />
            <SidebarLink icon={<ShoppingBag size={20} />} label="Partners" />
            <SidebarLink icon={<PlayCircle size={20} />} label="Reel Feed" />
            <SidebarLink icon={<Settings size={20} />} label="System" />
          </nav>

          <div className="mt-auto pt-8">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all group border border-transparent hover:border-red-400/20"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-sm tracking-wide uppercase">{loading ? '...' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-10">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-3 bg-white/5 rounded-xl text-white/60 hover:text-white"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:block">
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <p className="text-xs text-white/30 font-medium">Monitoring platform statistics in real-time</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
              <input
                type="text"
                placeholder="Search analytics..."
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 w-72 transition-all focus:bg-white/[0.08]"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white relative transition-colors shadow-sm">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-[#050505]" />
              </button>
              <div className="h-10 w-[1px] bg-white/10 mx-2 hidden sm:block" />
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 pr-4 rounded-2xl sm:flex hidden hover:bg-white/[0.08] transition-all cursor-pointer">
                <img src="https://ui-avatars.com/api/?name=Admin&background=f97316&color=fff" className="w-8 h-8 rounded-xl" alt="Admin" />
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">Isha Singh</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard View */}
        <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
          {/* Welcome Banner */}
          <div className="mb-10 p-10 rounded-[40px] bg-gradient-to-br from-primary/30 via-primary/5 to-transparent border border-white/10 relative overflow-hidden group shadow-2xl">
            {/* Subtle Food Image in Banner */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/30">
                  System Status: Optimal
                </div>
                <div className="flex items-center gap-1 text-orange-400 text-xs font-bold">
                  <Flame size={14} className="animate-pulse" />
                  Platform is buzzing!
                </div>
              </div>
              <h3 className="text-5xl font-black mb-3 tracking-tighter leading-none">CraveScroll <span className="text-primary">Live</span></h3>
              <p className="text-white/40 max-w-md leading-relaxed font-medium">Monitoring users, partners, and every delicious reel published on the platform.</p>

              <div className="flex gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                  <span className="text-sm font-bold italic">Top Rated Admin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <PremiumStatCard
              icon={<Users className="text-blue-400" />}
              label="Total Users"
              value={stats.totalUsers}
              trend="+ 24 New"
              color="#3b82f6"
            />
            <PremiumStatCard
              icon={<ShoppingBag className="text-orange-400" />}
              label="Partner Network"
              value={stats.foodPartners}
              trend="+ 2 Today"
              color="#f97316"
            />
            <PremiumStatCard
              icon={<PlayCircle className="text-green-400" />}
              label="Total Reels"
              value={stats.activeReels}
              trend="+ 18 Active"
              color="#22c55e"
            />
            <PremiumStatCard
              icon={<Bell className="text-red-400" />}
              label="Verification Queue"
              value={stats.pendingReqs}
              trend="High Priority"
              color="#ef4444"
              isUrgent={stats.pendingReqs > 0}
            />
          </div>

          {/* Applications Section */}
          <div className="bg-[#121212]/50 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div>
                <h4 className="text-2xl font-black flex items-center gap-4">
                  <div className="w-2 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                  Pending Approval Queue
                </h4>
                <p className="text-sm text-white/30 mt-1 ml-6">Carefully review each food partner before authorizing access</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-3xl font-black text-primary">{pendingPartners.length}</span>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Active Requests</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] text-white/20 text-[10px] uppercase tracking-[4px] font-black">
                    <th className="px-10 py-6 uppercase">Legal Entity</th>
                    <th className="px-10 py-6 uppercase">Representation</th>
                    <th className="px-10 py-6 uppercase">Filing Date</th>
                    <th className="px-10 py-6 text-right uppercase">Security Check</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingPartners.length > 0 ? (
                    pendingPartners.map((partner) => (
                      <tr key={partner._id} className="hover:bg-white/[0.04] transition-all group">
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-orange-600/30 flex items-center justify-center text-white font-black text-2xl border border-primary/20 group-hover:rotate-6 transition-transform shadow-lg shadow-black/40">
                              {partner.businessName[0]}
                            </div>
                            <div>
                              <div className="font-black text-white text-lg group-hover:text-primary transition-colors tracking-tight">{partner.businessName}</div>
                              <div className="text-xs text-white/30 font-medium italic">{partner.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="text-white font-bold text-base">{partner.contactName}</div>
                          <div className="text-[10px] text-primary/80 font-black uppercase mt-1 tracking-wider">Business Lead</div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white/60">
                              {partner.createdAt ? new Date(partner.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Processing'}
                            </span>
                            <span className="text-[10px] text-white/20 font-bold uppercase mt-1">Application Hub</span>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex items-center justify-end gap-4">
                            <button
                              onClick={() => handleApprove(partner._id, 'approved')}
                              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition-all border border-green-400/20 font-black text-xs uppercase tracking-widest shadow-lg shadow-green-500/5"
                            >
                              <CheckCircle size={16} /> Grant Access
                            </button>
                            <button
                              onClick={() => handleApprove(partner._id, 'rejected')}
                              className="p-3.5 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg shadow-red-500/5"
                            >
                              <XCircle size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-10 py-32 text-center">
                        <div className="max-w-xs mx-auto space-y-6">
                          <div className="w-24 h-24 bg-white/[0.03] border border-white/5 rounded-[40px] flex items-center justify-center mx-auto text-primary/20 rotate-12 group-hover:rotate-0 transition-transform">
                            <UtensilsCrossed size={48} />
                          </div>
                          <div className="space-y-2">
                            <p className="text-2xl font-black text-white/40 tracking-tight italic">Clear Skies! ☀️</p>
                            <p className="text-xs text-white/20 font-bold uppercase tracking-widest leading-loose">No pending background checks or partner applications at this moment.</p>
                          </div>
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
  <button className={`w-full flex items-center gap-5 px-6 py-4.5 rounded-[24px] transition-all relative group ${active
      ? 'bg-primary text-white shadow-[0_15px_30px_-5px_rgba(249,115,22,0.4)] scale-[1.02]'
      : 'text-white/30 hover:text-white hover:bg-white/[0.06]'
    }`}>
    <span className={`${active ? 'text-white' : 'group-hover:text-primary group-hover:scale-110 transition-all'}`}>{icon}</span>
    <span className="font-bold text-sm tracking-wide">{label}</span>
    {active && <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />}
  </button>
);

const PremiumStatCard = ({ icon, label, value, trend, color, isUrgent = false }) => (
  <div className="bg-[#121212]/50 backdrop-blur-2xl border border-white/5 p-8 rounded-[40px] group hover:border-white/20 transition-all cursor-pointer relative overflow-hidden shadow-xl">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.04] to-transparent rounded-bl-[120px]" />

    <div className="flex items-center justify-between mb-8">
      <div className="w-16 h-16 rounded-[22px] bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner text-2xl">
        {icon}
      </div>
      <div className={`text-[10px] font-black px-4 py-1.5 rounded-full border tracking-widest ${isUrgent
          ? 'bg-red-500 text-white border-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]'
          : 'bg-white/5 text-white/60 border-white/10'
        }`}>
        {trend}
      </div>
    </div>

    <div className="relative z-10">
      <div className="text-5xl font-black mb-2 tracking-tighter group-hover:text-primary transition-colors leading-none">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-[10px] text-white/30 font-black uppercase tracking-[4px] ml-1">{label}</div>
    </div>

    <div
      className="absolute bottom-[-1px] left-[15%] right-[15%] h-[2px] opacity-0 group-hover:opacity-100 transition-opacity blur-[1px]"
      style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }}
    />
  </div>
);

export default AdminDashboard;
