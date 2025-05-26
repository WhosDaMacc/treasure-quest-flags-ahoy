
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lightbulb, CheckCircle, Trophy } from 'lucide-react';

interface Challenge {
  clues: string[];
  currentClueIndex: number;
  isCompleted: boolean;
}

interface ClueSectionProps {
  challenge: Challenge;
  answer: string;
  setAnswer: (answer: string) => void;
  isSubmitting: boolean;
  handleSubmitAnswer: () => void;
  handleCompleteChallenge: () => void;
}

export const ClueSection: React.FC<ClueSectionProps> = ({
  challenge,
  answer,
  setAnswer,
  isSubmitting,
  handleSubmitAnswer,
  handleCompleteChallenge
}) => {
  return (
    <Card className="bg-[#403E43] border-none">
      <CardHeader>
        <CardTitle className="text-[#F97316] flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          Current Clue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-[#2A2E3A] p-4 rounded-md border border-[#F97316]/20 mb-4">
          <p className="text-[#F97316] italic">{challenge.clues[challenge.currentClueIndex]}</p>
        </div>
        
        {/* Answer Input */}
        {!challenge.isCompleted && (
          <div className="space-y-3">
            <Input
              placeholder="Enter your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-[#2A2E3A] border-gray-600 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
            />
            <Button 
              onClick={handleSubmitAnswer}
              disabled={!answer.trim() || isSubmitting}
              className="w-full bg-[#F97316] hover:bg-[#E8660E]"
            >
              {isSubmitting ? "Checking..." : "Submit Answer"}
            </Button>
          </div>
        )}

        {challenge.isCompleted && (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center text-green-400">
              <CheckCircle className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">Challenge Completed!</span>
            </div>
            <Button 
              onClick={handleCompleteChallenge}
              className="bg-green-500 hover:bg-green-600"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Claim Reward
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
