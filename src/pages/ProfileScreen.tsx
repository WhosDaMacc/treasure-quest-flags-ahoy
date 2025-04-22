
import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import { Card, CardContent } from '@/components/ui/card';

export const ProfileScreen: React.FC = () => {
  const { flags } = useFeatureFlags();

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg space-y-6">
      <div className="relative h-[200px] rounded-lg overflow-hidden mb-8">
        <img 
          src="https://images.unsplash.com/photo-1487252665478-49b61b47f302" 
          alt="Adventure background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <h2 className="text-2xl font-bold text-white">Captain's Profile</h2>
        </div>
      </div>
      
      <Card className="bg-[#403E43] border-none">
        <CardContent className="p-4">
          <h3 className="font-semibold text-[#F97316] mb-2">Basic Stats</h3>
          <p className="text-gray-300">Treasures Found: 0</p>
          <p className="text-gray-300">Total Points: 0</p>
        </CardContent>
      </Card>

      {flags.profitSharing && (
        <Card className="bg-[#403E43] border-none">
          <CardContent className="p-4">
            <h3 className="font-semibold text-[#F97316] mb-2">Profit Sharing</h3>
            <p className="text-gray-300">Earnings: $0.00</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

