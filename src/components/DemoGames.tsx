import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Puzzle, MapPin, Globe, Clock, Trophy, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DemoGame {
  id: number;
  title: string;
  description: string;
  type: 'puzzle' | 'physical' | 'virtual';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  timeLimit: string;
  reward: string;
  progress: number;
  isActive: boolean;
  clue?: string;
}

export const DemoGames: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeGameId, setActiveGameId] = useState<number | null>(null);
  const [games, setGames] = useState<DemoGame[]>([
    {
      id: 1,
      title: "The Cipher of Alexandria",
      description: "Decode the ancient library's secret message hidden in mathematical sequences",
      type: 'puzzle',
      difficulty: 'Medium',
      timeLimit: '2 hours',
      reward: '$500 + NFT',
      progress: 0,
      isActive: false,
      clue: "The answer lies in the Fibonacci sequence starting from the 13th position..."
    },
    {
      id: 2,
      title: "Downtown Scavenger Sprint",
      description: "Find 5 hidden QR codes scattered across the city center",
      type: 'physical',
      difficulty: 'Easy',
      timeLimit: '4 hours',
      reward: '$250',
      progress: 0,
      isActive: false,
      clue: "Start at the fountain where pigeons gather at noon..."
    },
    {
      id: 3,
      title: "Metaverse Mystery Manor",
      description: "Navigate through a virtual haunted mansion to find the golden key",
      type: 'virtual',
      difficulty: 'Hard',
      timeLimit: '3 hours',
      reward: 'Rare NFT Collection',
      progress: 0,
      isActive: false,
      clue: "The mirror on the second floor reflects more than just your image..."
    },
    {
      id: 4,
      title: "Quantum Riddle Challenge",
      description: "Solve complex physics puzzles using quantum mechanics principles",
      type: 'puzzle',
      difficulty: 'Expert',
      timeLimit: '6 hours',
      reward: '$2,000',
      progress: 0,
      isActive: false,
      clue: "Schrödinger's equation holds the key, but which interpretation is correct?"
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'puzzle': return <Puzzle className="h-4 w-4" />;
      case 'physical': return <MapPin className="h-4 w-4" />;
      case 'virtual': return <Globe className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
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

  const startGame = (gameId: number) => {
    toast({
      title: "Starting Challenge!",
      description: "Taking you to the challenge page...",
    });
    
    // Navigate to the challenge page
    setTimeout(() => {
      navigate(`/challenge/${gameId}`);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Demo Challenges</h3>
        <Badge variant="outline" className="bg-[#F97316]/10 text-[#F97316] border-[#F97316]">
          <Trophy className="w-3.5 h-3.5 mr-1" />
          Practice Mode
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game) => (
          <Card key={game.id} className="bg-[#403E43] border-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#F97316] text-lg">{game.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                    {game.difficulty}
                  </Badge>
                  <Badge variant="outline" className="bg-[#0EA5E9]/20 text-[#0EA5E9] border-[#0EA5E9]">
                    {getTypeIcon(game.type)}
                    <span className="ml-1 capitalize">{game.type}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">{game.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  {game.timeLimit}
                </div>
                <div className="flex items-center text-[#DAA520]">
                  <Trophy className="h-4 w-4 mr-1" />
                  {game.reward}
                </div>
              </div>

              <Button 
                className="w-full bg-[#F97316] hover:bg-[#E8660E]"
                onClick={() => startGame(game.id)}
              >
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
