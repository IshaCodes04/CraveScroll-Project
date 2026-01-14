import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Shield, Lock, Users, BarChart3, AlertCircle, Sparkles, LogIn, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="h-screen w-full flex relative overflow-hidden bg-background">
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
            Manage & monitor the platform with full control
          </p>

          <div className="p-6 rounded-2xl glass-card text-left space-y-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-white/80">Manage users & food partners</span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="text-white/80">View analytics & insights</span>
            </div>
          </div>

          <div className="flex justify-center gap-12 mt-10">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10K+</p>
              <p className="text-white/60 text-sm">Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-white/60 text-sm">Partners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form with Premium Glass Card */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div
          className="w-full max-w-md rounded-[40px] p-10 animate-scale-in"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(35px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Form Header */}
          <div className="text-center mb-10">
            <div className="lg:hidden w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/50">Sign in to your admin account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="admin@cravescroll.com"
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all"
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
                  className="w-full px-6 py-4 pr-14 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-all"
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

            <div className="text-right">
              <Link to="/admin/forgot-password" size="sm" className="text-xs text-white/30 hover:text-primary transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4.5 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all ${loading ? 'bg-white/10 cursor-not-allowed' : 'btn-primary-glow h-[60px]'
                }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center mt-8 text-white/40 text-sm">
            New admin?{' '}
            <Link to="/admin/register" className="text-primary hover:underline font-bold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
