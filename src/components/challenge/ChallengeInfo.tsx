
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Trophy } from 'lucide-react';

interface Challenge {
  title: string;
  description: string;
  progress: number;
  timeRemaining: number;
  reward: string;
}

interface ChallengeInfoProps {
  challenge: Challenge;
  formatTime: (minutes: number) => string;
}

export const ChallengeInfo: React.FC<ChallengeInfoProps> = ({
  challenge,
  formatTime
}) => {
  return (
    <Card className="bg-[#403E43] border-none">
      <CardHeader>
        <CardTitle className="text-white">{challenge.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">{challenge.description}</p>
        
        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-[#F97316] font-medium">{challenge.progress}%</span>
          </div>
          <Progress value={challenge.progress} className="h-3 bg-gray-700" />
        </div>

        {/* Timer */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            Time Remaining: {formatTime(challenge.timeRemaining)}
          </div>
          <div className="flex items-center text-[#DAA520]">
            <Trophy className="h-4 w-4 mr-1" />
            Reward: {challenge.reward}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
