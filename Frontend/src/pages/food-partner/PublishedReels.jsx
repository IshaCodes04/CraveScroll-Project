import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Loader2, UtensilsCrossed, Plus, LayoutGrid } from "lucide-react";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";
import Logo from "../../components/Logo";

const PublishedReels = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authInfo, setAuthInfo] = useState({
        isUser: false,
        isFoodPartner: false,
        currentPartnerId: null
    });
    const navigate = useNavigate();
    const location = useLocation();

    const fetchPublishedReels = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/food/publishedReels", { withCredentials: true });

            setAuthInfo({
                isUser: false,
                isFoodPartner: true,
                currentPartnerId: response.data.currentPartnerId
            });

            setVideos(response.data.foodItems || []);
        } catch (error) {
            console.error("Error fetching published reels:", error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate("/food-partner/login");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublishedReels();
    }, [location.pathname, location.state?.refresh]);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000/api/auth/user/logout", { withCredentials: true });
            navigate("/food-partner/login");
        } catch (error) {
            navigate("/food-partner/login");
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative">
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
                            My<span className="text-primary italic">Reels</span>
                        </h1>
                        <p className="text-white/40 font-bold uppercase tracking-[4px] text-xs">Loading Your Creations</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-black min-h-screen">
            {/* Global Header - Home Style */}
            <div className="fixed top-0 left-0 right-0 p-4 sm:p-6 z-[100] flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                {/* Left Side: Logo + Heading (Home Style) */}
                <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
                    <div className="flex items-center justify-center animate-float">
                        <Logo size={24} className="w-6 h-6 sm:w-10 sm:h-10 drop-shadow-lg" />
                    </div>
                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold drop-shadow-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                        CraveScroll
                    </h1>
                </div>

                {/* Center: My Published Reels Badge */}
                <div className="absolute left-1/2 -translate-x-1/2 top-4 sm:top-6 pointer-events-auto">
                    <div className="flex items-center gap-2 px-6 py-2.5 sm:py-3.5 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/10 shadow-2xl">
                        <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                        <span className="text-white font-black text-[9px] sm:text-[10px] uppercase tracking-[3px] whitespace-nowrap">My Published Reels</span>
                    </div>
                </div>

                {/* Right Side: Professional Sign Out Button */}
                <div className="flex items-center gap-3 sm:gap-6 pointer-events-auto">
                    <button
                        onClick={handleLogout}
                        className="group relative flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 hover:border-destructive/30 transition-all duration-500 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-destructive/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <div className="relative flex items-center gap-2 sm:gap-3">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive group-hover:rotate-12 transition-all duration-500">
                                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-destructive group-hover:text-white" />
                            </div>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-white/90 font-black text-[8px] sm:text-[10px] uppercase tracking-widest hidden xs:block">Account</span>
                                <span className="text-white/40 font-bold text-[8px] sm:text-[10px] uppercase tracking-widest group-hover:text-destructive transition-colors">Sign Out</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Bottom Create Reel Button */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto w-full max-w-[240px] px-4">
                <button
                    onClick={() => navigate("/create-food")}
                    className="group relative w-full flex items-center justify-center gap-2 sm:gap-3 px-8 py-4 sm:py-5 rounded-2xl bg-primary hover:bg-orange-600 transition-all duration-500 shadow-[0_20px_50px_rgba(249,115,22,0.4)] overflow-hidden hover:scale-105 active:scale-95"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                    <Plus className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-700" />
                    <span className="text-white font-black text-[11px] uppercase tracking-[3px]">Create Reel</span>
                </button>
            </div>

            <main className="h-screen w-full relative">
                {/* Hide Internal Reel Header */}
                <style>{`
                    .creator-feed [data-internal-header="true"] {
                        display: none;
                    }
                `}</style>
                <div className="creator-feed h-full w-full">
                    <ReelFeed
                        items={videos}
                        emptyMessage="You haven't published any reels yet!"
                        authInfo={authInfo}
                        hideStoreButton={true}
                        hideProfile={true}
                        hideDescription={true}
                    />
                </div>
            </main>
        </div>
    );
};

export default PublishedReels;
