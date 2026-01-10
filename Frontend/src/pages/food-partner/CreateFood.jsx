import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Upload, Film, Sparkles, Eye, Heart, Play } from 'lucide-react';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // Add floating animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (!videoFile) {
      setVideoURL('');
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) { setVideoFile(null); setFileError(''); return; }
    if (!file.type.startsWith('video/')) { setFileError('Please select a valid video file.'); return; }
    setFileError('');
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) { setFileError('Please drop a valid video file.'); return; }
    setFileError('');
    setVideoFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append("foodreels", videoFile);

    try {
      const response = await axios.post("http://localhost:3000/api/food", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error('Upload error:', error);
      setFileError(error.response?.data?.message || 'Failed to upload video. Please try again.');
    }
  };

  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
        poster="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
      >
        <source src="https://videos.pexels.com/video-files/3297379/3297379-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.6), rgba(0,0,0,0.85))',
        zIndex: 1
      }} />

      {/* Left Side - Branding (Hidden on mobile, visible on lg) */}
      <div style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '48px 48px',
        paddingTop: '64px',
        position: 'relative',
        zIndex: 2,
        display: window.innerWidth < 1024 ? 'none' : 'flex'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '360px' }}>
          {/* Chef Hat Icon - Floating */}
          <div style={{
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'center',
            animation: 'float 3s ease-in-out infinite'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3)'
            }}>
              <ChefHat className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Logo */}
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '12px',
            background: 'linear-gradient(to right, rgb(251, 146, 60), rgb(249, 115, 22), rgb(234, 88, 12))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            CraveScroll
          </h1>

          {/* Feature Box */}
          <div style={{
            background: 'rgba(249, 115, 22, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '32px',
            border: '1px solid rgba(249, 115, 22, 0.3)'
          }}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '13px',
              lineHeight: '1.6',
              margin: 0
            }}>
              ✨ <span style={{ fontWeight: '600' }}>Create Stunning Food Reels</span> - Share recipes & inspire millions of food lovers worldwide
            </p>
          </div>

          {/* Quotes Carousel */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '15px',
              fontStyle: 'italic',
              margin: 0,
              lineHeight: '1.6'
            }}>
              "Every dish tells a story. Let yours go viral."
            </p>
            <p style={{
              color: '#F97316',
              fontSize: '13px',
              marginTop: '12px',
              marginBottom: 0,
              fontWeight: '500'
            }}>
              — Turn your passion into a career
            </p>
          </div>

          {/* Why Join Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12px',
              margin: '0 0 12px 0',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: "'Poppins', sans-serif"
            }}>Why Join Us</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#F97316' }}>🎬</span> <span><span style={{ fontWeight: '600' }}>Create Reels</span> - Share mouth-watering food content</span>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#F97316' }}>📈</span> <span><span style={{ fontWeight: '600' }}>Grow Audience</span> - Reach millions of food enthusiasts</span>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#F97316' }}>👥</span> <span><span style={{ fontWeight: '600' }}>Build Community</span> - Connect with fellow creators</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Card */}
      <div style={{
        flex: window.innerWidth < 1024 ? 0 : 1,
        width: window.innerWidth < 1024 ? '100%' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Glassmorphic Card */}
        <div style={{
          width: '100%',
          maxWidth: '480px',
          padding: '32px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxHeight: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <style>{`::-webkit-scrollbar { display: none; }`}</style>
          {/* Mobile Logo */}
          <div style={{ display: 'none', textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#F97316',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 style={{
              fontSize: '32px',
              color: '#F97316',
              fontFamily: "'Great Vibes', cursive",
              margin: 0
            }}>
              CraveScroll
            </h1>
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 8px 0',
              fontFamily: "'Poppins', sans-serif"
            }}>Create Food Reel</h2>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              margin: 0,
              fontFamily: "'Poppins', sans-serif"
            }}>Upload your culinary masterpiece</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Video Upload */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '11px',
                fontWeight: '600',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: "'Poppins', sans-serif"
              }}>Food Video</label>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={onFileChange}
                style={{ display: 'none' }}
              />

              {!videoFile && (
                <div
                  onClick={openFileDialog}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  style={{
                    border: isDragging ? '2px solid #F97316' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '32px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: isDragging ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <Upload size={22} color="#F97316" />
                  </div>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: '0 0 4px'
                  }}>
                    <span style={{ color: '#F97316' }}>Click to upload</span> or drag and drop
                  </p>
                  <p style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '12px',
                    margin: 0
                  }}>MP4, WebM, MOV • Up to 100MB</p>
                </div>
              )}

              {fileError && (
                <p style={{
                  color: '#ef4444',
                  fontSize: '13px',
                  marginTop: '8px',
                  margin: '8px 0 0'
                }}>{fileError}</p>
              )}

              {/* File Chip */}
              {videoFile && !videoURL && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(60, 60, 70, 0.6)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  marginTop: '8px'
                }}>
                  <Play size={16} color="#ff6b35" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      color: 'white',
                      fontSize: '13px',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>{videoFile.name}</p>
                    <p style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '11px',
                      margin: 0
                    }}>{(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Preview */}
            {videoURL && (
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.3)'
              }}>
                <video
                  src={videoURL}
                  controls
                  playsInline
                  preload="metadata"
                  style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(60, 60, 70, 0.6)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                    <Film size={14} color="#ff6b35" />
                    <span style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>{videoFile?.name}</span>
                    <span style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '11px'
                    }}>({(videoFile?.size / 1024 / 1024).toFixed(1)} MB)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={openFileDialog}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff6b35',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        padding: '4px 8px'
                      }}
                    >Change</button>
                    <button
                      type="button"
                      onClick={() => { setVideoFile(null); setFileError(''); }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        padding: '4px 8px'
                      }}
                    >Remove</button>
                  </div>
                </div>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '11px',
                fontWeight: '600',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: "'Poppins', sans-serif"
              }}>Dish Name</label>
              <input
                type="text"
                placeholder="e.g., Spicy Paneer Wrap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '11px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#F97316';
                  e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '11px',
                fontWeight: '600',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: "'Poppins', sans-serif"
              }}>Description</label>
              <textarea
                rows={3}
                placeholder="Describe your dish: ingredients, taste, spice level..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '11px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Poppins', sans-serif",
                  resize: 'vertical',
                  minHeight: '80px',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#F97316';
                  e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isDisabled}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: isDisabled ? 'rgba(249, 115, 22, 0.4)' : '#F97316',
                border: 'none',
                borderRadius: '11px',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                marginTop: '8px',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.3s ease',
                boxShadow: isDisabled ? 'none' : '0 10px 40px -10px rgba(249, 115, 22, 0.5)'
              }}
              onMouseEnter={(e) => {
                if (!isDisabled) {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 15px 50px -5px rgba(249, 115, 22, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 10px 40px -10px rgba(249, 115, 22, 0.5)';
                }
              }}
              onMouseDown={(e) => {
                if (!isDisabled) {
                  e.target.style.transform = 'scale(0.98)';
                }
              }}
              onMouseUp={(e) => {
                if (!isDisabled) {
                  e.target.style.transform = 'scale(1.02)';
                }
              }}
            >
              Publish Food Reel
            </button>
          </form>

          {/* Footer Tips */}
          <div style={{
            marginTop: '20px',
            padding: '14px 16px',
            background: 'rgba(249, 115, 22, 0.1)',
            borderRadius: '11px',
            border: '1px solid rgba(249, 115, 22, 0.2)'
          }}>
            <p style={{
              color: '#F97316',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '4px',
              margin: 0,
              fontFamily: "'Poppins', sans-serif"
            }}>💡 Pro Tip</p>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '12px',
              lineHeight: '1.5',
              margin: '4px 0 0',
              fontFamily: "'Poppins', sans-serif"
            }}>
              Short, vibrant reels under 60 seconds get 3x more engagement!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;
