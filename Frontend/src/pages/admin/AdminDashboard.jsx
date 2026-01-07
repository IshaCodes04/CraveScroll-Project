import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, ShoppingBag, TrendingUp, Settings } from 'lucide-react';
import axios from 'axios';
import '../../styles/admin-dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

        {/* Management Sections */}
        <section className="management-grid">
          <div className="management-card">
            <h2>User Management</h2>
            <p>Manage user accounts and activity</p>
            <button className="action-btn">Manage Users</button>
          </div>

          <div className="management-card">
            <h2>Partner Management</h2>
            <p>Manage food partner accounts and approvals</p>
            <button className="action-btn">Manage Partners</button>
          </div>

          <div className="management-card">
            <h2>Content Moderation</h2>
            <p>Review and moderate food items and reviews</p>
            <button className="action-btn">Moderate Content</button>
          </div>

          <div className="management-card">
            <h2>Analytics</h2>
            <p>View detailed analytics and reports</p>
            <button className="action-btn">View Analytics</button>
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
