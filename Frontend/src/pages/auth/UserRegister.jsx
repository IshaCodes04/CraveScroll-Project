import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/user/register", {
            fullName: firstName + " " + lastName,
            email,
            password
        },
        {
            withCredentials: true
        })

        console.log(response.data);

        navigate("/home")
    };

    return (
        <div className="auth-page-wrapper" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1695457207327-2fe494a5aab8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
        }}>
            {/* Dark overlay for better readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                zIndex: 0
            }}></div>

            <div className="auth-card" role="region" aria-labelledby="user-register-title" style={{
                marginLeft: 'auto',
                marginRight: '5%',
                position: 'relative',
                zIndex: 1,
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                border: 'none'
            }}>
                <header>
                    <h1 id="user-register-title" className="auth-title" style={{ color: '#1a1a1a' }}>Create your account</h1>
                    <p className="auth-subtitle" style={{ color: '#666666' }}>Join to explore and enjoy delicious meals.</p>
                </header>
                <nav className="auth-alt-action" style={{ marginTop: '-4px', color: '#666666' }}>
                    <strong style={{ fontWeight: 600, color: '#1a1a1a' }}>Switch:</strong> <Link to="/user/register" style={{ color: '#ff6b35' }}>User</Link> • <Link to="/food-partner/register" style={{ color: '#ff6b35' }}>Food partner</Link>
                </nav>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="two-col">
                        <div className="field-group">
                            <label htmlFor="firstName" style={{ color: '#1a1a1a' }}>First Name</label>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                placeholder="Jane" 
                                autoComplete="given-name"
                                style={{
                                    backgroundColor: '#ffffff',
                                    color: '#1a1a1a',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                        <div className="field-group">
                            <label htmlFor="lastName" style={{ color: '#1a1a1a' }}>Last Name</label>
                            <input 
                                id="lastName" 
                                name="lastName" 
                                placeholder="Doe" 
                                autoComplete="family-name"
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
                            placeholder="you@example.com" 
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
                            placeholder="••••••••" 
                            autoComplete="new-password"
                            style={{
                                backgroundColor: '#ffffff',
                                color: '#1a1a1a',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px'
                            }}
                        />
                    </div>
                    <button className="auth-submit" type="submit">Sign Up</button>
                </form>
                <div className="auth-alt-action" style={{ color: '#666666' }}>
                    Already have an account? <Link to="/user/login" style={{ color: '#ff6b35' }}>Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;