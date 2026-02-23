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
                  className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter drop-shadow-2xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
                >
                  CraveScroll
                </h1>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-3 sm:right-6 bottom-40 sm:top-1/2 sm:-translate-y-1/2 flex flex-col items-center gap-5 sm:gap-7 z-30">
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
            </div>

            {/* Bottom Content Area */}
            <div className="absolute left-0 right-20 sm:right-32 bottom-32 sm:bottom-40 px-5 sm:px-12 z-30 max-w-2xl">
              {/* Profile Row */}
              <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-8">
                <div className="relative group/avatar">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-orange-400 rounded-2xl blur opacity-30 group-hover/avatar:opacity-60 transition duration-500" />
                  <div className="relative w-11 h-11 sm:w-16 sm:h-16 rounded-2xl p-0.5 bg-black border border-white/10">
                    <img
                      className="w-full h-full rounded-2xl object-cover"
                      src={
                        item.user?.avatar ||
                        item.avatar ||
                        "https://plus.unsplash.com/premium_photo-1681493353999-a3eea8b95e1d?w=100&h=100&fit=crop"
                      }
                      alt={item.user?.name || item.author || "Food Partner"}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-base sm:text-2xl tracking-tight drop-shadow-xl">
                    {item.user?.name || item.author || "Food Partner"}
                  </span>
                  {authInfo.currentPartnerId !== (item.foodPartner?._id || item.foodPartner) && (
                    <button
                      onClick={() => onFollow?.(item)}
                      className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-[2px] text-left hover:text-white transition-all transform hover:translate-x-1"
                    >
                      {item.isFollowing ? "Following" : "Follow +"}
                    </button>
                  )}
                </div>
              </div>

              {/* Description */}
              <p
                className="
                    text-white/90
                    text-base sm:text-2xl
                    font-medium
                    leading-relaxed
                    tracking-wide
                    mb-6
                    line-clamp-2
                    drop-shadow-2xl
                    sm:max-w-xl
                "
              >
                {item.description}
              </p>

              {/* Visit Store / Create Food */}
              {item.foodPartner && !hideStoreButton && (
                <div className="w-full sm:w-auto flex justify-start">
                  <Link
                    to={
                      authInfo.isFoodPartner && (item.foodPartner?._id || item.foodPartner) === authInfo.currentPartnerId
                        ? "/create-food"
                        : "/food-partner/" + (item.foodPartner?._id || item.foodPartner)
                    }
                    className="group relative flex items-center justify-center gap-2 sm:gap-4
                      px-6 py-3.5 sm:px-12 sm:py-5
                      rounded-xl sm:rounded-2xl
                      bg-white/5 backdrop-blur-3xl
                      border border-white/10
                      text-white text-[11px] sm:text-base font-black uppercase tracking-[3px]
                      shadow-2xl
                      hover:bg-primary hover:border-primary
                      hover:scale-[1.02] active:scale-95
                      transition-all duration-500 ease-out
                      overflow-hidden w-full sm:w-max"
                  >
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />

                    <div className="relative flex items-center gap-2 sm:gap-4">
                      {authInfo.isFoodPartner && (item.foodPartner?._id || item.foodPartner) === authInfo.currentPartnerId ? (
                        <Plus className="w-4 h-4 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-700" />
                      ) : (
                        <Utensils className="w-4 h-4 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                      )}
                      <span className="drop-shadow-lg whitespace-nowrap">
                        {authInfo.isFoodPartner && (item.foodPartner?._id || item.foodPartner) === authInfo.currentPartnerId
                          ? "Create Food"
                          : "Visit Store"}
                      </span>
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
