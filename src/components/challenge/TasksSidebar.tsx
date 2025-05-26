
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface TasksSidebarProps {
  tasks: string[];
  currentClueIndex: number;
}

export const TasksSidebar: React.FC<TasksSidebarProps> = ({
  tasks,
  currentClueIndex
}) => {
  return (
    <Card className="bg-[#403E43] border-none">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                index <= currentClueIndex 
                  ? 'bg-green-500' 
                  : index === currentClueIndex + 1 
                    ? 'bg-[#F97316]' 
                    : 'bg-gray-600'
              }`} />
              <span className={
                index <= currentClueIndex 
                  ? 'text-green-400 line-through' 
                  : index === currentClueIndex + 1 
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
  );
};
