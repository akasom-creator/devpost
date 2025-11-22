import React from 'react';

export interface ScareMeterProps {
  rating: number; // 0-10 TMDb rating
  maxRating?: number; // Maximum number of icons to display (default: 5)
  icon?: 'skull' | 'knife' | 'ghost'; // Icon type
  className?: string;
}

const ScareMeter: React.FC<ScareMeterProps> = ({
  rating,
  maxRating = 5,
  icon = 'skull',
  className = '',
}) => {
  // Convert 0-10 rating to 0-5 scale
  const normalizedRating = (rating / 10) * maxRating;
  const filledIcons = Math.round(normalizedRating);
  const emptyIcons = maxRating - filledIcons;

  // SVG icon components
  const SkullIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300 hover:scale-110"
    >
      <path
        d="M12 2C7.58 2 4 5.58 4 10c0 2.5 1.5 4.5 2.5 6.5.5 1 1 2 1 3.5 0 .5.5 1 1 1h7c.5 0 1-.5 1-1 0-1.5.5-2.5 1-3.5 1-2 2.5-4 2.5-6.5 0-4.42-3.58-8-8-8z"
        fill={filled ? '#DC143C' : 'none'}
        stroke={filled ? '#DC143C' : '#4a4a4a'}
        strokeWidth="1.5"
      />
      <circle cx="9" cy="10" r="1.5" fill={filled ? '#000' : '#4a4a4a'} />
      <circle cx="15" cy="10" r="1.5" fill={filled ? '#000' : '#4a4a4a'} />
      <path
        d="M9 14c0 1 .5 2 1.5 2.5.5.25 1 .5 1.5.5s1-.25 1.5-.5c1-.5 1.5-1.5 1.5-2.5"
        stroke={filled ? '#000' : '#4a4a4a'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  const KnifeIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300 hover:scale-110"
    >
      <path
        d="M20 2L4 18l2 2 2 2L22 6l-2-4z"
        fill={filled ? '#DC143C' : 'none'}
        stroke={filled ? '#8B0000' : '#4a4a4a'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 18l-2 4 4-2"
        fill={filled ? '#8B0000' : 'none'}
        stroke={filled ? '#8B0000' : '#4a4a4a'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line
        x1="8"
        y1="14"
        x2="10"
        y2="16"
        stroke={filled ? '#450000' : '#4a4a4a'}
        strokeWidth="1.5"
      />
    </svg>
  );

  const GhostIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300 hover:scale-110"
    >
      <path
        d="M12 2C8.5 2 6 4.5 6 8v10c0 .5.5 1 1 1 .5 0 1-.5 1-1v-1c0-.5.5-1 1-1s1 .5 1 1v1c0 .5.5 1 1 1s1-.5 1-1v-1c0-.5.5-1 1-1s1 .5 1 1v1c0 .5.5 1 1 1 .5 0 1-.5 1-1V8c0-3.5-2.5-6-6-6z"
        fill={filled ? '#DC143C' : 'none'}
        stroke={filled ? '#DC143C' : '#4a4a4a'}
        strokeWidth="1.5"
      />
      <circle cx="9.5" cy="9" r="1.5" fill={filled ? '#000' : '#4a4a4a'} />
      <circle cx="14.5" cy="9" r="1.5" fill={filled ? '#000' : '#4a4a4a'} />
      <path
        d="M9 12c0 1 1 2 3 2s3-1 3-2"
        stroke={filled ? '#000' : '#4a4a4a'}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  // Select the icon component based on the icon prop
  const IconComponent = icon === 'skull' ? SkullIcon : icon === 'knife' ? KnifeIcon : GhostIcon;

  return (
    <div
      className={`flex items-center gap-1 group ${className}`}
      role="img"
      aria-label={`Rating: ${rating} out of 10`}
    >
      {/* Filled icons */}
      {Array.from({ length: filledIcons }).map((_, index) => (
        <div
          key={`filled-${index}`}
          className="animate-pulse-glow"
          style={{
            animation: 'pulseGlow 2s ease-in-out infinite',
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <IconComponent filled={true} />
        </div>
      ))}
      
      {/* Empty icons */}
      {Array.from({ length: emptyIcons }).map((_, index) => (
        <div key={`empty-${index}`}>
          <IconComponent filled={false} />
        </div>
      ))}
    </div>
  );
};

export default ScareMeter;
