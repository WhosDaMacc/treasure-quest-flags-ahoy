
import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

export const ProfileScreen: React.FC = () => {
  const { flags } = useFeatureFlags();

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#F97316]">Captain's Profile</h2>
      
      <div className="bg-[#403E43] p-4 rounded-lg mb-4">
        <h3 className="font-semibold">Basic Stats</h3>
        <p>Treasures Found: 0</p>
        <p>Total Points: 0</p>
      </div>

      {flags.profitSharing && (
        <div className="bg-[#403E43] p-4 rounded-lg">
          <h3 className="font-semibold">Profit Sharing</h3>
          <p>Earnings: $0.00</p>
        </div>
      )}
    </div>
  );
};

