
import React, { useState } from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Award, Puzzle, MapPin, Globe, Diamond, DollarSign, Coins, Flag } from 'lucide-react';
import {
  getTotalPoints,
  isPiratesRealmSharingEnabled,
  setPiratesRealmSharingEnabled,
} from '@/lib/pirates-realm';

export const ProfileScreen: React.FC = () => {
  const { flags } = useFeatureFlags();
  const [shareToPiratesRealm, setShareToPiratesRealm] = useState(() =>
    isPiratesRealmSharingEnabled()
  );
  const [totalPoints] = useState(() => getTotalPoints());

  const completedHunts = [
    {
      name: "Beginner's Quest",
      type: "Virtual",
      reward: "0.05 ETH",
      icon: <Globe className="h-4 w-4" />
    },
    {
      name: "City Explorer",
      type: "Physical", 
      reward: "$50",
      icon: <MapPin className="h-4 w-4" />
    }
  ];

  const nftRewards = [
    {
      name: "Golden Compass",
      rarity: "Rare",
      hunt: "Mountain Trail",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=100&h=100&auto=format&fit=crop"
    },
    {
      name: "Dragon Scale",
      rarity: "Epic",
      hunt: "Crypto Conundrum",
      image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=100&h=100&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg space-y-6">
      <div className="relative h-[200px] rounded-lg overflow-hidden mb-8">
        <img 
          src="https://images.unsplash.com/photo-1487252665478-49b61b47f302" 
          alt="Adventure background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
          <div>
            <div className="flex items-center mb-2">
              <h2 className="text-2xl font-bold text-white">Captain's Profile</h2>
              <Badge className="ml-2 bg-[#F97316]/20 text-[#F97316] border-[#F97316]">Adventurer</Badge>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <Award className="h-4 w-4 mr-1 text-[#DAA520]" />
              <span>Rank: Novice Explorer</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#403E43] border-none">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#F97316] text-lg">Statistics</CardTitle>
              <Award className="h-5 w-5 text-[#DAA520]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Treasures Found</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Points</span>
              <span className="font-medium">{totalPoints.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Hunts Completed</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Active Hunts</span>
              <span className="font-medium">1</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#403E43] border-none">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#F97316] text-lg">Pirates Realm</CardTitle>
              <Flag className="h-5 w-5 text-[#DAA520]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center gap-4">
              <div>
                <p className="text-gray-200 text-sm font-medium">Share my scores to the Pirates Realm</p>
                <p className="text-gray-400 text-xs mt-1">
                  When on, your total points are shared to the Pirates Realm leaderboard
                  each time you complete a challenge. Turn it off any time to stop sharing.
                </p>
              </div>
              <Switch
                checked={shareToPiratesRealm}
                onCheckedChange={(checked) => {
                  setShareToPiratesRealm(checked);
                  setPiratesRealmSharingEnabled(checked);
                }}
                aria-label="Share my scores to the Pirates Realm"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#403E43] border-none">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#F97316] text-lg">Completed Hunts</CardTitle>
              <Puzzle className="h-5 w-5 text-[#F97316]" />
            </div>
          </CardHeader>
          <CardContent>
            {completedHunts.length > 0 ? (
              <div className="space-y-3">
                {completedHunts.map((hunt, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-[#2A2E3A] rounded">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-full bg-[#F97316]/10 mr-2">
                        {hunt.icon}
                      </div>
                      <span>{hunt.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2 text-xs">
                        {hunt.type}
                      </Badge>
                      <span className="text-[#DAA520]">{hunt.reward}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-2">No hunts completed yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#403E43] border-none">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#F97316] text-lg">NFT Rewards</CardTitle>
              <Diamond className="h-5 w-5 text-[#DAA520]" />
            </div>
          </CardHeader>
          <CardContent>
            {nftRewards.length > 0 ? (
              <div className="space-y-3">
                {nftRewards.map((nft, index) => (
                  <div key={index} className="flex items-center p-2 bg-[#2A2E3A] rounded">
                    <img 
                      src={nft.image} 
                      alt={nft.name} 
                      className="w-10 h-10 object-cover rounded mr-3"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <span className="font-medium">{nft.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs bg-[#D946EF]/10 text-[#D946EF] border-[#D946EF]">
                          {nft.rarity}
                        </Badge>
                      </div>
                      <span className="text-gray-400 text-xs">From: {nft.hunt}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-2">No NFT rewards yet</p>
            )}
          </CardContent>
        </Card>

        {flags.profitSharing && (
          <Card className="bg-[#403E43] border-none">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-[#F97316] text-lg">Prize Pool</CardTitle>
                <Coins className="h-5 w-5 text-[#DAA520]" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Earnings</span>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-[#DAA520]" />
                  <span className="font-medium text-[#DAA520]">$50.00</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Crypto Earnings</span>
                <span className="font-medium">0.05 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">NFT Collections</span>
                <span className="font-medium">2</span>
              </div>
              <div className="p-2 bg-[#F97316]/10 rounded mt-2">
                <p className="text-xs text-[#F97316]">
                  Complete more hunts to increase your earnings and unlock premium NFT rewards!
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
