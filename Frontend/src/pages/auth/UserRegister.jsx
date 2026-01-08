import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat } from "lucide-react";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 relative z-10 flex-col justify-center items-center p-12">
        <div className="text-center max-w-lg">
          {/* Chef Hat Icon */}
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 animate-float shadow-2xl"
            style={{ background: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)" }}
          >
            <ChefHat className="w-12 h-12 text-white" />
          </div>

          {/* Logo */}
          <h1
            className="text-6xl font-black mb-8"
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "900",
              letterSpacing: "0.02em",
              background: "linear-gradient(135deg, #F97316 0%, #FB923C 50%, #F97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
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

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-10">
            <div className="text-center">
              <p
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                10K+
              </p>
              <p
                className="text-white/60 text-sm"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Food Lovers
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                500+
              </p>
              <p
                className="text-white/60 text-sm"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Recipes
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                50+
              </p>
              <p
                className="text-white/60 text-sm"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Chefs
              </p>
            </div>
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
              Create your account
            </h2>
            <p
              className="text-white/60"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Join to explore and enjoy delicious meals.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
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
