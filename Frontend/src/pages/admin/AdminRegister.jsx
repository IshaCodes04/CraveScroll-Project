import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Shield, Lock, Users, BarChart3, AlertCircle, Sparkles } from 'lucide-react';
import axios from 'axios';

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
        <div className="min-h-screen w-full flex relative overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1920&q=80"
                >
                    <source 
                        src="https://videos.pexels.com/video-files/5765249/5765249-uhd_2560_1440_30fps.mp4" 
                        type="video/mp4" 
                    />
                </video>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Left Side - Branding */}
            <div className="hidden lg:flex flex-1 relative z-10 flex-col justify-center items-center p-12">
                <div className="text-center max-w-lg">
                    {/* Chef Hat Icon */}
                    <div 
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 animate-float"
                        style={{ background: '#F97316' }}
                    >
                        <ChefHat className="w-12 h-12 text-white" />
                    </div>
                    
                    {/* Logo */}
                    <h1 
                        className="text-6xl text-[#F97316] mb-4"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        CraveScroll
                    </h1>
                    
                    {/* Admin Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316]/20 border border-[#F97316]/30 mb-6">
                        <Shield className="w-4 h-4 text-[#F97316]" />
                        <span className="text-[#F97316] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Admin Portal
                        </span>
                    </div>
                    
                    {/* Tagline */}
                    <p className="text-white/90 text-xl mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Manage & monitor the platform with full control
                    </p>

                    {/* Quote Card */}
                    <div 
                        className="p-6 rounded-2xl mt-4"
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}
                    >
                        <Sparkles className="w-6 h-6 text-[#F97316] mx-auto mb-3" />
                        <p className="text-white/80 text-lg italic mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            "Great things in business are never done by one person. They're done by a team."
                        </p>
                        <p className="text-[#F97316] text-sm font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            — Steve Jobs
                        </p>
                    </div>

                    {/* Admin Features */}
                    <div 
                        className="p-6 rounded-2xl mt-6"
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <h3 className="text-white font-semibold mb-4 text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Admin Capabilities
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-[#F97316]" />
                                </div>
                                <span className="text-white/80 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Manage users & food partners
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 flex items-center justify-center">
                                    <BarChart3 className="w-4 h-4 text-[#F97316]" />
                                </div>
                                <span className="text-white/80 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    View analytics & insights
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-[#F97316]" />
                                </div>
                                <span className="text-white/80 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Secure access with secret key
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center gap-12 mt-10">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>10K+</p>
                            <p className="text-white/60 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Users</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>500+</p>
                            <p className="text-white/60 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Partners</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>1M+</p>
                            <p className="text-white/60 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Orders</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
                <div 
                    className="w-full max-w-md rounded-3xl p-8 animate-fadeIn"
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-6">
                        <div 
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                            style={{ background: '#F97316' }}
                        >
                            <ChefHat className="w-8 h-8 text-white" />
                        </div>
                        <h1 
                            className="text-4xl text-[#F97316]"
                            style={{ fontFamily: "'Great Vibes', cursive" }}
                        >
                            CraveScroll
                        </h1>
                        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-[#F97316]/20 border border-[#F97316]/30">
                            <Shield className="w-3 h-3 text-[#F97316]" />
                            <span className="text-[#F97316] font-medium text-xs uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Admin Portal
                            </span>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 
                            className="text-2xl font-bold text-white mb-2"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Admin Registration
                        </h2>
                        <p className="text-white/60" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Create your admin account to get started
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <p className="text-red-300 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Admin Name Field */}
                        <div>
                            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Admin Name
                            </label>
                            <input
                                type="text"
                                name="adminName"
                                placeholder="Admin Name"
                                required
                                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                                style={{ 
                                    fontFamily: "'Poppins', sans-serif",
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)'
                                }}
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="admin@example.com"
                                autoComplete="email"
                                required
                                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                                style={{ 
                                    fontFamily: "'Poppins', sans-serif",
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)'
                                }}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create password"
                                autoComplete="new-password"
                                required
                                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                                style={{ 
                                    fontFamily: "'Poppins', sans-serif",
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)'
                                }}
                            />
                        </div>

                        {/* Secret Key Field */}
                        <div>
                            <label className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                <div className="flex items-center gap-2">
                                    <Lock className="w-3 h-3" />
                                    Secret Key
                                </div>
                            </label>
                            <input
                                type="password"
                                name="secretKey"
                                placeholder="Enter admin secret key"
                                required
                                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                                style={{ 
                                    fontFamily: "'Poppins', sans-serif",
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)'
                                }}
                            />
                            <p className="mt-2 text-xs text-[#F97316]/80" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Required for admin access verification
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{ 
                                fontFamily: "'Poppins', sans-serif",
                                background: loading ? '#9CA3AF' : '#F97316',
                                boxShadow: '0 10px 40px -10px rgba(249, 115, 22, 0.5)'
                            }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Admin Account'
                            )}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <p className="text-center mt-6 text-white/60" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Already an admin?{' '}
                        <Link to="/admin/login" className="text-[#F97316] font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
