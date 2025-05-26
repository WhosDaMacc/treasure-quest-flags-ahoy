
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Puzzle, MapPin, Globe, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BrowserMonitor } from '@/components/BrowserMonitor';
import { ChallengeHeader } from '@/components/challenge/ChallengeHeader';
import { ChallengeInfo } from '@/components/challenge/ChallengeInfo';
import { ClueSection } from '@/components/challenge/ClueSection';
import { TasksSidebar } from '@/components/challenge/TasksSidebar';
import { SecurityLog } from '@/components/challenge/SecurityLog';
import { NotesSection } from '@/components/challenge/NotesSection';
import { PreviousClues } from '@/components/challenge/PreviousClues';

interface Challenge {
  id: number;
  title: string;
  description: string;
  type: 'puzzle' | 'physical' | 'virtual';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  timeLimit: string;
  reward: string;
  clues: string[];
  tasks: string[];
  currentClueIndex: number;
  progress: number;
  timeRemaining: number; // in minutes
  isCompleted: boolean;
}

export const ChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [answer, setAnswer] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityViolations, setSecurityViolations] = useState<string[]>([]);
  const [isBrowserMonitoringActive, setIsBrowserMonitoringActive] = useState(true);

  // Mock challenge data - in real app this would come from API
  useEffect(() => {
    const challenges: Challenge[] = [
      {
        id: 1,
        title: "The Cipher of Alexandria",
        description: "Decode the ancient library's secret message hidden in mathematical sequences",
        type: 'puzzle',
        difficulty: 'Medium',
        timeLimit: '2 hours',
        reward: '$500 + NFT',
        clues: [
          "The answer lies in the Fibonacci sequence starting from the 13th position...",
          "Each number represents a letter position in the alphabet",
          "The final answer is a 7-letter word meaning 'knowledge'"
        ],
        tasks: [
          "Find the 13th Fibonacci number",
          "Convert the sequence to letters",
          "Decode the final word"
        ],
        currentClueIndex: 0,
        progress: 15,
        timeRemaining: 105,
        isCompleted: false
      },
      {
        id: 2,
        title: "Downtown Scavenger Sprint",
        description: "Find 5 hidden QR codes scattered across the city center",
        type: 'physical',
        difficulty: 'Easy',
        timeLimit: '4 hours',
        reward: '$250',
        clues: [
          "Start at the fountain where pigeons gather at noon...",
          "The red door hiding behind ivy leads to the next clue",
          "Count the steps to the statue of the founding father"
        ],
        tasks: [
          "Find QR code at Central Fountain",
          "Locate the Red Ivy Door",
          "Visit Founder's Statue",
          "Find the Clock Tower code",
          "Complete at City Hall"
        ],
        currentClueIndex: 0,
        progress: 0,
        timeRemaining: 240,
        isCompleted: false
      }
    ];

    const challengeData = challenges.find(c => c.id === parseInt(id || '1'));
    setChallenge(challengeData || challenges[0]);
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (!challenge || challenge.isCompleted) return;

    const timer = setInterval(() => {
      setChallenge(prev => {
        if (!prev || prev.timeRemaining <= 0) return prev;
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [challenge]);

  const handleSecurityViolation = (violation: string) => {
    setSecurityViolations(prev => [...prev, `${new Date().toLocaleTimeString()}: ${violation}`]);
    
    // For high-stakes hunts, you could automatically disqualify or flag the participant
    if (securityViolations.length >= 3) {
      toast({
        title: "Multiple Violations Detected",
        description: "Your hunt session may be flagged for review due to suspicious activity.",
        variant: "destructive"
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'puzzle': return <Puzzle className="h-5 w-5" />;
      case 'physical': return <MapPin className="h-5 w-5" />;
      case 'virtual': return <Globe className="h-5 w-5" />;
      default: return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate answer checking
    setTimeout(() => {
      const isCorrect = Math.random() > 0.3; // 70% chance of correct answer
      
      if (isCorrect) {
        setChallenge(prev => {
          if (!prev) return prev;
          const newProgress = Math.min(prev.progress + 25, 100);
          const newClueIndex = Math.min(prev.currentClueIndex + 1, prev.clues.length - 1);
          const isCompleted = newProgress >= 100;
          
          return {
            ...prev,
            progress: newProgress,
            currentClueIndex: newClueIndex,
            isCompleted
          };
        });
        
        toast({
          title: "Correct!",
          description: "Great work! Moving to the next stage.",
        });
        
        setAnswer('');
      } else {
        toast({
          title: "Incorrect",
          description: "That's not quite right. Try again!",
          variant: "destructive"
        });
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCompleteChallenge = () => {
    setIsBrowserMonitoringActive(false);
    toast({
      title: "Challenge Completed!",
      description: `Congratulations! You've earned ${challenge?.reward}`,
    });
    
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  if (!challenge) {
    return <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2A2E3A] flex items-center justify-center">
      <div className="text-white">Loading challenge...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2A2E3A] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <ChallengeHeader
          title={challenge.title}
          type={challenge.type}
          difficulty={challenge.difficulty}
          typeIcon={getTypeIcon(challenge.type)}
          isBrowserMonitoringActive={isBrowserMonitoringActive && !challenge.isCompleted}
          getDifficultyColor={getDifficultyColor}
        />

        {/* Browser Monitor */}
        <div className="mb-6">
          <BrowserMonitor 
            isActive={isBrowserMonitoringActive && !challenge.isCompleted}
            onViolation={handleSecurityViolation}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Challenge Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Challenge Info */}
            <ChallengeInfo
              challenge={challenge}
              formatTime={formatTime}
            />

            {/* Current Clue */}
            <ClueSection
              challenge={challenge}
              answer={answer}
              setAnswer={setAnswer}
              isSubmitting={isSubmitting}
              handleSubmitAnswer={handleSubmitAnswer}
              handleCompleteChallenge={handleCompleteChallenge}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tasks */}
            <TasksSidebar
              tasks={challenge.tasks}
              currentClueIndex={challenge.currentClueIndex}
            />

            {/* Security Log */}
            <SecurityLog securityViolations={securityViolations} />

            {/* Notes */}
            <NotesSection notes={notes} setNotes={setNotes} />

            {/* All Clues (unlocked ones) */}
            <PreviousClues
              clues={challenge.clues}
              currentClueIndex={challenge.currentClueIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
