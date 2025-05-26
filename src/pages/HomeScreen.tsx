import React, { useState } from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Puzzle, Globe, MapPin, Lightbulb, Infinity, DollarSign, Award, Diamond, Lock, Unlock, Users, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HuntActions } from '@/components/HuntActions';
import { DemoGames } from '@/components/DemoGames';
import { useToast } from '@/hooks/use-toast';

interface Hunt {
  id: number;
  title: string;
  description: string;
  image: string;
  badge: string;
  icon: JSX.Element;
  rewards: string;
  featured: boolean;
  isLocked: boolean;
  lockReason?: string;
  currentAmount?: number;
  targetAmount?: number;
  canContribute?: boolean;
  entryFee?: number;
  spotsLeft?: number;
  totalSpots?: number;
}

export const HomeScreen: React.FC = () => {
  const { flags } = useFeatureFlags();
  const { toast } = useToast();

  // Simulated data for the Ultimate Hunt jackpot progress
  const [ultimateHuntTarget] = useState(10000000); // $10M target
  const [currentJackpot, setCurrentJackpot] = useState(7850000); // $7.85M raised so far
  const jackpotProgress = (currentJackpot / ultimateHuntTarget) * 100;

  const [featuredHunts, setFeaturedHunts] = useState<Hunt[]>([
    {
      id: 1,
      title: "The Ultimate Treasure",
      description: "$10,000,000 - The Untraceable Treasure",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      badge: "Ultimate",
      icon: <Infinity className="h-5 w-5 text-[#F97316]" />,
      rewards: "Cash + NFTs",
      featured: true,
      isLocked: jackpotProgress < 100,
      lockReason: jackpotProgress < 100 ? `Jackpot ${jackpotProgress.toFixed(1)}% funded` : "Ready to start",
      currentAmount: currentJackpot,
      targetAmount: ultimateHuntTarget,
      canContribute: true
    },
    {
      id: 2,
      title: "Million Dollar Challenge",
      description: "Limited to 100 elite hunters - $10,000 entry fee",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      badge: "Elite",
      icon: <Target className="h-5 w-5 text-[#F97316]" />,
      rewards: "$1,000,000",
      featured: true,
      isLocked: false,
      entryFee: 10000,
      spotsLeft: 23,
      totalSpots: 100
    },
    {
      id: 3,
      title: "Crypto Conundrum",
      description: "Solve the blockchain puzzles for exclusive NFT rewards",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      badge: "Virtual",
      icon: <Globe className="h-5 w-5 text-[#F97316]" />,
      rewards: "NFT Collection",
      featured: true,
      isLocked: true,
      lockReason: "Prize pool under review"
    }
  ]);

  const huntTypes = [
    {
      title: "Puzzle Hunts",
      description: "Brain-teasing puzzles with progressive difficulty",
      icon: <Puzzle className="h-5 w-5" />,
      rewards: "NFT + $5,000",
      type: "virtual"
    },
    {
      title: "Riddle Masters",
      description: "Ancient riddles hidden in world landmarks",
      icon: <Lightbulb className="h-5 w-5" />,
      rewards: "$7,500",
      type: "hybrid"
    },
    {
      title: "Physical Expeditions",
      description: "Real-world treasure hunts with GPS navigation",
      icon: <MapPin className="h-5 w-5" />,
      rewards: "$15,000",
      type: "physical"
    },
    {
      title: "Digital Quests",
      description: "Virtual hunts in immersive online worlds",
      icon: <Globe className="h-5 w-5" />,
      rewards: "NFT Collection",
      type: "virtual"
    },
    {
      title: "IQ Challenges",
      description: "Test your intelligence with challenging puzzles",
      icon: <Lightbulb className="h-5 w-5" />,
      rewards: "$2,500",
      type: "virtual"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleJoinHunt = (huntId: number) => {
    const hunt = featuredHunts.find(h => h.id === huntId);
    if (hunt?.id === 2) {
      setFeaturedHunts(prev => prev.map(h => 
        h.id === huntId ? { ...h, spotsLeft: Math.max((h.spotsLeft || 0) - 1, 0) } : h
      ));
    }
  };

  const handleContribute = (huntId: number, amount: number) => {
    if (huntId === 1) {
      setCurrentJackpot(prev => Math.min(prev + amount, ultimateHuntTarget));
      setFeaturedHunts(prev => prev.map(h => 
        h.id === huntId ? { 
          ...h, 
          currentAmount: Math.min((h.currentAmount || 0) + amount, ultimateHuntTarget),
          isLocked: (h.currentAmount || 0) + amount < ultimateHuntTarget,
          lockReason: (h.currentAmount || 0) + amount < ultimateHuntTarget ? 
            `Jackpot ${(((h.currentAmount || 0) + amount) / ultimateHuntTarget * 100).toFixed(1)}% funded` : 
            "Ready to start"
        } : h
      ));
    }
  };

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg space-y-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Featured Hunts</h2>
          <Badge variant="outline" className="bg-[#F97316]/10 text-[#F97316] border-[#F97316]">
            <Diamond className="w-3.5 h-3.5 mr-1" />
            Premium Rewards
          </Badge>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {featuredHunts.map((hunt) => (
              <CarouselItem key={hunt.id}>
                <div className="relative h-[350px] rounded-lg overflow-hidden">
                  <img 
                    src={hunt.image} 
                    alt={hunt.title} 
                    className={`absolute inset-0 w-full h-full object-cover ${hunt.isLocked ? 'filter blur-sm' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center mb-2">
                      {hunt.icon}
                      <Badge variant="outline" className="ml-2 bg-black/50 text-white border-[#F97316]/50">
                        {hunt.badge}
                      </Badge>
                      {hunt.id === 1 && (
                        <Badge variant="outline" className="ml-2 bg-[#F97316] text-white border-none animate-pulse">
                          <DollarSign className="w-3.5 h-3.5 mr-1" />
                          {formatCurrency(hunt.currentAmount || 0)} / {formatCurrency(hunt.targetAmount || 0)}
                        </Badge>
                      )}
                      {hunt.id === 2 && (
                        <Badge variant="outline" className="ml-2 bg-[#F97316] text-white border-none">
                          <Users className="w-3.5 h-3.5 mr-1" />
                          {hunt.spotsLeft} spots left
                        </Badge>
                      )}
                      {hunt.isLocked && (
                        <Badge variant="outline" className="ml-2 bg-red-500/20 text-red-400 border-red-500/50">
                          <Lock className="w-3.5 h-3.5 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{hunt.title}</h3>
                    <p className="text-gray-200 mb-4">{hunt.description}</p>
                    
                    {hunt.id === 1 && hunt.canContribute && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Jackpot Progress</span>
                          <span className="text-sm text-[#F97316] font-medium">{((hunt.currentAmount || 0) / (hunt.targetAmount || 1) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(hunt.currentAmount || 0) / (hunt.targetAmount || 1) * 100} className="h-2 bg-gray-700" />
                      </div>
                    )}

                    {hunt.id === 2 && hunt.entryFee && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">Entry Fee: {formatCurrency(hunt.entryFee)}</span>
                          <span className="text-[#F97316]">{hunt.spotsLeft}/{hunt.totalSpots} spots available</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-[#F97316] mr-2" />
                        <span className="text-white font-medium">{hunt.rewards}</span>
                      </div>
                      <HuntActions 
                        hunt={hunt} 
                        onJoinHunt={handleJoinHunt}
                        onContribute={handleContribute}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Demo Games Section */}
      <DemoGames />

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Hunt Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {huntTypes.map((hunt, index) => (
            <Card key={index} className="bg-[#403E43] border-none hover:bg-[#4A484E] transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-full bg-[#F97316]/10 mr-3">
                    {hunt.icon}
                  </div>
                  <h3 className="font-semibold text-[#F97316]">{hunt.title}</h3>
                </div>
                <p className="text-gray-300 mb-3">{hunt.description}</p>
                <Badge variant={hunt.type === "physical" ? "default" : hunt.type === "virtual" ? "outline" : "secondary"} 
                  className={hunt.type === "physical" ? "bg-[#0EA5E9]/20 text-[#0EA5E9] border-[#0EA5E9]" : 
                           hunt.type === "virtual" ? "bg-[#D946EF]/20 text-[#D946EF] border-[#D946EF]" : 
                           "bg-[#9b87f5]/20 text-[#9b87f5] border-[#9b87f5]"}>
                  {hunt.type.charAt(0).toUpperCase() + hunt.type.slice(1)}
                </Badge>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-[#DAA520] mr-1" />
                  <span className="text-[#DAA520] font-medium">Rewards: {hunt.rewards}</span>
                </div>
              </CardFooter>
            </Card>
          ))}

          {flags.locationHunts && (
            <Card className="bg-[#403E43] border-none hover:bg-[#4A484E] transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-full bg-[#F97316]/10 mr-3">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-[#F97316]">Location-based Hunts</h3>
                </div>
                <p className="text-gray-300 mb-3">Find treasures in your local area with GPS navigation!</p>
                <Badge variant="default" className="bg-[#0EA5E9]/20 text-[#0EA5E9] border-[#0EA5E9]">
                  Physical
                </Badge>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-[#DAA520] mr-1" />
                  <span className="text-[#DAA520] font-medium">Rewards: $1,000 - $5,000</span>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>

      {/* Ultimate Hunt Section */}
      <div className="mt-8 relative overflow-hidden rounded-lg bg-gradient-to-r from-[#1A1F2C] to-[#2A2E3A] p-6 border border-[#F97316]/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Infinity className="h-6 w-6 text-[#F97316] mr-2" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">
                The Ultimate Hunt
              </h2>
              <Badge className="ml-2 bg-[#F97316] text-white animate-pulse">
                {formatCurrency(currentJackpot)} / {formatCurrency(ultimateHuntTarget)}
              </Badge>
            </div>
            {jackpotProgress >= 100 ? (
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
                <Unlock className="w-3.5 h-3.5 mr-1" />
                Ready to Launch!
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/50">
                <Clock className="w-3.5 h-3.5 mr-1" />
                Funding in Progress
              </Badge>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            The most extreme challenge ever created. Find the untraceable treasure hidden somewhere on Earth.
            Combining virtual and physical challenges, this hunt will test your limits. Anyone can contribute to the prize pool!
          </p>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Prize Pool Progress</span>
              <span className="text-sm text-[#F97316] font-medium">{jackpotProgress.toFixed(1)}% funded</span>
            </div>
            <Progress value={jackpotProgress} className="h-3 bg-gray-700" />
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>{formatCurrency(currentJackpot)} raised</span>
              <span>{formatCurrency(ultimateHuntTarget - currentJackpot)} remaining</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              Physical
            </Badge>
            <Badge variant="outline" className="bg-[#D946EF]/10 text-[#D946EF] border-[#D946EF]">
              <Globe className="h-3.5 w-3.5 mr-1" />
              Virtual
            </Badge>
            <Badge variant="outline" className="bg-[#9b87f5]/10 text-[#9b87f5] border-[#9b87f5]">
              <Puzzle className="h-3.5 w-3.5 mr-1" />
              Puzzles
            </Badge>
            <Badge variant="outline" className="bg-[#DAA520]/10 text-[#DAA520] border-[#DAA520]">
              <Diamond className="h-3.5 w-3.5 mr-1" />
              NFT Rewards
            </Badge>
          </div>

          <div className="flex gap-3">
            <Button 
              className="bg-[#F97316] hover:bg-[#E8660E]"
              onClick={() => handleContribute(1, Math.floor(Math.random() * 5000) + 1000)}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Contribute to Prize Pool
            </Button>
            {jackpotProgress >= 100 && (
              <Button 
                variant="outline" 
                className="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white"
                onClick={() => handleJoinHunt(1)}
              >
                <Target className="w-4 h-4 mr-2" />
                Enter Ultimate Hunt
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
