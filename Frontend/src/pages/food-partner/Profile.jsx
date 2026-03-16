import React, { useState, useEffect, useRef } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserPlus, Mail, ChefHat, Users, BookOpen, CheckCircle } from 'lucide-react'
import Logo from '../../components/Logo'
import API_BASE_URL from '../../config/api'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followersCount, setFollowersCount] = useState(0)
    const videoRefs = useRef({})

    useEffect(() => {
        setLoading(true)
        axios.get(`${API_BASE_URL}/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems || [])
                setIsFollowing(response.data.foodPartner.isFollowing || false)
                setFollowersCount(response.data.foodPartner.followersCount || 0)
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

    const handleFollowClick = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/food/follow`,
                { partnerId: id },
                { withCredentials: true }
            );
            setIsFollowing(response.data.isFollowing);
            setFollowersCount(response.data.followersCount);
        } catch (error) {
            console.error('Error in follow follow:', error);
        }
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
    const rawName = profile?.businessName || profile?.contactName || "Food Partner"
    const displayName = rawName.replace(/^GP-/i, '')
    const bio = profile?.bio || profile?.description || "Hi, I like to think of my cooking as expressions of love for my family and friends, especially when it's healthy food!"

    return (
        <div className="profile-page-container">
            {/* Background Decorative Elements - Only visible on laptop screens */}
            <div className="bg-decorations">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>

                <div className="floating-food food-1">🍕</div>
                <div className="floating-food food-2">🍔</div>
                <div className="floating-food food-3">🍜</div>
                <div className="floating-food food-4">🍣</div>
                <div className="floating-food food-5">🥑</div>
                <div className="floating-food food-6">🍰</div>
                <div className="floating-food food-7">🍩</div>
                <div className="floating-food food-8">🌮</div>
                <div className="floating-food food-9">🥗</div>
                <div className="floating-food food-10">🥞</div>
                <div className="floating-food food-11">🍦</div>
                <div className="floating-food food-12">🍟</div>
                <div className="floating-food food-13">🥐</div>
                <div className="floating-food food-14">🥓</div>
                <div className="floating-food food-15">🍳</div>
                <div className="floating-food food-16">🥨</div>
                <div className="floating-food food-17">🧀</div>
                <div className="floating-food food-18">🍖</div>
            </div>

            <header className="profile-page-header outdoor-header">
                <div className="flex items-center justify-center p-2 mb-2 lg:mb-0">
                    <Logo size={40} className="drop-shadow-lg" />
                </div>
                <h1 className="cravescroll-heading">cravescroll</h1>
            </header>

            <main className="profile-page">
                <div className="profile-banner">
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop"
                        alt="Profile Banner"
                        className="banner-image"
                    />
                    <div className="banner-overlay"></div>
                </div>

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
                            <div className="name-wrapper">
                                <h1 className="profile-name">{displayName}</h1>
                                <CheckCircle className="verified-icon" size={20} fill="#f97316" color="white" />
                            </div>
                            <p className="profile-subtitle">
                                <ChefHat size={14} className="subtitle-icon-lucide" />
                                Professional Chef & Food Partner
                            </p>

                            <div className="profile-actions">
                                <button
                                    className={`btn-follow-premium ${isFollowing ? 'btn-following' : ''} group overflow-hidden`}
                                    onClick={handleFollowClick}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                                    <div className="relative flex items-center gap-2">
                                        <UserPlus size={16} />
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </div>
                                </button>
                                <button
                                    className="btn-contact-premium"
                                    onClick={handleContactClick}
                                >
                                    <Mail size={16} />
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="profile-bio-container">
                        <p className="profile-bio">
                            {bio}
                        </p>
                    </div>

                    <div className="profile-stats-row-premium" role="list" aria-label="Stats">
                        <div className="profile-stat-item-premium" role="listitem">
                            <div className="stat-icon-wrapper recipes-bg">
                                <BookOpen size={18} />
                            </div>
                            <div className="stat-info">
                                <span className="profile-stat-number">{profile?.totalMeals || videos.length || 7}</span>
                                <span className="profile-stat-text">Recipes</span>
                            </div>
                        </div>
                        <div className="profile-stat-item-premium" role="listitem">
                            <div className="stat-icon-wrapper followers-bg">
                                <Users size={18} />
                            </div>
                            <div className="stat-info">
                                <span className="profile-stat-number">
                                    {followersCount >= 1000
                                        ? `${(followersCount / 1000).toFixed(1)}K`
                                        : followersCount
                                    }
                                </span>
                                <span className="profile-stat-text">Followers</span>
                            </div>
                        </div>
                        <div className="profile-stat-item-premium" role="listitem">
                            <div className="stat-icon-wrapper following-bg">
                                <UserPlus size={18} />
                            </div>
                            <div className="stat-info">
                                <span className="profile-stat-number">{profile?.following?.length || 0}</span>
                                <span className="profile-stat-text">Following</span>
                            </div>
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
        </div>
    )
}

export default Profile