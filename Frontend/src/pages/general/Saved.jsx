import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'
import API_BASE_URL from '../../config/api'

const Saved = () => {
    const [videos, setVideos] = useState([])
    const navigate = useNavigate()

    const [authInfo, setAuthInfo] = useState({
        isUser: false,
        isFoodPartner: false,
        currentPartnerId: null
    })

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/food/save`, { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods
                    .filter(item => item.food !== null)
                    .map((item) => ({
                        _id: item.food._id,
                        video: item.food.video,
                        description: item.food.description,
                        likeCount: Math.max(0, item.food.likeCount ?? 0),
                        savesCount: Math.max(0, item.food.savesCount ?? 0),
                        commentsCount: item.food.commentsCount,
                        foodPartner: item.food.foodPartner,
                        user: {
                            name: (item.food.foodPartner?.businessName || item.food.foodPartner?.contactName || "Food Partner").replace(/^GP-/i, ''),
                            avatar: item.food.foodPartner?.avatar
                        },
                        isSaved: true,
                        isLiked: item.food.isLiked || false,
                        isFollowing: item.food.isFollowing || false,
                    }))
                setVideos(savedFoods)
            })
            .catch(error => {
                console.error("Error fetching saved videos:", error);
                if (error.response?.status === 401) {
                    navigate("/user/login");
                } else {
                    setVideos([]);
                }
            })
    }, [navigate])

    const removeSaved = async (item) => {
        try {
            await axios.post(`${API_BASE_URL}/api/food/save`, { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.filter(v => v._id !== item._id));
        } catch (error) {
            console.error("Error removing saved status:", error);
            if (error.response?.status === 401) {
                navigate("/user/login");
            }
        }
    }

    const likeVideo = async (item) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/food/like`,
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
            console.error("Error liking video:", error);
            if (error.response?.status === 401) {
                navigate("/user/login");
            }
        }
    };

    const followPartner = async (item) => {
        try {
            const partnerId = item.foodPartner?._id || item.foodPartner;
            const response = await axios.post(
                `${API_BASE_URL}/api/food/follow`,
                { partnerId },
                { withCredentials: true }
            );

            setVideos((prev) =>
                prev.map((v) => {
                    const currentPartnerId = v.foodPartner?._id || v.foodPartner;
                    if (currentPartnerId === partnerId) {
                        return {
                            ...v,
                            isFollowing: response.data.isFollowing,
                        };
                    }
                    return v;
                })
            );
        } catch (error) {
            console.error("Error following partner:", error);
            if (error.response?.status === 401) navigate("/user/login");
        }
    };

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={removeSaved}
            onFollow={followPartner}
            emptyMessage="No saved videos yet."
            authInfo={authInfo}
        />
    )
}

export default Saved