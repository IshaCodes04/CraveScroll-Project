import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    isUser: false,
    isFoodPartner: false,
    currentPartnerId: null
  });
  const navigate = useNavigate();
  const location = useLocation();

  const fetchVideos = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems || []);
        setIsUser(response.data.isUser || response.data.isFoodPartner || false);
        setAuthInfo({
          isUser: response.data.isUser,
          isFoodPartner: response.data.isFoodPartner,
          currentPartnerId: response.data.currentPartnerId
        });
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        if (error.response?.status === 401) {
          navigate("/user/login"); // navigate to user login page 
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.state?.refresh]);

  const likeVideo = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) => {
          if (v._id === item._id) {
            return {
              ...v,
              likeCount: Math.max(0, response.data.likeCount ?? v.likeCount ?? 0),
              isLiked: response.data.like,
            };
          }
          return v;
        })
      );
    } catch (error) {
      console.error("Error liking video:", error);
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        navigate("/user/login");
      }
    }
  };

  const saveVideo = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) => {
          if (v._id === item._id) {
            return {
              ...v,
              savesCount: Math.max(0, response.data.savesCount ?? v.savesCount ?? 0),
              isSaved: response.data.save,
            };
          }
          return v;
        })
      );
    } catch (error) {
      console.error("Error saving video:", error);
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        navigate("/user/login");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/user/logout", { withCredentials: true });
      navigate("/user/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, navigate to login
      navigate("/user/login");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a0f2e 50%, #1a2a3a 100%)",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "4px solid rgba(255,107,53,0.2)",
            borderTopColor: "#ff6b35",
            borderRadius: "50%",
            animation: "spin 1.2s linear infinite",
            boxShadow: "0 0 20px rgba(255, 107, 53, 0.3)",
          }}
        />
        <span
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "500",
            letterSpacing: "0.5px",
          }}
        >
          🍽️ Loading delicious reels...
        </span>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {/* Logout Button */}
      {isUser && (
        <button
          onClick={handleLogout}
          className="group fixed top-4 right-4 z-[9999] flex items-center justify-center gap-2.5 
            px-5 py-2.5 sm:px-6 sm:py-3
            rounded-full
            bg-gradient-to-r from-red-500 via-rose-600 to-red-700
            text-white text-sm font-bold
            shadow-[0_0_15px_rgba(239,68,68,0.3)]
            hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]
            hover:scale-105 active:scale-95
            transition-all duration-300 ease-out
            overflow-hidden"
          title="Sign Out"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />

          <div className="relative flex items-center gap-2">
            <LogOut className="w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform duration-300" />
            <span className="tracking-wide">Logout</span>
          </div>
        </button>
      )}

      <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        emptyMessage="No food reels yet. Check back soon!"
        authInfo={authInfo}
      />
    </>
  );
};

export default Home;
