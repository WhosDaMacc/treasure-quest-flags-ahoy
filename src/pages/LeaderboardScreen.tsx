
import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

export const LeaderboardScreen: React.FC = () => {
  const { flags } = useFeatureFlags();

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#F97316]">Treasure Hunters Leaderboard</h2>
      
      <div className="bg-[#403E43] p-4 rounded-lg">
        <h3 className="font-semibold">Top Hunters</h3>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center p-2 bg-[#1A1F2C] rounded">
            <div className="flex items-center gap-2">
              <span className="text-[#F97316] font-bold">1</span>
              <span>Captain Blackbeard</span>
            </div>
            <span>1,500 points</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-[#1A1F2C] rounded">
            <div className="flex items-center gap-2">
              <span className="text-[#F97316] font-bold">2</span>
              <span>Silver Morgan</span>
            </div>
            <span>1,200 points</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-[#1A1F2C] rounded">
            <div className="flex items-center gap-2">
              <span className="text-[#F97316] font-bold">3</span>
              <span>First Mate Jones</span>
            </div>
            <span>950 points</span>
          </div>
        </div>
      </div>
    </div>
  );
};
