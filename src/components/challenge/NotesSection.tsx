
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  setNotes
}) => {
  return (
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
  );
};
