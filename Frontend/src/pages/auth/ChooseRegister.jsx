import { User, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

const foodBg =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ChooseRegister = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${foodBg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CoBack Button */}
      <button
        onClick={() => navigate("/welcome")}
        className="absolute top-6 left-6 text-white/60 hover:text-white transition-colors"
        aria-label="Go back"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* ntent */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12">
        {/* Logo */}
        <div
          className="flex flex-col items-center mb-8 animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex justify-center mb-6 animate-float">
            <Logo className="w-20 h-20 drop-shadow-lg" />
          </div>
          <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            CraveScroll
          </h1>
          <p
            className="text-white/80 text-center text-sm"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Join the ultimate food discovery experience
          </p>
        </div>

        {/* Main Card with Options */}
        <div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 animate-fadeIn border border-white/10"
          style={{ animationDelay: "0.4s" }}
        >
          <h2
            className="text-white text-center text-2xl font-semibold mb-8"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Create your account
          </h2>

          <div className="flex justify-center mb-8">
            {/* User sign up*/}
            <Link to="/user/register" className="block w-full sm:w-72">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/10 h-full">
                <div className="w-14 h-14 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7 text-orange-500" />
                </div>
                <div className="text-center">
                  <h3
                    className="font-semibold text-white text-base"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Sign up as User
                  </h3>
                  <p
                    className="text-white/60 text-sm mt-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Discover & scroll reels
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Login Section */}
          <div
            className="text-center animate-fadeIn"
            style={{
              animationDelay: "0.6s",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <p className="text-white/60 text-sm mb-4">Already have an account?</p>
            <Link
              to="/user/login"
              className="text-orange-500 hover:text-orange-400 font-medium text-sm transition-colors"
            >
              User Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center text-white/40 text-xs mt-6 animate-fadeIn"
          style={{
            animationDelay: "0.8s",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Join thousands of food lovers worldwide
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ChooseRegister;
