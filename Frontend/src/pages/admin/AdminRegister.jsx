import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Shield, Lock, Users, BarChart3, AlertCircle, Sparkles, UserPlus, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSecret, setShowSecret] = useState(false);

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
        <div className="min-h-screen w-full flex relative overflow-hidden bg-background">
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
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
            </div>

            {/* Left Side - Branding (Original Layout) */}
            <div className="hidden lg:flex flex-1 relative z-10 flex-col justify-center items-center p-12">
                <div className="text-center max-w-lg animate-fade-up">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 animate-float bg-primary">
                        <ChefHat className="w-12 h-12 text-white" />
                    </div>

                    <h1 className="text-6xl text-primary mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                        CraveScroll
                    </h1>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                            Admin Portal
                        </span>
                    </div>

                    <p className="text-white/90 text-xl mb-8">
                        Join the team managing the platform with full control
                    </p>

                    <div className="p-6 rounded-2xl glass-card text-left space-y-4">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-white/80">Full administrative oversight</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-primary" />
                            <span className="text-white/80">Secure authorization checks</span>
                        </div>
                    </div>

                    <div className="flex justify-center gap-12 mt-10">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">10K+</p>
                            <p className="text-white/60 text-sm">Users</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">1M+</p>
                            <p className="text-white/60 text-sm">Impressions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form with Premium Glass Card */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10 overflow-y-auto max-h-screen scrollbar-hide py-12">
                <div
                    className="w-full max-w-md rounded-[40px] p-10 animate-scale-in my-8"
                    style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(35px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <div className="lg:hidden w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <ChefHat className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Registration</h2>
                        <p className="text-white/50">Create your admin account</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="adminName"
                                placeholder="Alexander Pierce"
                                required
                                className="w-full px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="admin@cravescroll.com"
                                required
                                className="w-full px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-6 py-3.5 pr-14 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Lock className="w-3 h-3 text-primary" /> Secret Admin Key
                            </label>
                            <div className="relative">
                                <input
                                    type={showSecret ? 'text' : 'password'}
                                    name="secretKey"
                                    placeholder="Authorization Key"
                                    required
                                    className="w-full px-6 py-3.5 pr-14 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all font-mono"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowSecret(!showSecret)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                                >
                                    {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4.5 mt-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all ${loading ? 'bg-white/10 cursor-not-allowed' : 'btn-primary-glow h-[60px]'
                                }`}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    <span>Register Admin</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center mt-8 text-white/40 text-sm">
                        Already authorized?{' '}
                        <Link to="/admin/login" className="text-primary hover:underline font-bold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
