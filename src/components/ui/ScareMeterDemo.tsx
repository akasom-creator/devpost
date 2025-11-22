import React from 'react';
import ScareMeter from './ScareMeter';

/**
 * Demo component to showcase the ScareMeter component
 */
const ScareMeterDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-darkness-900 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-creepy text-blood-500 text-center mb-12">
          ScareMeter Component Demo
        </h1>

        {/* Different ratings with skull icon */}
        <section className="space-y-6">
          <h2 className="text-2xl font-nosifer text-blood-500 mb-4">Skull Icons</h2>
          <div className="space-y-4 bg-darkness-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 10/10 (Perfect)</span>
              <ScareMeter rating={10} icon="skull" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 8.5/10 (Excellent)</span>
              <ScareMeter rating={8.5} icon="skull" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 7/10 (Good)</span>
              <ScareMeter rating={7} icon="skull" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 5/10 (Average)</span>
              <ScareMeter rating={5} icon="skull" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 3/10 (Below Average)</span>
              <ScareMeter rating={3} icon="skull" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 0/10 (Terrible)</span>
              <ScareMeter rating={0} icon="skull" />
            </div>
          </div>
        </section>

        {/* Knife icons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-nosifer text-blood-500 mb-4">Knife Icons</h2>
          <div className="space-y-4 bg-darkness-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 9/10</span>
              <ScareMeter rating={9} icon="knife" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 6.5/10</span>
              <ScareMeter rating={6.5} icon="knife" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 4/10</span>
              <ScareMeter rating={4} icon="knife" />
            </div>
          </div>
        </section>

        {/* Ghost icons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-nosifer text-blood-500 mb-4">Ghost Icons</h2>
          <div className="space-y-4 bg-darkness-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 8/10</span>
              <ScareMeter rating={8} icon="ghost" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 5.5/10</span>
              <ScareMeter rating={5.5} icon="ghost" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rating: 2/10</span>
              <ScareMeter rating={2} icon="ghost" />
            </div>
          </div>
        </section>

        {/* Size variations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-nosifer text-blood-500 mb-4">Custom Styling</h2>
          <div className="space-y-4 bg-darkness-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white">Large (scale-150)</span>
              <ScareMeter rating={7.5} icon="skull" className="scale-150" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Small (scale-75)</span>
              <ScareMeter rating={7.5} icon="knife" className="scale-75" />
            </div>
          </div>
        </section>

        <div className="text-center text-gray-400 mt-12">
          <p>Hover over the icons to see the pulse effect!</p>
        </div>
      </div>
    </div>
  );
};

export default ScareMeterDemo;
