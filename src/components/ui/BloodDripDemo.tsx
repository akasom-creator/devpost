import { BloodDrip } from './BloodDrip';

/**
 * Demo component to showcase BloodDrip animation functionality
 * This can be used for testing and demonstration purposes
 */
export const BloodDripDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-white text-3xl mb-8">Blood Drip Animation Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Hover trigger demo */}
        <div className="relative bg-gray-800 p-8 rounded-lg h-64">
          <h2 className="text-white text-xl mb-4">Hover Trigger</h2>
          <p className="text-gray-400">Hover over this card to see blood drip</p>
          <BloodDrip trigger="hover" startX={150} startY={0} count={3} />
        </div>

        {/* Click trigger demo */}
        <div className="relative bg-gray-800 p-8 rounded-lg h-64 cursor-pointer">
          <h2 className="text-white text-xl mb-4">Click Trigger</h2>
          <p className="text-gray-400">Click this card to see blood drip</p>
          <BloodDrip trigger="click" startX={150} startY={0} count={2} />
        </div>

        {/* Load trigger demo */}
        <div className="relative bg-gray-800 p-8 rounded-lg h-64">
          <h2 className="text-white text-xl mb-4">Load Trigger</h2>
          <p className="text-gray-400">Blood drips on component load</p>
          <BloodDrip trigger="load" startX={150} startY={0} count={1} delay={500} />
        </div>
      </div>
    </div>
  );
};
