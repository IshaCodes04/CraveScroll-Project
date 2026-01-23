import React, { useId } from 'react';

const Logo = ({ className = "w-8 h-8", size }) => {
    const id = useId().replace(/:/g, "");
    const goldGradId = `gold-grad-${id}`;
    const playGradId = `play-grad-${id}`;
    const glowId = `glow-${id}`;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ display: 'block' }}
        >
            <defs>
                <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FDE68A' }} />
                    <stop offset="50%" style={{ stopColor: '#D97706' }} />
                    <stop offset="100%" style={{ stopColor: '#92400E' }} />
                </linearGradient>
                <linearGradient id={playGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#FF8A00' }} />
                    <stop offset="100%" style={{ stopColor: '#FF2E00' }} />
                </linearGradient>
                <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* The Main 'C' with Golden Gradient */}
            <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 14.5 27.5 13 26.5 12"
                stroke={`url(#${goldGradId})`}
                strokeWidth="3.5"
                strokeLinecap="round"
                filter={`url(#${glowId})`} />

            {/* Premium Play Button - Now with Vibrant Gradient */}
            <path d="M15 11V21L22 16L15 11Z" fill={`url(#${playGradId})`} filter={`url(#${glowId})`} />

            {/* Vibrant Multi-Color Accents */}
            <circle cx="26" cy="8" r="3.5" fill="#EF4444" /> {/* Red Core */}
            <circle cx="26" cy="8" r="1.5" fill="#FECACA" /> {/* Light Red Highlight */}

            <circle cx="29" cy="18" r="2" fill="#10B981" /> {/* Emerald Green Dot */}
            <circle cx="6" cy="10" r="1.5" fill="#6366F1" /> {/* Indigo Small Dot */}
        </svg>
    );
};

export default Logo;
