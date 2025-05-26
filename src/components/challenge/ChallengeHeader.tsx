
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield } from 'lucide-react';

interface ChallengeHeaderProps {
  title: string;
  type: string;
  difficulty: string;
  typeIcon: React.ReactNode;
  isBrowserMonitoringActive: boolean;
  getDifficultyColor: (difficulty: string) => string;
}

export const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({
  title,
  type,
  difficulty,
  typeIcon,
  isBrowserMonitoringActive,
  getDifficultyColor
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mr-4 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Hunts
      </Button>
      <div className="flex items-center gap-3">
        {typeIcon}
        <h1 className="text-3xl font-bold text-[#F97316]">{title}</h1>
      </div>
      <div className="flex gap-2 ml-auto">
        <Badge variant="outline" className={getDifficultyColor(difficulty)}>
          {difficulty}
        </Badge>
        <Badge variant="outline" className="bg-[#F97316]/20 text-[#F97316] border-[#F97316]">
          {typeIcon}
          <span className="ml-1 capitalize">{type}</span>
        </Badge>
        {isBrowserMonitoringActive && (
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            <Shield className="h-3 w-3 mr-1" />
            Secure Mode
          </Badge>
        )}
      </div>
    </div>
  );
};
