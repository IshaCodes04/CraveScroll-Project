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
            <div data-internal-header="true" className="absolute top-0 left-0 right-0 p-4 sm:p-6 z-10 select-none">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center justify-center animate-float">
                  <Logo size={24} className="w-6 h-6 sm:w-10 sm:h-10 drop-shadow-lg" />
                </div>
                <h1
                  className="text-xl sm:text-3xl lg:text-4xl font-extrabold drop-shadow-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
                >
                  CraveScroll
                </h1>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-2 sm:right-4 bottom-32 sm:top-1/2 sm:-translate-y-1/2 flex flex-col items-center gap-3 sm:gap-5 z-10">
              {/* Like */}
              <button
                onClick={() => handleLike(item)}
                className="flex flex-col items-center gap-1 sm:gap-1.5 group"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isLiked
                    ? "bg-red-500 scale-110 shadow-lg shadow-red-500/50"
                    : "bg-white/10 backdrop-blur-md hover:bg-white/20"
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${isLiked ? "text-white fill-white" : "text-white"
                      }`}
                  />
                </div>
                <span className="text-white text-[10px] sm:text-[11px] font-bold drop-shadow-md">
                  {Math.max(0, item.likeCount ?? 0)}
                </span>
              </button>

              {/* Save */}
              <button
                onClick={() => handleSave(item)}
                className="flex flex-col items-center gap-1 sm:gap-1.5 group"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isSaved
                    ? "bg-primary scale-110"
                    : "bg-white/10 backdrop-blur-md hover:bg-white/20"
                    }`}
                >
                  <Bookmark
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${isSaved ? "text-white fill-white" : "text-white"
                      }`}
                  />
                </div>
                <span className="text-white text-[10px] sm:text-[11px] font-bold drop-shadow-md">
                  {Math.max(0, item.savesCount ?? 0)}
                </span>
              </button>

              {/* Comments */}
              <button className="flex flex-col items-center gap-1 sm:gap-1.5 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-white text-[10px] sm:text-[11px] font-bold drop-shadow-md">
                  {item.commentsCount ?? 0}
                </span>
              </button>

              {/* Share */}
              <button className="flex flex-col items-center gap-1 sm:gap-1.5 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-white text-[10px] sm:text-[11px] font-bold drop-shadow-md">Share</span>
              </button>
            </div>

            {/* Bottom Content */}
            <div className="absolute left-0 right-12 sm:right-0 bottom-24 sm:bottom-28 px-4 sm:px-8 z-10 max-w-2xl">
              {/* Profile Row */}
              <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl p-0.5 bg-gradient-to-br from-primary to-orange-400 shadow-lg">
                  <img
                    className="w-full h-full rounded-2xl object-cover border-2 border-black"
                    src={
                      item.user?.avatar ||
                      item.avatar ||
                      "https://plus.unsplash.com/premium_photo-1681493353999-a3eea8b95e1d?w=100&h=100&fit=crop"
                    }
                    alt={item.user?.name || item.author || "Food Partner"}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-sm sm:text-lg tracking-tight">
                    {item.user?.name || item.author || "Food Partner"}
                  </span>
                  <button
                    onClick={() => onFollow?.(item)}
                    className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-wider text-left hover:text-white transition-colors"
                  >
                    {item.isFollowing ? "Following" : "Follow +"}
                  </button>
                </div>
              </div>

              <p
                className="
  text-white
  text-base sm:text-xl
  font-medium
  leading-relaxed
  tracking-wide
  mb-4
  line-clamp-2
  drop-shadow-sm
"
              >
                {item.description}
              </p>

              {/* Visit Store / Create Food */}
              {item.foodPartner && !hideStoreButton && (
                <div className="w-full flex justify-start sm:justify-center mt-2 sm:mt-4">
                  <Link
                    to={
                      authInfo.isFoodPartner && (item.foodPartner?._id || item.foodPartner) === authInfo.currentPartnerId
                        ? "/create-food"
                        : "/food-partner/" + (item.foodPartner?._id || item.foodPartner)
                    }
                    className="group relative flex items-center justify-center gap-2 sm:gap-3
                      px-5 py-3 sm:px-10 sm:py-4
                      rounded-xl sm:rounded-2xl
                      bg-white/10 backdrop-blur-2xl
                      border border-white/20
                      text-white text-[10px] sm:text-sm font-black uppercase tracking-[2px] sm:tracking-[3px]
                      shadow-2xl
                      hover:bg-primary hover:border-primary
                      hover:scale-105 active:scale-95
                      transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                      overflow-hidden w-full sm:w-auto"
                  >
                    {/* Glowing background layer */}
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Professional Shine Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                    <div className="relative flex items-center gap-2 sm:gap-3">
                      {authInfo.isFoodPartner && (item.foodPartner?._id || item.foodPartner) === authInfo.currentPartnerId ? (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-700" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <Utensils className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                      )}
                      <span className="drop-shadow-md whitespace-nowrap">
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
