import React from 'react';
import '../../styles/auth-shared.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", {
      email,
      password
    }, { withCredentials: true });

    console.log(response.data);

    navigate("/create-food"); // Redirect to create food page after login

  };

  return (
    <div className="auth-page-wrapper" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1649366078595-a6e5681e047a?q=80&w=1046&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
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


      <div className="auth-card" role="region" aria-labelledby="partner-login-title" style={{
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
          <h1 id="partner-login-title" className="auth-title" style={{ color: '#1a1a1a' }}>Partner login</h1>
          <p className="auth-subtitle" style={{ color: '#666666' }}>Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email" style={{ color: '#1a1a1a' }}>Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="business@example.com" 
              autoComplete="email"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
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
            />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action" style={{ color: '#666666' }}>
          New partner? <a href="/food-partner/register" style={{ color: '#ff6b35' }}>Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;