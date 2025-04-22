
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FeatureFlags {
  locationHunts: boolean;
  userGeneratedContent: boolean;
  profitSharing: boolean;
}

interface FeatureFlagContextType {
  flags: FeatureFlags;
  toggleFlag: (flag: keyof FeatureFlags) => void;
}

const defaultFlags: FeatureFlags = {
  locationHunts: false,
  userGeneratedContent: false,
  profitSharing: false,
};

const FeatureFlagContext = createContext<FeatureFlagContextType>({
  flags: defaultFlags,
  toggleFlag: () => {},
});

export const FeatureFlagProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);

  const toggleFlag = (flag: keyof FeatureFlags) => {
    setFlags(prev => ({
      ...prev,
      [flag]: !prev[flag]
    }));
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, toggleFlag }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => useContext(FeatureFlagContext);

