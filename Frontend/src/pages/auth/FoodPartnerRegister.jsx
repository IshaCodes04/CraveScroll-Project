import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat } from "lucide-react";
import axios from "axios";
import './food-partner-auth.css';


const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/food-partner/register",
      {
        businessName,
        contactName,
        phone,
        email,
        password,
        address,
      },
      { withCredentials: true }
    );
    console.log(response.data);

    navigate("/create-food");
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
          poster="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
        >
          <source src="/food-partnerregister.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 relative z-10 flex-col justify-start items-center p-12 pt-16">
        <div className="text-center max-w-lg">
          {/* Chef Hat Icon */}
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 animate-float shadow-2xl"
            style={{ background: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)" }}
          >
            <ChefHat className="w-12 h-12 text-white" />
          </div>

          {/* Logo */}
          <h1 className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            CraveScroll
          </h1>

          {/* Food Creator Features */}
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl p-4 mb-8 border border-orange-400/30">
            <p className="text-white/80 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
              ✨ <span className="font-semibold">Become a Food Creator</span> - Create stunning food reels, share recipes & inspire millions of food lovers worldwide
            </p>
          </div>

          {/* Quote */}
          <div
            className="p-6 rounded-2xl mt-8"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <p
              className="text-white/80 text-lg italic mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              "Every dish tells a story. Let yours go viral."
            </p>
            <p
              className="text-[#F97316] text-sm font-medium"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              — Turn your passion into a career
            </p>
          </div>

          {/* Why Join Section */}
          <div className="mt-8 space-y-3 text-left">
            <p className="text-white/70 text-sm flex items-start gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-[#F97316] text-lg leading-4">🎬</span>
              <span><span className="text-white font-semibold">Create Reels</span> - Share mouth-watering food content</span>
            </p>
            <p className="text-white/70 text-sm flex items-start gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-[#F97316] text-lg leading-4">📈</span>
              <span><span className="text-white font-semibold">Grow Audience</span> - Reach millions of food enthusiasts</span>
            </p>
            <p className="text-white/70 text-sm flex items-start gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-[#F97316] text-lg leading-4">👥</span>
              <span><span className="text-white font-semibold">Build Community</span> - Connect with fellow creators</span>
            </p>
          </div>

          {/* What You Get Section */}
          <div className="mt-8 pt-6 border-t border-white/20 space-y-3">
            <p className="text-white/60 text-xs uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Creator benefits:
            </p>
            <p className="text-white/70 text-xs flex items-start gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-[#F97316]">⭐</span>
              <span><span className="text-white font-semibold">Instant Reach</span> - Connect with food lovers</span>
            </p>
            <p className="text-white/70 text-xs flex items-start gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-[#F97316]">📊</span>
              <span><span className="text-white font-semibold">Real Analytics</span> - See what works best</span>
            </p>
            <p className="text-white/70 text-xs flex items-start gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-[#F97316]">💰</span>
              <span><span className="text-white font-semibold">Earn & Grow</span> - Build your food brand</span>
            </p>
          </div>

        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div
          className="w-full max-w-md rounded-3xl p-8 animate-fadeIn"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ background: "#F97316" }}
            >
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-4xl text-[#F97316]"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              CraveScroll
            </h1>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Create creator account
            </h2>
            <p
              className="text-white/60"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Start your food creator journey today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Business Name */}
            <div>
              <label
                className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                placeholder="Your Food Brand"
                required
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              />
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              />
            </div>

            {/* Address Field */}
            <div>
              <label
                className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your location"
                required
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "#F97316",
                boxShadow: "0 10px 40px -10px rgba(249, 115, 22, 0.5)",
              }}
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span
              className="px-4 text-sm text-white/40"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              or
            </span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full py-3 rounded-xl text-white font-medium flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Footer Link */}
          <p
            className="text-center mt-6 text-white/60"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Already a creator?{" "}
            <Link
              to="/food-partner/login"
              className="text-[#F97316] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
