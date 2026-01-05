import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
    }, [ id ])


    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-top-section">
                    <img className="profile-avatar" src="https://plus.unsplash.com/premium_photo-1681493353999-a3eea8b95e1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

                    <div className="profile-header-info">
                        <h1 className="profile-name">{profile?.contactName || profile?.businessName}</h1>
                        <p className="profile-subtitle">Food lover & Influencer</p>
                        
                        <div className="profile-actions">
                            <button className="btn-follow">Follow</button>
                            <button className="btn-contact">Contact</button>
                        </div>
                    </div>
                </div>

                <p className="profile-bio">
                    Hi, I like to think of my cooking as expressions of love for my family and friends, especially when it's healthy food!
                </p>

                <div className="profile-stats-row" role="list" aria-label="Stats">
                    <div className="profile-stat-item" role="listitem">
                        <span className="profile-stat-number">{profile?.totalMeals || 7}</span>
                        <span className="profile-stat-text">Recipes</span>
                    </div>
                    <div className="profile-stat-item" role="listitem">
                        <span className="profile-stat-number">{profile?.customersServed ? `${(profile.customersServed / 1000).toFixed(1)}K` : '50K'}</span>
                        <span className="profile-stat-text">Followers</span>
                    </div>
                    <div className="profile-stat-item" role="listitem">
                        <span className="profile-stat-number">100</span>
                        <span className="profile-stat-text">Following</span>
                    </div>
                </div>
            </section>

            <section className="profile-grid" aria-label="Videos">
                {videos.map((v) => (
                    <div key={v.id} className="profile-grid-item">
                        <video
                            className="profile-grid-video"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src={v.video} 
                            muted>
                        </video>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Profile