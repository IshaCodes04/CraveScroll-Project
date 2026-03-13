import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Volume2,
  VolumeX,
  Utensils,
  Plus,
  UserPlus,
  ChefHat,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  onFollow,
  emptyMessage,
  authInfo = {},
  hideStoreButton = false,
  hideProfile = false,
  hideDescription = false,
  hideActions = false,
  onDelete,
}) => {
  const [playingStates, setPlayingStates] = useState({});
  const containerRef = useRef(null);
  const [likedItems, setLikedItems] = useState({});
  const [savedItems, setSavedItems] = useState({});
  const videoRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.dataset.id;
          if (entry.isIntersecting) {
            entry.target.play().catch((e) => console.log("Auto-play error:", e));
            setPlayingStates((prev) => ({ ...prev, [videoId]: true }));
          } else {
            entry.target.pause();
            setPlayingStates((prev) => ({ ...prev, [videoId]: false }));
          }
        });
      },
      { threshold: 0.6 }
    );

    const currentRefs = videoRefs.current;
    Object.values(currentRefs).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [items]);

  const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingStates((prev) => ({ ...prev, [id]: true }));
      } else {
        video.pause();
        setPlayingStates((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const setVideoRef = (id) => (el) => {
    videoRefs.current[id] = el;
  };

  const handleLike = (item) => {
    setLikedItems((prev) => ({ ...prev, [item._id]: !prev[item._id] }));
    onLike?.(item);
  };

  const handleSave = (item) => {
    setSavedItems((prev) => ({ ...prev, [item._id]: !prev[item._id] }));
    onSave?.(item);
  };

  if (!items || items.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-[10]">
        <div className="text-center px-8 flex flex-col items-center">
          <div className="flex justify-center mb-6 animate-float">
            <Logo size={80} className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-2xl" />
          </div>
          <h2 className="text-white font-black text-xl sm:text-2xl mb-2 opacity-80">
            {emptyMessage || "No reels yet"}
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-xs">
            Start your culinary journey by creating or exploring mouth-watering content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black relative">
      {items.map((item) => {
        const videoId = item._id || item.id;
        const isPlaying = playingStates[videoId];
        // Use prop value if available, otherwise use local state
        const isLiked = item.isLiked !== undefined ? item.isLiked : likedItems[videoId] || false;
        const isSaved = item.isSaved !== undefined ? item.isSaved : savedItems[videoId] || false;

        return (
          <section
            key={videoId}
            className="h-screen w-full snap-start snap-always relative overflow-hidden flex flex-col justify-center bg-black"
          >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full bg-black">
              <video
                ref={setVideoRef(videoId)}
                data-id={videoId}
                className="w-full h-full object-cover"
                src={item.video}
                muted
                playsInline
                loop
                preload="auto"
                onClick={() => togglePlay(videoId)}
              />
            </div>

            {/* Play/Pause Overlay Indicator */}
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${!isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-150"
                }`}
            >
              <div className="w-24 h-24 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl">
                <Play className="w-10 h-10 text-white fill-white ml-1 animate-pulse" />
              </div>
            </div>

            {/* Premium Overlay Gradients */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* Header with CraveScroll */}
            <div data-internal-header="true" className="absolute top-0 left-0 right-0 p-4 sm:p-8 z-30 select-none">
              <div className="flex items-center gap-2 sm:gap-4 drop-shadow-2xl">
                <div className="flex items-center justify-center animate-float">
                  <Logo size={24} className="w-7 h-7 sm:w-11 sm:h-11 drop-shadow-xl" />
                </div>
                <h1
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter drop-shadow-2xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-fadeIn"
                >
                  CraveScroll
                </h1>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-3 sm:right-6 bottom-40 sm:top-1/2 sm:-translate-y-1/2 flex flex-col items-center gap-5 sm:gap-7 z-30">
              {!hideActions && (
                <>
                  {/* Like */}
                  <button
                    onClick={() => handleLike(item)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div
                      className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isLiked
                        ? "bg-red-500 scale-110 shadow-lg shadow-red-500/40"
                        : "bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20"
                        }`}
                    >
                      <Heart
                        className={`w-5 h-5 sm:w-7 sm:h-7 transition-all ${isLiked ? "text-white fill-white" : "text-white"
                          }`}
                      />
                    </div>
                    <span className="text-white text-[10px] sm:text-xs font-bold drop-shadow-lg">
                      {Math.max(0, item.likeCount ?? 0)}
                    </span>
                  </button>

                  {/* Save */}
                  <button
                    onClick={() => handleSave(item)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div
                      className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isSaved
                        ? "bg-primary scale-110 shadow-lg shadow-primary/40"
                        : "bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20"
                        }`}
                    >
                      <Bookmark
                        className={`w-5 h-5 sm:w-7 sm:h-7 transition-all ${isSaved ? "text-white fill-white" : "text-white"
                          }`}
                      />
                    </div>
                    <span className="text-white text-[10px] sm:text-xs font-bold drop-shadow-lg">
                      {Math.max(0, item.savesCount ?? 0)}
                    </span>
                  </button>

                  {/* Comments */}
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                      <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <span className="text-white text-[10px] sm:text-xs font-bold drop-shadow-lg">
                      {item.commentsCount ?? 0}
                    </span>
                  </button>

                  {/* Share */}
                  <button className="flex flex-col items-center gap-1 group">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                      <Share2 className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <span className="text-white text-[10px] sm:text-xs font-bold drop-shadow-lg">Share</span>
                  </button>
                </>
              )}

              {/* Delete Button - shown in Published Reels feed view */}
              {onDelete && (
                <button
                  onClick={() => onDelete(item)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="relative">
                    {/* Ring Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />

                    {/* Main Button Body - Glassmorphism */}
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-red-500/50 group-hover:bg-red-500/10 group-active:scale-95 shadow-2xl">
                      {/* Hover background slide */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-red-400 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                      {/* Icon */}
                      <Trash2 className="relative z-10 w-5 h-5 sm:w-7 sm:h-7 text-red-500 group-hover:text-white transition-all duration-300 group-hover:rotate-12" />

                      {/* Glint effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                    </div>
                  </div>

                  <span className="text-red-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:text-red-400 transition-colors duration-300">
                    Delete
                  </span>
                </button>
              )}
            </div>

            {/* Bottom Content Area - Medium Proportions */}
            <div className="absolute left-0 right-20 sm:right-32 bottom-24 md:bottom-28 lg:bottom-32 px-5 md:px-8 lg:px-12 z-40 max-w-2xl">
              {/* Subtle background shadow for text readability */}
              {(!hideProfile || !hideDescription) && (
                <div className="absolute inset-x-0 -bottom-10 h-80 bg-gradient-to-t from-black/70 via-black/20 to-transparent -z-10 pointer-events-none" />
              )}
              {!hideProfile && (
                <div className="flex items-center gap-4 sm:gap-7 mb-7 sm:mb-10 group/profile">
                  {/* Circular Avatar - Scaling for all views */}
                  <div className="relative shrink-0">
                    <div className="
                    w-14 h-14 
                    md:w-20 md:h-20 
                    lg:w-24 lg:h-24 
                    rounded-full border-[3px] border-primary/40 p-1 
                    group-hover/profile:border-primary transition-all duration-500 shadow-2xl
                  ">
                      <img
                        className="w-full h-full rounded-full object-cover border-2 border-white"
                        src={
                          item.user?.avatar ||
                          item.avatar ||
                          "https://plus.unsplash.com/premium_photo-1681493353999-a3eea8b95e1d?w=100&h=100&fit=crop"
                        }
                        alt={item.user?.name || item.author || "Food Partner"}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 md:gap-3">
                        <h2 className="text-white font-['Playfair_Display'] font-black text-xl md:text-2xl lg:text-3xl tracking-normal drop-shadow-md">
                          {(item.user?.name || item.author || "Food Partner").replace(/^GP-/i, '')}
                        </h2>
                        {/* Orange Verified Badge - Medium Scale */}
                        <div className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-4.5 text-white">
                            <path d="M1 4.5L4 7.5L11 1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>

                      {/* Professional Tag Line - Medium font size */}
                      <div className="flex items-center gap-2 text-white/95">
                        <ChefHat className="w-3.5 h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary drop-shadow-sm" />
                        <span className="text-[11px] md:text-base lg:text-xl font-medium tracking-tight drop-shadow-sm font-['Poppins']">
                          Professional Chef & Food Partner
                        </span>
                      </div>
                    </div>

                    {/* Solid Follow Button - Medium Proportions */}
                    {authInfo.currentPartnerId !== (item.foodPartner?._id || item.foodPartner) && (
                      <button
                        onClick={() => onFollow?.(item)}
                        className={`
                        flex items-center gap-2.5 px-6 py-2 md:px-10 md:py-3 lg:px-12 lg:py-4
                        ${item.isFollowing ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-primary shadow-[0_8px_20px_rgba(249,115,22,0.4)]'} 
                        rounded-full transition-all duration-300 active:scale-95 group/btn w-max
                      `}
                      >
                        <UserPlus className="w-3.5 h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                        <span className="text-white text-xs md:text-lg lg:text-xl font-bold tracking-wide">
                          {item.isFollowing ? "Following" : "Follow"}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {!hideDescription && (
                <p className="text-white/95 text-xs sm:text-sm md:text-lg lg:text-xl font-medium italic leading-snug tracking-wide max-w-xl md:max-w-2xl border-l-2 border-primary/50 pl-4 py-1.5 mb-6 md:mb-8 drop-shadow-md line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* Visit Store Action - Elegant Scale */}
              {item.foodPartner && !hideStoreButton && (
                <div className="w-max">
                  <Link
                    to={
                      authInfo.isFoodPartner && (item.foodPartner?._id || item.foodPartner) === authInfo.currentPartnerId
                        ? "/create-food"
                        : "/food-partner/" + (item.foodPartner?._id || item.foodPartner)
                    }
                    className="group relative flex items-center justify-center gap-3
                      px-6 py-2.5 sm:px-8 sm:py-3
                      rounded-lg sm:rounded-xl
                      bg-white/5 backdrop-blur-2xl
                      border border-white/10
                      text-white text-[10px] sm:text-xs font-black uppercase tracking-[3px]
                      shadow-2xl
                      hover:bg-primary hover:border-primary
                      hover:scale-[1.02] active:scale-95
                      transition-all duration-500 ease-out
                      overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />

                    <div className="relative flex items-center gap-3">
                      {authInfo.isFoodPartner && (item.foodPartner?._id || item.foodPartner) === authInfo.currentPartnerId ? (
                        <>
                          <Plus className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                          <span className="drop-shadow-lg whitespace-nowrap">Create Dish</span>
                        </>
                      ) : (
                        <>
                          <Utensils className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                          <span className="drop-shadow-lg whitespace-nowrap">Visit Store</span>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ReelFeed;
