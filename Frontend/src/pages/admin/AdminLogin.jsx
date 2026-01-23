import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, BarChart3, AlertCircle, LogIn, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import Logo from '../../components/Logo';

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
      const secretKey = e.target.secretKey.value;

      const response = await axios.post("http://localhost:3000/api/auth/admin/login", {
        email,
        secretKey
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
    <div className="min-h-screen w-full flex relative overflow-hidden bg-[#FDFBF9] text-[#4A3728] font-['Poppins']">
      {/* Decorative Blur Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FDE68A]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-[#FDBA74]/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#FEF3C7]/40 rounded-full blur-[120px] pointer-events-none opacity-50" />

      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 relative z-10 flex-col justify-center items-center p-12">
        <div className="max-w-md w-full">
          <div className="flex items-center gap-5 mb-16">
            <div className="flex items-center justify-center transition-transform hover:scale-105">
              <Logo className="w-16 h-16 drop-shadow-xl" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter leading-none text-[#4A3728]">CraveScroll</h1>
              <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-[4px]">Management</span>
            </div>
          </div>

          <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight">
            Control your <span className="text-[#D97706]">Platform</span> with ease.
          </h2>

          <p className="text-[#78716C] text-lg font-medium mb-12 leading-relaxed">
            Access the administrative portal and manage your growing food community with powerful tools and insights.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-5 bg-white border border-[#F3E8D9] rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-[#FFFBEB] rounded-2xl flex items-center justify-center text-[#D97706]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-[#4A3728]">User Management</p>
                <p className="text-xs text-[#A8A29E]">Overview of all platform residents</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white border border-[#F3E8D9] rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-[#FFFBEB] rounded-2xl flex items-center justify-center text-[#D97706]">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-[#4A3728]">Real-time Stats</p>
                <p className="text-xs text-[#A8A29E]">Monitor growth and engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-lg bg-white border border-[#F3E8D9] rounded-[48px] p-10 lg:p-14 shadow-[0_20px_50px_rgba(74,55,40,0.05)]">
          <div className="text-center mb-12">
            <div className="lg:hidden flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center justify-center">
                <Logo className="w-20 h-20 drop-shadow-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#4A3728]">CraveScroll</span>
                <span className="text-[8px] text-[#D97706] font-bold uppercase tracking-[3px]">Management</span>
              </div>
            </div>
            <h3 className="text-3xl font-black text-[#4A3728] mb-3">Welcome Back</h3>
            <p className="text-[#A8A29E] font-medium">Please sign in to your admin account</p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
              <p className="text-[#B91C1C] text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#D97706] uppercase tracking-[2px] ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="admin@cravescroll.com"
                required
                className="w-full px-8 py-5 rounded-3xl bg-[#FAF7F2] border border-[#F3E8D9] text-[#4A3728] placeholder-[#A8A29E] focus:outline-none focus:border-[#D97706]/40 transition-all font-bold transition-all"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-[#D97706] uppercase tracking-[2px]">
                  Secret Admin Key
                </label>
                <Link to="/admin/forgot-password" size="sm" className="text-[10px] font-black text-[#A8A29E] hover:text-[#D97706] uppercase tracking-wider transition-colors">
                  Recovery
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="secretKey"
                  placeholder="Enter your secret key"
                  required
                  className="w-full px-8 py-5 pr-16 rounded-3xl bg-[#FAF7F2] border border-[#F3E8D9] text-[#4A3728] placeholder-[#A8A29E] focus:outline-none focus:border-[#D97706]/40 transition-all font-bold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#D97706] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-6 rounded-3xl text-white font-black text-sm uppercase tracking-[2px] flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#D97706]/20 ${loading ? 'bg-[#D97706]/60 cursor-not-allowed' : 'bg-[#D97706] hover:bg-[#B45309] hover:scale-[1.02] active:scale-[0.98]'
                }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Authenticate</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-12 text-[#A8A29E] font-medium text-sm">
            Need access?{' '}
            <Link to="/admin/register" className="text-[#D97706] hover:text-[#B45309] font-black underline underline-offset-4">
              Register Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
