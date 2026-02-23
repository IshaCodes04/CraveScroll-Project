import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Loader2, UtensilsCrossed } from "lucide-react";
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
          navigate("/user/login");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVideos();
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
      if (error.response?.status === 401) navigate("/user/login");
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
      if (error.response?.status === 401) navigate("/user/login");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/user/logout", { withCredentials: true });
      navigate("/user/login");
    } catch (error) {
      navigate("/user/login");
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative">
        {/* Animated Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />

        <div className="relative z-10 flex flex-col items-center gap-12 animate-fade-up">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="w-32 h-32 rounded-full border-4 border-white/5 border-t-primary animate-spin flex items-center justify-center relative bg-black/40 backdrop-blur-sm">
              <UtensilsCrossed className="w-10 h-10 text-primary animate-bounce" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black tracking-tighter text-white">
              Crave<span className="text-primary italic">Scroll</span>
            </h1>
            <div className="flex flex-col items-center gap-2">
              <p className="text-white/40 font-bold uppercase tracking-[4px] text-xs">Curating Your Feed</p>
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-[shimmer_2s_infinite]" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="relative bg-black min-h-screen">
      {/* Premium Floating Logout */}
      {isUser && (
        <button
          onClick={handleLogout}
          className="fixed top-6 right-6 z-[100] group flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 hover:border-destructive/30 transition-all duration-500 shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-destructive/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <div className="relative flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive group-hover:rotate-12 transition-all duration-500">
              <LogOut className="w-4 h-4 text-destructive group-hover:text-white" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-white/90 font-black text-[10px] uppercase tracking-widest">Account</span>
              <span className="text-white/40 font-bold text-[10px] uppercase tracking-widest group-hover:text-destructive transition-colors">Sign Out</span>
            </div>
          </div>
        </button>
      )}

      <main className="h-screen w-full relative">
        <ReelFeed
          items={videos}
          onLike={likeVideo}
          onSave={saveVideo}
          emptyMessage="No food reels yet. Check back soon!"
          authInfo={authInfo}
        />
      </main>
    </div>
  );
};

export default Home;
