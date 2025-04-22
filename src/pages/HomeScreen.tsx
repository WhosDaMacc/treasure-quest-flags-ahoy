
import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

export const HomeScreen: React.FC = () => {
  const { flags } = useFeatureFlags();

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#F97316]">Treasure Hunts</h2>
      <div className="grid gap-4">
        <div className="bg-[#403E43] p-4 rounded-lg">
          <h3 className="font-semibold">Basic Treasure Hunt</h3>
          <p className="text-gray-300">Explore virtual treasure hunts!</p>
        </div>

        {flags.locationHunts && (
          <div className="bg-[#403E43] p-4 rounded-lg">
            <h3 className="font-semibold">Location-based Hunts</h3>
            <p className="text-gray-300">Find treasures near you!</p>
          </div>
        )}
      </div>
    </div>
  );
};

