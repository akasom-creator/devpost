import { useEffect, useState } from 'react';
import './AtmosphericBackground.css';

/**
 * AtmosphericBackground Component
 * 
 * Creates an immersive horror atmosphere with:
 * - Animated fog/mist layers
 * - Cobweb decorations in corners
 * - Cracked glass texture overlay
 * - Subtle parallax effect on scroll
 * 
 * Optimized with GPU acceleration and will-change properties
 */
export const AtmosphericBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Calculate parallax offset (subtle movement)
  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="atmospheric-background">
      {/* Fog/Mist Layers */}
      <div 
        className="fog-layer fog-layer-1"
        style={{ transform: `translate3d(0, ${parallaxOffset * 0.5}px, 0)` }}
      />
      <div 
        className="fog-layer fog-layer-2"
        style={{ transform: `translate3d(0, ${parallaxOffset * 0.3}px, 0)` }}
      />
      <div 
        className="fog-layer fog-layer-3"
        style={{ transform: `translate3d(0, ${parallaxOffset * 0.2}px, 0)` }}
      />

      {/* Cobweb Decorations */}
      <CobwebSVG position="top-left" />
      <CobwebSVG position="top-right" />
      <CobwebSVG position="bottom-left" />
      <CobwebSVG position="bottom-right" />

      {/* Cracked Glass Texture Overlay */}
      <div className="cracked-glass-overlay" />
    </div>
  );
};

/**
 * CobwebSVG Component
 * Renders a cobweb decoration in specified corner
 */
interface CobwebSVGProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CobwebSVG = ({ position }: CobwebSVGProps) => {
  const positionClasses = {
    'top-left': 'cobweb-top-left',
    'top-right': 'cobweb-top-right',
    'bottom-left': 'cobweb-bottom-left',
    'bottom-right': 'cobweb-bottom-right',
  };

  return (
    <svg
      className={`cobweb ${positionClasses[position]}`}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Radial web lines */}
      <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="50" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="100" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="150" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="200" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="0" y1="50" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="200" y1="50" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="200" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* Concentric web circles */}
      <circle cx="100" cy="100" r="20" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />

      {/* Spider */}
      <circle cx="100" cy="100" r="3" fill="rgba(255,255,255,0.15)" />
      <ellipse cx="100" cy="105" rx="2" ry="4" fill="rgba(255,255,255,0.12)" />
    </svg>
  );
};
