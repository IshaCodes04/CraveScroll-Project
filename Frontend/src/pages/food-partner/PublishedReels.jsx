import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, Loader2, UtensilsCrossed, ArrowLeft } from "lucide-react";
import ReelFeed from "../../components/ReelFeed";

const PublishedReels = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPublishedReels = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/food/publishedReels", { withCredentials: true });
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
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-up">
                    <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-primary animate-spin flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                    <p className="text-white/40 font-bold uppercase tracking-[4px] text-xs">Fetching Your Creations</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-black relative">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-6 left-6 z-[100] p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all group"
            >
                <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Title Overlay */}
            <div className="fixed top-6 left-24 z-[100] pointer-events-none">
                <h1 className="text-white font-black text-xl uppercase tracking-widest hidden sm:block">
                    My <span className="text-primary">Published</span> Reels
                </h1>
            </div>

            <ReelFeed
                items={videos}
                emptyMessage="You haven't published any reels yet!"
                authInfo={{ isFoodPartner: true }}
            />
        </div>
    );
};

export default PublishedReels;
