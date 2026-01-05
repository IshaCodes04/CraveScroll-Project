import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {

  const navigate = useNavigate();
  
  const handleSubmit = (e) => { 
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    axios.post("http://localhost:3000/api/auth/food-partner/register", {
      businessName,
      contactName,
      phone,
      email,
      password,
      address
    }, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        navigate("/create-food"); // Redirect to create food page after successful registration
      })
      .catch(error => {
        console.error("There was an error registering!", error);
      });
  };

  return (
    <div className="auth-page-wrapper" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1695457202474-52edd459640b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
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

      <div className="auth-card" role="region" aria-labelledby="partner-register-title" style={{
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
          <h1 id="partner-register-title" className="auth-title" style={{ color: '#1a1a1a' }}>Partner sign up</h1>
          <p className="auth-subtitle" style={{ color: '#666666' }}>Grow your business with our platform.</p>
        </header>
        <nav className="auth-alt-action" style={{marginTop: '-4px', color: '#666666'}}>
          <strong style={{fontWeight:600, color: '#1a1a1a'}}>Switch:</strong> <Link to="/user/register" style={{ color: '#ff6b35' }}>User</Link> • <Link to="/food-partner/register" style={{ color: '#ff6b35' }}>Food partner</Link>
        </nav>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="businessName" style={{ color: '#1a1a1a' }}>Business Name</label>
            <input 
              id="businessName" 
              name="businessName" 
              placeholder="Tasty Bites" 
              autoComplete="organization"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
            />
          </div>
          <div className="two-col">
            <div className="field-group">
              <label htmlFor="contactName" style={{ color: '#1a1a1a' }}>Contact Name</label>
              <input 
                id="contactName" 
                name="contactName" 
                placeholder="Jane Doe" 
                autoComplete="name"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
                }}
              />
            </div>
            <div className="field-group">
              <label htmlFor="phone" style={{ color: '#1a1a1a' }}>Phone</label>
              <input 
                id="phone" 
                name="phone" 
                placeholder="+1 555 123 4567" 
                autoComplete="tel"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
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
              placeholder="Create password" 
              autoComplete="new-password"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
            />
          </div>
          <div className="field-group">
            <label htmlFor="address" style={{ color: '#1a1a1a' }}>Address</label>
            <input 
              id="address" 
              name="address" 
              placeholder="123 Market Street" 
              autoComplete="street-address"
              style={{
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
            />
            <p className="small-note" style={{ color: '#666666' }}>Full address helps customers find you faster.</p>
          </div>
          <button className="auth-submit" type="submit">Create Partner Account</button>
        </form>
        <div className="auth-alt-action" style={{ color: '#666666' }}>
          Already a partner? <Link to="/food-partner/login" style={{ color: '#ff6b35' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;