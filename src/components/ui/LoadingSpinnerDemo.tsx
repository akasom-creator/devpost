import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingSpinnerDemo = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showInline, setShowInline] = useState(false);

  return (
    <div className="min-h-screen bg-darkness-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-creepy text-blood-500 text-center mb-8">
          LoadingSpinner Component Demo
        </h1>

        {/* Full Screen Spinner Demo */}
        <div className="bg-darkness-800 p-6 rounded-lg border border-blood-700">
          <h2 className="text-2xl font-creepy text-blood-500 mb-4">
            Full Screen Spinner
          </h2>
          <p className="text-gray-300 mb-4">
            Click the button to show a full-screen loading spinner with dark backdrop
          </p>
          <button
            onClick={() => setShowFullScreen(true)}
            className="px-6 py-3 bg-blood-700 text-white rounded hover:bg-blood-500 transition-colors"
          >
            Show Full Screen Spinner
          </button>
          {showFullScreen && (
            <div onClick={() => setShowFullScreen(false)}>
              <LoadingSpinner fullScreen={true} />
            </div>
          )}
        </div>

        {/* Inline Spinner Demo */}
        <div className="bg-darkness-800 p-6 rounded-lg border border-blood-700">
          <h2 className="text-2xl font-creepy text-blood-500 mb-4">
            Inline Spinner
          </h2>
          <p className="text-gray-300 mb-4">
            Toggle to show an inline loading spinner without backdrop
          </p>
          <button
            onClick={() => setShowInline(!showInline)}
            className="px-6 py-3 bg-blood-700 text-white rounded hover:bg-blood-500 transition-colors mb-4"
          >
            {showInline ? 'Hide' : 'Show'} Inline Spinner
          </button>
          {showInline && (
            <div className="bg-darkness-900 p-8 rounded">
              <LoadingSpinner fullScreen={false} size={60} />
            </div>
          )}
        </div>

        {/* Different Sizes Demo */}
        <div className="bg-darkness-800 p-6 rounded-lg border border-blood-700">
          <h2 className="text-2xl font-creepy text-blood-500 mb-4">
            Different Sizes
          </h2>
          <div className="flex items-center justify-around gap-4 bg-darkness-900 p-8 rounded">
            <div>
              <p className="text-gray-300 text-center mb-2">Small (40px)</p>
              <LoadingSpinner fullScreen={false} size={40} />
            </div>
            <div>
              <p className="text-gray-300 text-center mb-2">Medium (80px)</p>
              <LoadingSpinner fullScreen={false} size={80} />
            </div>
            <div>
              <p className="text-gray-300 text-center mb-2">Large (120px)</p>
              <LoadingSpinner fullScreen={false} size={120} />
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-darkness-800 p-6 rounded-lg border border-blood-700">
          <h2 className="text-2xl font-creepy text-blood-500 mb-4">Features</h2>
          <ul className="text-gray-300 space-y-2 list-disc list-inside">
            <li>Spinning pentagram SVG animation</li>
            <li>Pulsing red glow effect using Framer Motion</li>
            <li>Fade-in/fade-out transitions</li>
            <li>Centered overlay with dark backdrop (full-screen mode)</li>
            <li>Customizable size</li>
            <li>Inline or full-screen display options</li>
            <li>Accessible with ARIA labels and screen reader support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinnerDemo;
