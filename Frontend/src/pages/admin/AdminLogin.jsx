import React, { useState } from 'react';
import '../../styles/auth-shared.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post("http://localhost:3000/api/auth/admin/login", {
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
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
      justifyContent: 'flex-end',
      minHeight: '100vh',
      padding: '20px'
    }}>


      <div className="auth-card" role="region" aria-labelledby="admin-login-title" style={{
        marginRight: '5%',
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        border: 'none',
        maxWidth: '440px',
        width: '100%'
      }}>
        <header>
          <h1 id="admin-login-title" className="auth-title" style={{ color: '#1a1a1a' }}>Admin login</h1>
          <p className="auth-subtitle" style={{ color: '#666666' }}>Access your admin dashboard.</p>
        </header>
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
              placeholder="Password" 
              autoComplete="current-password"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
              required
            />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-alt-action" style={{ color: '#666666' }}>
          New admin? <a href="/admin/register" style={{ color: '#ff6b35' }}>Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
