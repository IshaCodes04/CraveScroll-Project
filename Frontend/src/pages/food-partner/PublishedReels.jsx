import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
    LogOut, UtensilsCrossed, Plus, LayoutGrid, List,
    Trash2, Play, Heart, Film, AlertTriangle, X,
    TrendingUp, Eye, Star
} from "lucide-react";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";
import Logo from "../../components/Logo";

const PublishedReels = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("feed");
    const [deleteModal, setDeleteModal] = useState({ open: false, item: null });
    const [deleting, setDeleting] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
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

    const confirmDelete = (item) => {
        setDeleteModal({ open: true, item });
    };

    const handleDeleteReel = async () => {
        if (!deleteModal.item) return;
        setDeleting(true);
        try {
            await axios.delete(`http://localhost:3000/api/food/${deleteModal.item._id}`, { withCredentials: true });
            setVideos(prev => prev.filter(v => v._id !== deleteModal.item._id));
            setDeleteModal({ open: false, item: null });
        } catch (error) {
            console.error("Error deleting reel:", error);
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        fetchPublishedReels();
    }, [location.pathname, location.state?.refresh]);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000/api/auth/food-partner/logout", { withCredentials: true });
        } finally {
            navigate("/food-partner/login");
        }
    };

    const totalLikes = videos.reduce((acc, v) => acc + (v.likeCount || 0), 0);

    /* ── LOADING ─────────────────────────────────── */
    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#090909] overflow-hidden relative">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-700/10 rounded-full blur-[140px]" />
                <div className="relative z-10 flex flex-col items-center gap-8">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 rounded-full border-[3px] border-white/5 border-t-orange-500 animate-spin" />
                        <div className="absolute inset-3 rounded-full border-[3px] border-white/5 border-b-orange-400 animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Film className="w-8 h-8 text-orange-500" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-black tracking-tight text-white">
                            My <span className="text-orange-500">Studio</span>
                        </h1>
                        <p className="text-white/30 text-xs font-semibold uppercase tracking-[5px] mt-2">Loading Creations</p>
                    </div>
                </div>
            </div>
        );
    }

    /* ── MAIN ─────────────────────────────────────── */
    return (
        <div className="relative bg-[#090909] min-h-screen">

            {/* ── AMBIENT GLOW ── */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* ── DELETE CONFIRMATION MODAL ── */}
            {deleteModal.open && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setDeleteModal({ open: false, item: null })} />
                    <div className="relative z-10 w-full max-w-sm bg-[#161616] border border-white/10 rounded-3xl p-8 shadow-2xl animate-fade-up">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                        </div>
                        <h2 className="text-white font-black text-xl text-center mb-2">Delete Reel?</h2>
                        <p className="text-white/40 text-sm text-center mb-8 leading-relaxed">
                            This action cannot be undone. Your reel will be permanently removed.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteModal({ open: false, item: null })}
                                className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-bold text-sm hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteReel}
                                disabled={deleting}
                                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-black text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-red-500/25 active:scale-[0.98] group/delbtn"
                            >
                                {deleting ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
                                        <span>Delete Reel</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── HEADER ── */}
            <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 py-4 flex items-center justify-between"
                style={{ background: "linear-gradient(to bottom, rgba(9,9,9,0.98) 0%, rgba(9,9,9,0) 100%)" }}>

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Logo size={22} className="drop-shadow-lg flex-shrink-0" />
                    <span className="text-white font-black text-lg sm:text-xl tracking-tight hidden sm:block">
                        Crave<span className="text-orange-500">Scroll</span>
                    </span>
                </div>

                {/* Center Toggle */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-xl">
                    <button
                        onClick={() => setViewMode("feed")}
                        className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${viewMode === "feed"
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                            : "text-white/30 hover:text-white/70"
                            }`}
                    >
                        <List className="w-3.5 h-3.5" />
                        <span className="hidden sm:block">Feed</span>
                    </button>
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${viewMode === "grid"
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                            : "text-white/30 hover:text-white/70"
                            }`}
                    >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span className="hidden sm:block">Grid</span>
                    </button>
                </div>

                {/* Sign Out */}
                <button
                    onClick={handleLogout}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300"
                >
                    <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-400 transition-colors" />
                    <span className="text-white/40 group-hover:text-red-400 text-xs font-black uppercase tracking-widest hidden sm:block transition-colors">
                        Sign Out
                    </span>
                </button>
            </header>

            {/* ── MAIN CONTENT ── */}
            <main className="relative z-10">

                {/* ─── FEED VIEW ─── */}
                {viewMode === "feed" && (
                    <div className="h-screen w-full">
                        <style>{`.creator-feed [data-internal-header="true"] { display: none; }`}</style>
                        <div className="creator-feed h-full w-full">
                            <ReelFeed
                                items={videos}
                                emptyMessage="You haven't published any reels yet!"
                                authInfo={authInfo}
                                hideStoreButton={true}
                                hideProfile={true}
                                hideDescription={true}
                                hideActions={true}
                                onDelete={confirmDelete}
                            />
                        </div>
                    </div>
                )}

                {/* ─── GRID VIEW ─── */}
                {viewMode === "grid" && (
                    <div className="pt-24 pb-32 px-4 sm:px-8 max-w-7xl mx-auto">

                        {/* Stats Bar */}
                        <div className="flex items-center gap-4 mb-8 mt-2">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
                                <Film className="w-4 h-4 text-orange-400" />
                                <span className="text-white font-black text-sm">{videos.length}</span>
                                <span className="text-white/30 text-xs font-semibold uppercase tracking-wider">Reels</span>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
                                <Heart className="w-4 h-4 text-red-400" />
                                <span className="text-white font-black text-sm">{totalLikes}</span>
                                <span className="text-white/30 text-xs font-semibold uppercase tracking-wider">Likes</span>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-white/30 text-xs font-semibold uppercase tracking-wider">Creator Studio</span>
                            </div>
                        </div>

                        {videos.length === 0 ? (
                            /* Empty State */
                            <div className="flex flex-col items-center justify-center py-32 text-center">
                                <div className="w-24 h-24 rounded-3xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-6">
                                    <Film className="w-10 h-10 text-white/20" />
                                </div>
                                <h2 className="text-white font-black text-2xl mb-2">No Reels Yet</h2>
                                <p className="text-white/30 text-sm mb-8">Start creating your first food reel</p>
                                <button
                                    onClick={() => navigate("/create-food")}
                                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-sm transition-all shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95"
                                >
                                    <Plus className="w-5 h-5" /> Create First Reel
                                </button>
                            </div>
                        ) : (
                            /* Grid */
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                                {videos.map((item, index) => (
                                    <div
                                        key={item._id}
                                        className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
                                        onMouseEnter={() => setHoveredId(item._id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        style={{
                                            animationDelay: `${index * 50}ms`,
                                            background: "rgba(255,255,255,0.03)",
                                            border: hoveredId === item._id ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.07)",
                                            transition: "border-color 0.3s, box-shadow 0.3s",
                                            boxShadow: hoveredId === item._id ? "0 0 30px rgba(249,115,22,0.15)" : "none"
                                        }}
                                    >
                                        {/* Thumbnail */}
                                        <video
                                            src={item.video}
                                            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                            style={{ opacity: hoveredId === item._id ? 1 : 0.5 }}
                                            muted
                                            playsInline
                                            preload="metadata"
                                        />

                                        {/* Always-visible bottom gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" />

                                        {/* Like count badge - always visible */}
                                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md">
                                            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                                            <span className="text-white text-[11px] font-black">{item.likeCount || 0}</span>
                                        </div>

                                        {/* Hover overlay actions */}
                                        <div
                                            className="absolute inset-0 flex flex-col justify-between p-3 transition-all duration-300"
                                            style={{ opacity: hoveredId === item._id ? 1 : 0, transform: hoveredId === item._id ? "translateY(0)" : "translateY(8px)" }}
                                        >
                                            {/* Top row: delete */}
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); confirmDelete(item); }}
                                                    className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-red-500 hover:border-red-500 hover:scale-110 transition-all duration-300 shadow-xl group/del"
                                                >
                                                    <Trash2 className="w-4 h-4 group-hover/del:animate-pulse" />
                                                </button>
                                            </div>

                                            {/* Center: Play */}
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => setViewMode("feed")}
                                                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 hover:scale-110 transition-all duration-300 shadow-xl"
                                                >
                                                    <Play className="w-6 h-6 fill-white ml-1" />
                                                </button>
                                            </div>

                                            {/* Bottom: description */}
                                            <div className="space-y-1">
                                                {item.description && (
                                                    <p className="text-white text-xs font-semibold line-clamp-2 leading-snug drop-shadow-lg">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom gradient overlay with reel number */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
                                            <div className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                                                Reel #{index + 1}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* ── FLOATING CREATE BUTTON ── */}
            <button
                onClick={() => navigate("/create-food")}
                className="group fixed bottom-8 right-6 sm:right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
                style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 20px 60px rgba(249,115,22,0.4)" }}
            >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <Plus className="w-5 h-5 text-white relative z-10 group-hover:rotate-90 transition-transform duration-500" />
                <span className="text-white font-black text-xs uppercase tracking-[3px] relative z-10 hidden sm:block">
                    Create Reel
                </span>
            </button>
        </div>
    );
};

export default PublishedReels;
