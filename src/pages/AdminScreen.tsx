
import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import { Switch } from '@/components/ui/switch';

export const AdminScreen: React.FC = () => {
  const { flags, toggleFlag } = useFeatureFlags();

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#F97316]">Feature Flags</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Location-based Hunts</span>
          <Switch 
            checked={flags.locationHunts}
            onCheckedChange={() => toggleFlag('locationHunts')}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span>User Generated Content</span>
          <Switch 
            checked={flags.userGeneratedContent}
            onCheckedChange={() => toggleFlag('userGeneratedContent')}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span>Profit Sharing</span>
          <Switch 
            checked={flags.profitSharing}
            onCheckedChange={() => toggleFlag('profitSharing')}
          />
        </div>
      </div>
    </div>
  );
};

