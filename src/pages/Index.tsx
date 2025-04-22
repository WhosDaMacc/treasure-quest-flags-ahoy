
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FeatureFlagProvider } from '@/contexts/FeatureFlagContext';
import { AdminScreen } from '@/pages/AdminScreen';
import { HomeScreen } from '@/pages/HomeScreen';
import { ProfileScreen } from '@/pages/ProfileScreen';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import { Compass, User, Settings } from 'lucide-react';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { flags } = useFeatureFlags();

  return (
    <FeatureFlagProvider>
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2A2E3A] text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">
                Captain's Cache
              </h1>
              <p className="text-gray-400 text-lg">Embark on Epic Treasure Hunts</p>
            </div>
            
            <Tabs 
              defaultValue="home" 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 w-full max-w-md bg-[#2A2E3A]/50 backdrop-blur-sm border border-[#F97316]/20">
                  <TabsTrigger 
                    value="home" 
                    className="flex items-center gap-2 data-[state=active]:bg-[#F97316] data-[state=active]:text-white"
                  >
                    <Compass size={18} />
                    <span>Hunt</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="profile"
                    className="flex items-center gap-2 data-[state=active]:bg-[#F97316] data-[state=active]:text-white"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin"
                    className="flex items-center gap-2 data-[state=active]:bg-[#F97316] data-[state=active]:text-white"
                  >
                    <Settings size={18} />
                    <span>Admin</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="mt-4">
                <TabsContent value="home" className="focus-visible:outline-none">
                  <HomeScreen />
                </TabsContent>
                <TabsContent value="profile" className="focus-visible:outline-none">
                  <ProfileScreen />
                </TabsContent>
                <TabsContent value="admin" className="focus-visible:outline-none">
                  <AdminScreen />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </Layout>
    </FeatureFlagProvider>
  );
};

export default Index;
