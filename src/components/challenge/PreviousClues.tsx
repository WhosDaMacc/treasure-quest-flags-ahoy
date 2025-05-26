
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PreviousCluesProps {
  clues: string[];
  currentClueIndex: number;
}

export const PreviousClues: React.FC<PreviousCluesProps> = ({
  clues,
  currentClueIndex
}) => {
  return (
    <Card className="bg-[#403E43] border-none">
      <CardHeader>
        <CardTitle className="text-white">Previous Clues</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {clues.slice(0, currentClueIndex).map((clue, index) => (
            <div key={index} className="text-sm text-gray-400 italic">
              {index + 1}. {clue}
            </div>
          ))}
          {currentClueIndex === 0 && (
            <p className="text-sm text-gray-500">Complete tasks to unlock previous clues</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
