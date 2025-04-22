import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Puzzle, Globe, MapPin, Lightbulb, Infinity, DollarSign, Award, Diamond, Lock, Unlock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const HomeScreen: React.FC = () => {
  const { flags } = useFeatureFlags();

  const featuredHunts = [
    {
      id: 1,
      title: "The Ultimate Treasure",
      description: "$10,000,000 - The Untraceable Treasure",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      badge: "Ultimate",
      icon: <Infinity className="h-5 w-5 text-[#F97316]" />,
      rewards: "Cash + NFTs",
      featured: true,
      isLocked: true,
      lockReason: "Prize pool pending verification"
    },
    {
      id: 2,
      title: "Mountain Mysteries",
      description: "Explore hidden treasures in remote mountain peaks",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      badge: "Physical",
      icon: <MapPin className="h-5 w-5 text-[#F97316]" />,
      rewards: "$10,000",
      featured: true,
      isLocked: false
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
  ];

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
                          $10M Prize
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-[#F97316] mr-2" />
                        <span className="text-white font-medium">{hunt.rewards}</span>
                      </div>
                      {hunt.isLocked && (
                        <p className="text-red-400 text-sm flex items-center">
                          <Lock className="w-4 h-4 mr-1" />
                          {hunt.lockReason}
                        </p>
                      )}
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

      <div className="mt-8 relative overflow-hidden rounded-lg bg-gradient-to-r from-[#1A1F2C] to-[#2A2E3A] p-6 border border-[#F97316]/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Infinity className="h-6 w-6 text-[#F97316] mr-2" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">
                The Ultimate Hunt
              </h2>
              <Badge className="ml-2 bg-[#F97316] text-white animate-pulse">$10M</Badge>
            </div>
            <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50">
              <Lock className="w-3.5 h-3.5 mr-1" />
              Prize Pool Pending
            </Badge>
          </div>
          <p className="text-gray-300 mb-4">
            The most extreme challenge ever created. Find the untraceable treasure hidden somewhere on Earth.
            Combining virtual and physical challenges, this hunt will test your limits.
          </p>
          <div className="flex flex-wrap gap-2">
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
        </div>
      </div>
    </div>
  );
};
