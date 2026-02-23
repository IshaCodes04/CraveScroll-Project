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
  authInfo,
}) => {
  const [playingStates, setPlayingStates] = useState({});
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
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center px-8">
          <div className="flex justify-center mb-6">
            <Logo size={80} className="drop-shadow-lg" />
          </div>
          <p className="text-white/60 text-lg">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
      {items.map((item) => {
        const isPlaying = playingStates[item._id];
        // Use prop value if available, otherwise use local state
        const isLiked = item.isLiked !== undefined ? item.isLiked : likedItems[item._id] || false;
        const isSaved = item.isSaved !== undefined ? item.isSaved : savedItems[item._id] || false;

        return (
          <section
            key={item._id}
            className="h-screen w-full snap-start snap-always relative"
          >
            {/* Video */}
            <video
              ref={setVideoRef(item._id)}
              data-id={item._id}
              className="absolute inset-0 w-full h-full object-cover"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
              onClick={() => togglePlay(item._id)}
            />

            {/* Play Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${!isPlaying ? "opacity-100" : "opacity-0"
                }`}
              onClick={() => togglePlay(item._id)}
            >
              <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
              </div>
            </div>

            {/* Top Gradient */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

            {/* Header with CraveScroll */}
            <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 z-10 select-none">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center justify-center animate-float">
                  <Logo size={24} className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" />
                </div>
                <h1
                  className="text-xl sm:text-3xl lg:text-4xl font-extrabold drop-shadow-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
                >
                  CraveScroll
                </h1>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10">
              {/* Like */}
              <button
                onClick={() => handleLike(item)}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isLiked
                    ? "bg-red-500 scale-110 shadow-lg shadow-red-500/50"
                    : "bg-white/10 backdrop-blur-md hover:bg-white/20"
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${isLiked ? "text-white fill-white" : "text-white"
                      }`}
                  />
                </div>
                <span className="text-white text-[11px] font-semibold leading-tight">
                  {Math.max(0, item.likeCount ?? 0)}
                </span>
              </button>

              {/* Save */}
              <button
                onClick={() => handleSave(item)}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isSaved
                    ? "bg-primary scale-110"
                    : "bg-white/10 backdrop-blur-md hover:bg-white/20"
                    }`}
                >
                  <Bookmark
                    className={`w-5 h-5 transition-all ${isSaved ? "text-white fill-white" : "text-white"
                      }`}
                  />
                </div>
                <span className="text-white text-[11px] font-semibold leading-tight">
                  {Math.max(0, item.savesCount ?? 0)}
                </span>
              </button>

              {/* Comments */}
              <button className="flex flex-col items-center gap-1.5">
                <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-[11px] font-semibold leading-tight">
                  {item.commentsCount ?? 0}
                </span>
              </button>

              {/* Share */}
              <button className="flex flex-col items-center gap-1.5">
                <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-[11px] font-semibold leading-tight">Share</span>
              </button>
            </div>

            {/* Bottom Content */}
            <div className="absolute left-0 right-0 bottom-20 sm:bottom-24 px-4 z-10">
              {/* Profile Row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-primary to-orange-400">
                  <img
                    className="w-full h-full rounded-full object-cover border-2 border-black"
                    src={
                      item.user?.avatar ||
                      item.avatar ||
                      "https://plus.unsplash.com/premium_photo-1681493353999-a3eea8b95e1d?q=80&w=687&auto=format&fit=crop"
                    }
                    alt={item.user?.name || item.author || "Food Partner"}
                  />
                </div>
                <span className="text-white font-semibold text-base">
                  {item.user?.name || item.author || "Food Partner"}
                </span>
                <button
                  onClick={() => onFollow?.(item)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${item.isFollowing
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-primary text-white hover:bg-primary/90"
                    }`}
                >
                  {item.isFollowing ? "Following" : "Follow"}
                </button>
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
              {item.foodPartner && (
                <div className="w-full flex justify-center">
                  <Link
                    to={
                      authInfo.isFoodPartner && (item.foodPartner?._id || item.foodPartner) === authInfo.currentPartnerId
                        ? "/create-food"
                        : "/food-partner/" + (item.foodPartner?._id || item.foodPartner)
                    }
                    className="group relative flex items-center justify-center gap-2 sm:gap-2.5
                      w-auto px-6 py-2.5 sm:px-8 sm:py-3.5
                      rounded-full
                      bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700
                      text-white text-sm sm:text-base font-bold
                      shadow-[0_0_20px_rgba(249,115,22,0.4)]
                      hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]
                      hover:scale-105 active:scale-95
                      transition-all duration-300 ease-out
                      overflow-hidden"
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />

                    <div className="relative flex items-center gap-1.5 sm:gap-2">
                      {authInfo.isFoodPartner && (item.foodPartner?._id || item.foodPartner) === authInfo.currentPartnerId ? (
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                      ) : (
                        <Utensils className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                      )}
                      <span className="tracking-wide">
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
