
import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

export const MapScreen: React.FC = () => {
  const { flags } = useFeatureFlags();

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#F97316]">Treasure Map</h2>
      
      <div className="bg-[#403E43] p-4 rounded-lg">
        <h3 className="font-semibold">Location-based Hunts</h3>
        <p className="text-gray-300">Find treasures in your area using GPS navigation!</p>
        <div className="mt-4 p-6 bg-[#1A1F2C] rounded border border-dashed border-[#F97316] flex items-center justify-center">
          <p className="text-center text-gray-400">Map interface will be displayed here</p>
        </div>
      </div>
    </div>
  );
};
