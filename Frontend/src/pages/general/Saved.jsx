import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [ videos, setVideos ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                // 💡 Fix applied: .filter() function added to remove items where 'food' is null
                const savedFoods = response.data.savedFoods
                    .filter(item => item.food !== null) // <-- Only process items with a valid food object
                    .map((item) => ({
                        _id: item.food._id,
                        video: item.food.video,
                        description: item.food.description,
                        likeCount: Math.max(0, item.food.likeCount ?? 0),
                        savesCount: Math.max(0, item.food.savesCount ?? 0),
                        commentsCount: item.food.commentsCount,
                        foodPartner: item.food.foodPartner,
                        isSaved: true, // All items in saved page are saved
                        isLiked: item.food.isLiked || false, // Use backend-provided status
                    }))
                setVideos(savedFoods)
            })
            // Better practice to handle errors
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
            const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
            
            // Optimistically update the UI by filtering out the removed item
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
                "http://localhost:3000/api/food/like",
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

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved