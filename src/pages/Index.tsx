
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FeatureFlagProvider } from '@/contexts/FeatureFlagContext';
import { AdminScreen } from '@/pages/AdminScreen';
import { HomeScreen } from '@/pages/HomeScreen';
import { ProfileScreen } from '@/pages/ProfileScreen';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { flags } = useFeatureFlags();

  return (
    <FeatureFlagProvider>
      <Layout>
        <div className="min-h-screen bg-[#1A1F2C] text-white">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-[#F97316]">Captain's Cache</h1>
            
            <Tabs 
              defaultValue="home" 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-[#403E43]">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              
              <TabsContent value="home">
                <HomeScreen />
              </TabsContent>
              <TabsContent value="profile">
                <ProfileScreen />
              </TabsContent>
              <TabsContent value="admin">
                <AdminScreen />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </FeatureFlagProvider>
  );
};

export default Index;
