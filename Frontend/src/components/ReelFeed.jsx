import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Heart,
  Bookmark,
  MessageCircle,
  Play,
  Share2,
} from "lucide-react";

const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  onFollow,
  emptyMessage = "No videos yet.",
}) => {
  const videoRefs = useRef(new Map());
  const [playingStates, setPlayingStates] = useState({});
  const [likedItems, setLikedItems] = useState({});
  const [savedItems, setSavedItems] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          const id = video.dataset.id;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {});
            setPlayingStates((prev) => ({ ...prev, [id]: true }));
          } else {
            video.pause();
            setPlayingStates((prev) => ({ ...prev, [id]: false }));
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  const togglePlay = (id) => {
    const video = videoRefs.current.get(id);
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPlayingStates((prev) => ({ ...prev, [id]: true }));
    } else {
      video.pause();
      setPlayingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleLike = (item) => {
    setLikedItems((prev) => ({ ...prev, [item._id]: !prev[item._id] }));
    onLike?.(item);
  };

  const handleSave = (item) => {
    setSavedItems((prev) => ({ ...prev, [item._id]: !prev[item._id] }));
    onSave?.(item);
  };

  if (items.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="text-center px-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
            <ChefHat className="w-10 h-10 text-primary" />
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
        const isLiked = likedItems[item._id];
        const isSaved = savedItems[item._id];

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
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                !isPlaying ? "opacity-100" : "opacity-0"
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
            <div className="absolute top-0 left-0 right-0 p-4 z-10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-float shadow-lg shadow-primary/40">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <h1
                  className="text-4xl text-primary drop-shadow-lg"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
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
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isLiked
                      ? "bg-red-500 scale-110"
                      : "bg-white/10 backdrop-blur-md hover:bg-white/20"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      isLiked ? "text-white fill-white" : "text-white"
                    }`}
                  />
                </div>
                <span className="text-white text-[11px] font-semibold leading-tight">
                  {item.likeCount ?? 0}
                </span>
              </button>

              {/* Save */}
              <button
                onClick={() => handleSave(item)}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSaved
                      ? "bg-primary scale-110"
                      : "bg-white/10 backdrop-blur-md hover:bg-white/20"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 transition-all ${
                      isSaved ? "text-white fill-white" : "text-white"
                    }`}
                  />
                </div>
                <span className="text-white text-[11px] font-semibold leading-tight">
                  {item.savesCount ?? 0}
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
            <div className="absolute left-0 right-0 bottom-24 px-4 z-10">
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
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    item.isFollowing
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
  text-lg sm:text-xl
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

              {/* Visit Store */}
              {item.foodPartner && (
                <div className="w-full flex justify-center">
                  <Link
                    to={"/food-partner/" + item.foodPartner}
                    className="flex items-center justify-center gap-2
        w-auto
        px-5 py-2.5
        rounded-lg
        bg-primary
        text-white text-sm font-semibold
        shadow-md shadow-black/40
        hover:bg-primary/90
        transition-all duration-300"
                  >
                    <span className="text-base">🍽️</span>
                    Visit store
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
