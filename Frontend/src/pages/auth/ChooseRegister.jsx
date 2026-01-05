import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';
import bgImg from '../../assets/e24b47bd1999756cb0475ab1cf7f3fcc.jpg';

const ChooseRegister = () => {
  const accent = '#ff6a2b'; // warm orange accent

  const styles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '32px 20px',
      paddingLeft: '5%',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.2)',
      zIndex: 0,
    },
    // White themed card
    card: {
      position: 'relative',
      zIndex: 2,
      width: 'min(440px, 90%)',
      margin: 0,
      padding: '32px',
      borderRadius: 12,
      background: '#ffffff',
      color: '#1a1a1a',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      textAlign: 'center',
      border: 'none',
    },
    title: {
      fontSize: 28,
      fontWeight: 700,
      margin: 0,
      color: '#1a1a1a',
    },
    subtitle: {
      marginTop: 8,
      marginBottom: 24,
      color: '#666666',
      fontSize: 15,
    },
    btnPrimary: {
      display: 'block',
      width: '100%',
      padding: '14px 16px',
      borderRadius: 8,
      background: accent,
      color: '#fff',
      fontWeight: 700,
      textDecoration: 'none',
      textAlign: 'center',
      border: 'none',
      boxSizing: 'border-box',
      fontSize: 16,
      transition: 'transform .12s ease, box-shadow .12s ease',
      cursor: 'pointer',
    },
    btnOutline: {
      display: 'block',
      width: '100%',
      padding: '14px 16px',
      borderRadius: 8,
      background: 'transparent',
      color: accent,
      fontWeight: 700,
      textDecoration: 'none',
      textAlign: 'center',
      border: `2px solid ${accent}`,
      boxSizing: 'border-box',
      fontSize: 16,
      transition: 'transform .12s ease, box-shadow .12s ease',
      cursor: 'pointer',
    },
    actionsWrap: {
      marginTop: 14,
      display: 'grid',
      gap: 12,
    },
    hr: {
      marginTop: 24,
      marginBottom: 20,
      border: 'none',
      height: 1,
      background: '#e5e7eb',
    },
    altText: {
      color: '#666666',
      marginBottom: 12,
      fontSize: 14,
    },
    loginLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: 16,
      flexWrap: 'wrap',
    },
    loginLink: {
      color: accent,
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: 14,
    },
  };

  return (
    <div style={styles.wrapper} className="auth-page-wrapper">
      <div style={styles.overlay} aria-hidden="true" />
      <div
        className="auth-card"
        role="region"
        aria-labelledby="choose-register-title"
        style={styles.card}
      >
        <header>
          <h1 id="choose-register-title" className="auth-title" style={styles.title}>
            Create your account
          </h1>
          <p className="auth-subtitle" style={styles.subtitle}>
            Choose whether you want to register as a user or a food partner.
          </p>
        </header>

        <div style={styles.actionsWrap} aria-hidden={false}>
          <Link to="/user/register" style={styles.btnPrimary} className="auth-submit">
            Sign up as User
          </Link>

          <Link to="/food-partner/register" style={styles.btnOutline} className="auth-submit">
            Sign up as Food Partner
          </Link>
        </div>

        <hr style={styles.hr} />

        <div style={{ textAlign: 'center' }}>
          <div style={styles.altText}>Already have an account?</div>
          <div style={styles.loginLinks}>
            <Link to="/user/login" style={styles.loginLink}>
              User Login
            </Link>
            <Link to="/food-partner/login" style={styles.loginLink}>
              Food Partner Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;