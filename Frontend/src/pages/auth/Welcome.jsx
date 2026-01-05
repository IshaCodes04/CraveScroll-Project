import React from 'react'
import { useNavigate } from 'react-router-dom'
import bgVideo from '../../assets/6645705-hd_1920_1080_30fps.mp4'

const Welcome = () => {
  const navigate = useNavigate()

  const styles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '32px 20px',
      paddingLeft: '3.5%',
      position: 'relative',
      overflow: 'hidden',
      color: '#fff',
    },
    // video sits behind everything
    video: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0,
      pointerEvents: 'none',
    },

    root: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      // removed backgroundImage to use video instead
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      color: '#fff',
    },
    overlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 100%)',
      zIndex: 1,
    },
    content: {
      position: 'relative',
      width: '100%',
      maxWidth: 420,
      padding: '36px 24px',
      textAlign: 'center',
      zIndex: 2,
      marginBottom: 32,
    },
    title: { fontSize: 30, fontWeight: 800, margin: 0 },
    subtitle: { fontSize: 14, marginTop: 8, marginBottom: 20, opacity: 0.95 },
    dots: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 },
    dot: (active) => ({ width: active ? 10 : 6, height: active ? 10 : 6, borderRadius: 10, background: active ? '#ff6a2b' : 'rgba(255,255,255,0.45)' }),
    button: { display: 'block', width: '100%', background: '#ff6a2b', color: '#fff', padding: '12px 18px', borderRadius: 26, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 16 }
  }

  return (
    <div style={styles.root} role="region" aria-label="Welcome to FoodReels">
      {/* background video */}
      <video
        style={styles.video}
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div style={styles.overlay} aria-hidden="true" />
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to FoodReels</h1>
        <p style={styles.subtitle}>Scroll your all favourite foods which are so delicious😋😋</p>

        <div style={styles.dots} aria-hidden="true">
          <div style={styles.dot(true)} />
          <div style={styles.dot(false)} />
          <div style={styles.dot(false)} />
        </div>

        <button style={styles.button} onClick={() => navigate('/register')} aria-label="Get started">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Welcome