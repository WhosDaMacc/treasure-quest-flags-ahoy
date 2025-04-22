
import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Puzzle, Infinity, DollarSign } from 'lucide-react';

export const AdminScreen: React.FC = () => {
  const { flags, toggleFlag } = useFeatureFlags();

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-[#F97316]">Feature Management</h2>
      
      <Card className="bg-[#403E43] border-none">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#F97316] text-lg">Hunt Types</CardTitle>
            <Puzzle className="h-5 w-5 text-[#F97316]" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#F97316]/10 mr-3">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span>Location-based Hunts</span>
                <p className="text-xs text-gray-400">Physical treasure hunts using GPS</p>
              </div>
            </div>
            <Switch 
              checked={flags.locationHunts}
              onCheckedChange={() => toggleFlag('locationHunts')}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#F97316]/10 mr-3">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <span>User Generated Content</span>
                <p className="text-xs text-gray-400">Allow users to create hunts</p>
              </div>
            </div>
            <Switch 
              checked={flags.userGeneratedContent}
              onCheckedChange={() => toggleFlag('userGeneratedContent')}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-[#F97316]/10 mr-3">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <span>Profit Sharing</span>
                <p className="text-xs text-gray-400">Enable reward distribution</p>
              </div>
            </div>
            <Switch 
              checked={flags.profitSharing}
              onCheckedChange={() => toggleFlag('profitSharing')}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#403E43] border-none">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#F97316] text-lg">Ultimate Hunt</CardTitle>
            <Infinity className="h-5 w-5 text-[#F97316]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">The Untraceable Treasure</h3>
              <div className="flex items-center mt-1">
                <Badge className="bg-[#F97316] text-white mr-2">
                  <DollarSign className="h-3 w-3 mr-1" />
                  $10M
                </Badge>
                <span className="text-xs text-gray-400">Extreme difficulty</span>
              </div>
            </div>
            <Switch defaultChecked={true} />
          </div>
          <div className="p-3 bg-[#1A1F2C] rounded">
            <p className="text-xs text-gray-300">
              Warning: This hunt combines physical and virtual challenges of extreme difficulty. 
              Enable only for expert treasure hunters. Requires verification of participants.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
