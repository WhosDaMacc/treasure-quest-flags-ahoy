
import React from 'react';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

export const HomeScreen: React.FC = () => {
  const { flags } = useFeatureFlags();

  return (
    <div className="bg-[#2A2E3A] p-6 rounded-lg space-y-8">
      <div className="mb-8">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
                  alt="Foggy mountain peaks" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">Mountain Mysteries</h3>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
                  alt="River between mountains" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">River Riches</h3>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      <div className="grid gap-4">
        <Card className="bg-[#403E43] border-none">
          <CardContent className="p-4">
            <h3 className="font-semibold text-[#F97316] mb-2">Basic Treasure Hunt</h3>
            <p className="text-gray-300">Explore virtual treasure hunts across mysterious landscapes!</p>
          </CardContent>
        </Card>

        {flags.locationHunts && (
          <Card className="bg-[#403E43] border-none">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[#F97316] mb-2">Location-based Hunts</h3>
              <p className="text-gray-300">Find treasures in your local area with GPS navigation!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

