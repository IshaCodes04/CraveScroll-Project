import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const likeVideo = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                likeCount: response.data.like
                  ? Number(v.likeCount || 0) + 1
                  : Number(v.likeCount || 0) - 1,
                isLiked: response.data.like,
              }
            : v
        )
      );
    } catch (error) {
      console.error("Error liking video:", error);
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
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                savesCount: response.data.save
                  ? Number(v.savesCount || 0) + 1
                  : Number(v.savesCount || 0) - 1,
                isSaved: response.data.save,
              }
            : v
        )
      );
    } catch (error) {
      console.error("Error saving video:", error);
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
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No food reels yet. Check back soon!"
    />
  );
};

export default Home;
