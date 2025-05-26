
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Target, Lock, Users, Clock, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Hunt {
  id: number;
  title: string;
  description: string;
  isLocked: boolean;
  lockReason?: string;
  currentAmount?: number;
  targetAmount?: number;
  canContribute?: boolean;
  entryFee?: number;
  spotsLeft?: number;
  totalSpots?: number;
  rewards: string;
}

interface HuntActionsProps {
  hunt: Hunt;
  onJoinHunt: (huntId: number) => void;
  onContribute: (huntId: number, amount: number) => void;
}

export const HuntActions: React.FC<HuntActionsProps> = ({ hunt, onJoinHunt, onContribute }) => {
  const { toast } = useToast();
  const [isJoining, setIsJoining] = useState(false);
  const [isContributing, setIsContributing] = useState(false);

  const handleJoinHunt = async () => {
    setIsJoining(true);
    
    if (hunt.entryFee) {
      toast({
        title: "Payment Required",
        description: `Entry fee: $${hunt.entryFee.toLocaleString()}. Redirecting to payment...`,
      });
    }
    
    setTimeout(() => {
      onJoinHunt(hunt.id);
      toast({
        title: "Hunt Joined!",
        description: `Successfully joined ${hunt.title}`,
      });
      setIsJoining(false);
    }, 2000);
  };

  const handleContribute = async () => {
    setIsContributing(true);
    
    setTimeout(() => {
      const contributionAmount = Math.floor(Math.random() * 10000) + 1000; // Random $1K-$10K
      onContribute(hunt.id, contributionAmount);
      toast({
        title: "Contribution Added!",
        description: `Added $${contributionAmount.toLocaleString()} to the prize pool`,
      });
      setIsContributing(false);
    }, 1500);
  };

  if (hunt.isLocked) {
    return (
      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-sm">{hunt.lockReason}</span>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {hunt.canContribute && hunt.id === 1 && (
        <Button 
          size="sm" 
          className="bg-[#F97316] hover:bg-[#E8660E]"
          onClick={handleContribute}
          disabled={isContributing}
        >
          <DollarSign className="w-4 h-4 mr-1" />
          {isContributing ? "Contributing..." : "Contribute"}
        </Button>
      )}
      
      {hunt.id === 2 && hunt.spotsLeft && hunt.spotsLeft > 0 && (
        <Button 
          size="sm" 
          className="bg-[#F97316] hover:bg-[#E8660E]"
          onClick={handleJoinHunt}
          disabled={isJoining}
        >
          <Target className="w-4 h-4 mr-1" />
          {isJoining ? "Joining..." : `Join ($${hunt.entryFee?.toLocaleString()})`}
        </Button>
      )}
      
      {hunt.id === 1 && hunt.currentAmount && hunt.targetAmount && hunt.currentAmount >= hunt.targetAmount && (
        <Button 
          size="sm" 
          className="bg-green-500 hover:bg-green-600"
          onClick={handleJoinHunt}
          disabled={isJoining}
        >
          <Play className="w-4 h-4 mr-1" />
          {isJoining ? "Starting..." : "Start Ultimate Hunt"}
        </Button>
      )}
    </div>
  );
};
