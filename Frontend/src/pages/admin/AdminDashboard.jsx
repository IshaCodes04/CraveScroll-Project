import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, ShoppingBag, TrendingUp, Settings } from 'lucide-react';
import axios from 'axios';
import '../../styles/admin-dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pendingPartners, setPendingPartners] = useState([]);

  React.useEffect(() => {
    fetchPendingPartners();
  }, []);

  const fetchPendingPartners = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/food-partner/admin/pending", { withCredentials: true });
      setPendingPartners(response.data.pendingPartners || []);
    } catch (error) {
      console.error("Error fetching pending partners:", error);
    }
  };

  const handleApprove = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this partner?`)) return;

    try {
      await axios.put(`http://localhost:3000/api/food-partner/admin/approve/${id}`, { status }, { withCredentials: true });
      alert(`Partner ${status} successfully`);
      fetchPendingPartners(); // Refresh list
    } catch (error) {
      console.error("Error updating partner status:", error);
      alert("Failed to update status");
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
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <h1 className="admin-title">CraveScroll Admin</h1>
            <p className="admin-subtitle">Manage your platform</p>
          </div>
          <button
            className="logout-btn"
            onClick={handleLogout}
            disabled={loading}
          >
            <LogOut size={18} />
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users">
              <Users size={32} />
            </div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-number">1,234</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon partners">
              <ShoppingBag size={32} />
            </div>
            <div className="stat-content">
              <h3>Food Partners</h3>
              <p className="stat-number">89</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <TrendingUp size={32} />
            </div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <p className="stat-number">5,432</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon settings">
              <Settings size={32} />
            </div>
            <div className="stat-content">
              <h3>Active Items</h3>
              <p className="stat-number">2,156</p>
            </div>
          </div>
        </section>

        {/* Pending Approvals Section */}
        <section className="mt-8 bg-[#1e1e1e] rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            Pending Partner Approvals
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/60 text-sm">
                  <th className="p-3">Business Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPartners.length > 0 ? (
                  pendingPartners.map(partner => (
                    <tr key={partner._id} className="border-b border-white/5 text-white hover:bg-white/5">
                      <td className="p-3 font-medium">{partner.businessName}</td>
                      <td className="p-3">{partner.contactName}</td>
                      <td className="p-3 opacity-70">{partner.email}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleApprove(partner._id, 'approved')}
                          className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-md hover:bg-green-500/30 transition-all text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleApprove(partner._id, 'rejected')}
                          className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-md hover:bg-red-500/30 transition-all text-sm"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-white/40">
                      No pending applications at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="admin-footer">
        <p>&copy; 2025 CraveScroll. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
