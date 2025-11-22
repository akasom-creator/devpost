import { AtmosphericBackground } from './AtmosphericBackground';

/**
 * Demo component to showcase the AtmosphericBackground
 * This can be used for testing and development
 */
export const AtmosphericBackgroundDemo = () => {
  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '200vh', 
      backgroundColor: '#0a0a0a',
      color: '#fff',
      padding: '2rem'
    }}>
      <AtmosphericBackground />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontFamily: 'Creepster, cursive',
          color: '#DC143C',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Atmospheric Background Demo
        </h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
          <h2 style={{ color: '#DC143C', marginTop: '3rem' }}>Features:</h2>
          <ul style={{ fontSize: '1.1rem' }}>
            <li>✓ Animated fog/mist layers with different drift patterns</li>
            <li>✓ Cobweb decorations in all four corners</li>
            <li>✓ Cracked glass texture overlay (10% opacity)</li>
            <li>✓ Subtle parallax effect on scroll</li>
            <li>✓ GPU-accelerated animations with will-change</li>
            <li>✓ Respects prefers-reduced-motion</li>
            <li>✓ Mobile-optimized (reduced fog layers)</li>
          </ul>

          <h2 style={{ color: '#DC143C', marginTop: '3rem' }}>Scroll Down</h2>
          <p>Scroll down to see the parallax effect in action. The fog layers move at different speeds creating depth.</p>

          <div style={{ marginTop: '50vh', textAlign: 'center' }}>
            <h2 style={{ color: '#DC143C' }}>Keep Scrolling...</h2>
            <p>Notice how the fog drifts and the cobwebs stay in the corners</p>
          </div>

          <div style={{ marginTop: '50vh', textAlign: 'center' }}>
            <h2 style={{ color: '#DC143C' }}>Almost There...</h2>
            <p>The cracked glass overlay adds subtle texture throughout</p>
          </div>

          <div style={{ marginTop: '30vh', textAlign: 'center' }}>
            <h2 style={{ color: '#DC143C' }}>End of Demo</h2>
            <p>Scroll back up to see the parallax effect in reverse!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
