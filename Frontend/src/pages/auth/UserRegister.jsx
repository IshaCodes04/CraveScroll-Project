import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import Logo from "../../components/Logo";

const UserRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: firstName + " " + lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/home");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Try using a different email.");
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
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 relative z-10 flex-col justify-center items-center p-12">
        <div className="text-center max-w-lg">
          {/* Logo Icon */}
          <div className="flex justify-center mb-8 animate-float">
            <Logo className="w-24 h-24 drop-shadow-2xl" />
          </div>

          {/* Logo */}
          <h1 className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            CraveScroll
          </h1>

          {/* Food Lover Features */}
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl p-4 mb-8 border border-orange-400/30">
            <p className="text-white/80 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
              ✨ <span className="font-semibold">Endless Food Reels</span> - Scroll through mouth-watering dishes, recipes & culinary inspiration from around the world
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
              "Food is not just eating energy. It's an experience."
            </p>
            <p
              className="text-[#F97316] text-sm font-medium"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              — Discover new flavors everyday
            </p>
          </div>

          {/* Why Join Section */}
          <div className="mt-8 space-y-3 text-left">
            <p className="text-white/70 text-sm flex items-start gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-[#F97316] text-lg leading-4">🔥</span>
              <span><span className="text-white font-semibold">Trending Recipes</span> - Watch viral food content from passionate creators</span>
            </p>
            <p className="text-white/70 text-sm flex items-start gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-[#F97316] text-lg leading-4">❤️</span>
              <span><span className="text-white font-semibold">Save & Share</span> - Bookmark recipes and share with fellow food enthusiasts</span>
            </p>
            <p className="text-white/70 text-sm flex items-start gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <span className="text-[#F97316] text-lg leading-4">🌍</span>
              <span><span className="text-white font-semibold">Global Kitchen</span> - Explore cuisines from every corner of the world</span>
            </p>
          </div>

        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 relative z-10">
        <div
          className="w-full max-w-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 animate-fadeIn"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex justify-center mb-4">
              <Logo className="w-16 h-16 drop-shadow-xl" />
            </div>
            <h1
              className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
            >
              CraveScroll
            </h1>
          </div>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2
              className="text-xl sm:text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Create your account
            </h2>
            <p
              className="text-white/60 text-sm sm:text-base"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Join to explore and enjoy delicious meals.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-200 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label
                  className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Jane"
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
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
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
            Already have an account?{" "}
            <Link
              to="/user/login"
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

export default UserRegister;
