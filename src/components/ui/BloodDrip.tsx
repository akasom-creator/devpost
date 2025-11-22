import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useBloodDrip } from '../../hooks/useBloodDrip';

interface BloodDripProps {
  trigger: 'hover' | 'click' | 'load';
  startX?: number;
  startY?: number;
  count?: number;
  delay?: number;
}

const bloodDripVariants = {
  initial: {
    y: -20,
    scaleY: 1,
    opacity: 0,
  },
  animate: {
    y: [0, 100, 200],
    scaleY: [1, 2, 0.5],
    opacity: [1, 0.8, 0],
    transition: {
      duration: 1.2,
      ease: 'easeIn' as const,
      times: [0, 0.5, 1],
    },
  },
};

const splatterVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.5, 1],
    opacity: [0, 1, 0],
    transition: {
      duration: 0.4,
      delay: 1.2,
    },
  },
};

export const BloodDrip: React.FC<BloodDripProps> = ({
  trigger,
  startX = 0,
  startY = 0,
  count = 1,
  delay = 0,
}) => {
  const { triggerDrip, drips } = useBloodDrip();

  useEffect(() => {
    if (trigger === 'load') {
      const timer = setTimeout(() => {
        triggerDrips();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay]);

  const triggerDrips = () => {
    for (let i = 0; i < count; i++) {
      // Add random delay between drips for organic feel
      const randomDelay = Math.random() * 300;
      setTimeout(() => {
        const randomX = startX + (Math.random() - 0.5) * 100;
        const randomY = startY;
        triggerDrip(randomX, randomY);
      }, randomDelay);
    }
  };

  const handleTrigger = () => {
    if (trigger === 'hover' || trigger === 'click') {
      triggerDrips();
    }
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      onClick={trigger === 'click' ? handleTrigger : undefined}
    >
      {drips.map((drip) => (
        <div
          key={drip.id}
          className="absolute"
          style={{
            left: `${drip.x}px`,
            top: `${drip.y}px`,
          }}
        >
          {/* Blood droplet */}
          <motion.svg
            width="20"
            height="40"
            viewBox="0 0 20 40"
            variants={bloodDripVariants}
            initial="initial"
            animate="animate"
            className="absolute"
            style={{ willChange: 'transform, opacity' }}
          >
            <defs>
              <linearGradient id={`bloodGradient-${drip.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DC143C" stopOpacity="1" />
                <stop offset="100%" stopColor="#8B0000" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M10 0 Q15 10 15 20 Q15 30 10 35 Q5 30 5 20 Q5 10 10 0 Z"
              fill={`url(#bloodGradient-${drip.id})`}
            />
          </motion.svg>

          {/* Splatter effect */}
          <motion.svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            variants={splatterVariants}
            initial="initial"
            animate="animate"
            className="absolute"
            style={{ top: '200px', left: '-10px', willChange: 'transform, opacity' }}
          >
            <circle cx="20" cy="20" r="8" fill="#8B0000" opacity="0.8" />
            <circle cx="12" cy="18" r="4" fill="#8B0000" opacity="0.6" />
            <circle cx="28" cy="22" r="4" fill="#8B0000" opacity="0.6" />
            <circle cx="20" cy="12" r="3" fill="#8B0000" opacity="0.5" />
            <circle cx="20" cy="28" r="3" fill="#8B0000" opacity="0.5" />
          </motion.svg>
        </div>
      ))}
    </div>
  );
};
