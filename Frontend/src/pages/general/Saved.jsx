import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

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
                        likeCount: item.food.likeCount,
                        savesCount: item.food.savesCount,
                        commentsCount: item.food.commentsCount,
                        foodPartner: item.food.foodPartner,
                    }))
                setVideos(savedFoods)
            })
            // Better practice to handle errors
            .catch(error => { 
                console.error("Error fetching saved videos:", error);
                // Optionally set videos to empty array
                setVideos([]);
            })
    }, [])

    const removeSaved = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
            
            // Optimistically update the UI by filtering out the removed item
            setVideos((prev) => prev.filter(v => v._id !== item._id)); 
            
            // Note: If you only want to decrease savesCount, use map:
            /*
            setVideos((prev) => prev.map((v) => 
                v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v
            ))
            */
        } catch (error) {
             console.error("Error removing saved status:", error);
        }
    }

    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved