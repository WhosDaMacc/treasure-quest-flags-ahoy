
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface SecurityLogProps {
  securityViolations: string[];
}

export const SecurityLog: React.FC<SecurityLogProps> = ({
  securityViolations
}) => {
  if (securityViolations.length === 0) return null;

  return (
    <Card className="bg-[#403E43] border-none">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Security Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {securityViolations.slice(-5).map((violation, index) => (
            <div key={index} className="text-xs text-red-400 font-mono">
              {violation}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
