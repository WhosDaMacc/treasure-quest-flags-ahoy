
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clock, Trophy, MapPin, Globe, Puzzle, Lightbulb, Target, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [answer, setAnswer] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    toast({
      title: "Challenge Completed!",
      description: `Congratulations! You've earned ${challenge?.reward}`,
    });
    
    setTimeout(() => {
      navigate('/');
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
            {getTypeIcon(challenge.type)}
            <h1 className="text-3xl font-bold text-[#F97316]">{challenge.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Challenge Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Challenge Info */}
            <Card className="bg-[#403E43] border-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{challenge.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline" className="bg-[#F97316]/20 text-[#F97316] border-[#F97316]">
                      {getTypeIcon(challenge.type)}
                      <span className="ml-1 capitalize">{challenge.type}</span>
                    </Badge>
                  </div>
                </div>
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

            {/* Current Clue */}
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tasks */}
            <Card className="bg-[#403E43] border-none">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {challenge.tasks.map((task, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                        index <= challenge.currentClueIndex 
                          ? 'bg-green-500' 
                          : index === challenge.currentClueIndex + 1 
                            ? 'bg-[#F97316]' 
                            : 'bg-gray-600'
                      }`} />
                      <span className={
                        index <= challenge.currentClueIndex 
                          ? 'text-green-400 line-through' 
                          : index === challenge.currentClueIndex + 1 
                            ? 'text-[#F97316]' 
                            : 'text-gray-400'
                      }>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="bg-[#403E43] border-none">
              <CardHeader>
                <CardTitle className="text-white">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write down your thoughts, observations, or clues..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-[#2A2E3A] border-gray-600 text-white min-h-[120px]"
                />
              </CardContent>
            </Card>

            {/* All Clues (unlocked ones) */}
            <Card className="bg-[#403E43] border-none">
              <CardHeader>
                <CardTitle className="text-white">Previous Clues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {challenge.clues.slice(0, challenge.currentClueIndex).map((clue, index) => (
                    <div key={index} className="text-sm text-gray-400 italic">
                      {index + 1}. {clue}
                    </div>
                  ))}
                  {challenge.currentClueIndex === 0 && (
                    <p className="text-sm text-gray-500">Complete tasks to unlock previous clues</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
