import React, { useState, useEffect, useRef } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../components/Logo'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const videoRefs = useRef({})

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems || [])
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching profile:', error)
                setLoading(false)
            })
    }, [id])

    const handleVideoHover = (videoId, isHovering) => {
        const video = videoRefs.current[videoId]
        if (video) {
            if (isHovering) {
                video.play().catch(err => console.log('Video play error:', err))
            } else {
                video.pause()
                video.currentTime = 0
            }
        }
    }

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing)
        // TODO: Add API call to follow/unfollow
    }

    const handleContactClick = () => {
        // TODO: Add contact functionality
        console.log('Contact clicked')
    }

    if (loading) {
        return (
            <main className="profile-page">
                <div className="profile-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading profile...</p>
                </div>
            </main>
        )
    }

    const profileImage = profile?.avatar || profile?.profileImage || "https://plus.unsplash.com/premium_photo-1681493353999-a3eea8b95e1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const displayName = profile?.contactName || profile?.businessName || "Food Partner"
    const bio = profile?.bio || profile?.description || "Hi, I like to think of my cooking as expressions of love for my family and friends, especially when it's healthy food!"

    return (
        <main className="profile-page">
            <header className="profile-page-header">
                <div className="flex items-center justify-center p-2 mb-2 lg:mb-0">
                    <Logo size={40} className="drop-shadow-md" />
                </div>
                <h1 className="cravescroll-heading">cravescroll</h1>
            </header>
            <section className="profile-header">
                <div className="profile-top-section">
                    <div className="profile-avatar-wrapper">
                        <img
                            className="profile-avatar"
                            src={profileImage}
                            alt={displayName}
                            loading="lazy"
                        />
                        <div className="profile-avatar-ring"></div>
                    </div>

                    <div className="profile-header-info">
                        <h1 className="profile-name">{displayName}</h1>
                        <p className="profile-subtitle">
                            <span className="subtitle-icon">🍽️</span>
                            Food lover & Influencer
                        </p>

                        <div className="profile-actions">
                            <button
                                className={`btn-follow ${isFollowing ? 'btn-following' : ''}`}
                                onClick={handleFollowClick}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                            <button
                                className="btn-contact"
                                onClick={handleContactClick}
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                </div>

                <p className="profile-bio">
                    {bio}
                </p>

                <div className="profile-stats-row" role="list" aria-label="Stats">
                    <div className="profile-stat-item" role="listitem">
                        <span className="profile-stat-number">{profile?.totalMeals || videos.length || 7}</span>
                        <span className="profile-stat-text">Recipes</span>
                    </div>
                    <div className="profile-stat-item" role="listitem">
                        <span className="profile-stat-number">
                            {profile?.customersServed
                                ? profile.customersServed >= 1000
                                    ? `${(profile.customersServed / 1000).toFixed(1)}K`
                                    : profile.customersServed
                                : '50K'
                            }
                        </span>
                        <span className="profile-stat-text">Followers</span>
                    </div>
                    <div className="profile-stat-item" role="listitem">
                        <span className="profile-stat-number">100</span>
                        <span className="profile-stat-text">Following</span>
                    </div>
                </div>
            </section>

            <section className="profile-grid" aria-label="Food Reels">
                {videos.length > 0 ? (
                    videos.map((v) => (
                        <div
                            key={v.id || v._id}
                            className="profile-grid-item"
                            onMouseEnter={() => handleVideoHover(v.id || v._id, true)}
                            onMouseLeave={() => handleVideoHover(v.id || v._id, false)}
                        >
                            <video
                                ref={el => videoRefs.current[v.id || v._id] = el}
                                className="profile-grid-video"
                                src={v.video || v.videoUrl}
                                muted
                                loop
                                playsInline
                            >
                            </video>
                            <div className="video-overlay">
                                <div className="play-icon">▶</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="profile-empty-state">
                        <div className="empty-state-icon">📹</div>
                        <p>No food reels yet</p>
                        <span>Check back soon for delicious content!</span>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Profile