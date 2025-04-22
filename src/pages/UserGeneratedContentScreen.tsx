
import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

export const UserGeneratedContentScreen: React.FC = () => {
  const { flags } = useFeatureFlags();

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#F97316]">Create Your Hunt</h2>
      
      <div className="bg-[#403E43] p-4 rounded-lg">
        <h3 className="font-semibold">Design Custom Treasure Hunts</h3>
        <p className="text-gray-300">Create and share your own treasure hunting adventures!</p>
        <div className="mt-4 grid gap-4">
          <div className="p-4 bg-[#1A1F2C] rounded">
            <p className="font-medium">Hunt creation tools will appear here</p>
          </div>
          <div className="p-4 bg-[#1A1F2C] rounded">
            <p className="font-medium">Your published hunts will be listed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};
