import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => { 
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const adminName = e.target.adminName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const secretKey = e.target.secretKey.value;

      const response = await axios.post("http://localhost:3000/api/auth/admin/register", {
        adminName,
        email,
        password,
        secretKey
      }, { withCredentials: true });

      console.log(response.data);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Light overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 0
      }}></div>

      <div className="auth-card" role="region" aria-labelledby="admin-register-title" style={{
        marginRight: '5%',
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        border: 'none',
        maxWidth: '480px',
        width: '100%'
      }}>
        <header>
          <h1 id="admin-register-title" className="auth-title" style={{ color: '#1a1a1a' }}>Admin sign up</h1>
          <p className="auth-subtitle" style={{ color: '#666666' }}>Create your admin account.</p>
        </header>
        <nav className="auth-alt-action" style={{marginTop: '-4px', color: '#666666'}}>
          <strong style={{fontWeight:600, color: '#1a1a1a'}}>Switch:</strong> <Link to="/food-partner/register" style={{ color: '#ff6b35' }}>Food Partner</Link> • <Link to="/admin/register" style={{ color: '#ff6b35' }}>Admin</Link>
        </nav>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              color: '#dc2626',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
          <div className="field-group">
            <label htmlFor="adminName" style={{ color: '#1a1a1a' }}>Admin Name</label>
            <input 
              id="adminName" 
              name="adminName" 
              placeholder="Admin Name" 
              autoComplete="name"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="email" style={{ color: '#1a1a1a' }}>Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="admin@example.com" 
              autoComplete="email"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="password" style={{ color: '#1a1a1a' }}>Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Create password" 
              autoComplete="new-password"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="secretKey" style={{ color: '#1a1a1a' }}>Secret Key</label>
            <input 
              id="secretKey" 
              name="secretKey" 
              type="password" 
              placeholder="Enter admin secret key" 
              autoComplete="off"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
              required
            />
            <p className="small-note" style={{ color: '#666666' }}>Required for admin access.</p>
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Admin Account'}
          </button>
        </form>
        <div className="auth-alt-action" style={{ color: '#666666' }}>
          Already an admin? <Link to="/admin/login" style={{ color: '#ff6b35' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
