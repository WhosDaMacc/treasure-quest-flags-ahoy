
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Eye, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BrowserMonitorProps {
  isActive: boolean;
  onViolation: (violation: string) => void;
}

export const BrowserMonitor: React.FC<BrowserMonitorProps> = ({ isActive, onViolation }) => {
  const { toast } = useToast();
  const [violations, setViolations] = useState<string[]>([]);
  const [isTabActive, setIsTabActive] = useState(true);
  const [monitoringStatus, setMonitoringStatus] = useState<'active' | 'warning' | 'violation'>('active');

  useEffect(() => {
    if (!isActive) return;

    // Monitor tab visibility
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setIsTabActive(isVisible);
      
      if (!isVisible) {
        const violation = 'Tab switched away from hunt';
        setViolations(prev => [...prev, violation]);
        setMonitoringStatus('violation');
        onViolation(violation);
        
        toast({
          title: "Security Violation Detected",
          description: "You switched away from the hunt. This has been logged.",
          variant: "destructive"
        });
      } else {
        setMonitoringStatus('warning');
        setTimeout(() => setMonitoringStatus('active'), 3000);
      }
    };

    // Monitor key combinations (Ctrl+T, Ctrl+N, etc.)
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlPressed = event.ctrlKey || event.metaKey;
      const bannedKeys = ['t', 'n', 'w', 'shift+n', 'shift+t'];
      const key = event.shiftKey ? `shift+${event.key.toLowerCase()}` : event.key.toLowerCase();
      
      if (isCtrlPressed && bannedKeys.includes(key)) {
        event.preventDefault();
        const violation = `Attempted to open browser: Ctrl+${key.toUpperCase()}`;
        setViolations(prev => [...prev, violation]);
        setMonitoringStatus('violation');
        onViolation(violation);
        
        toast({
          title: "Browser Access Blocked",
          description: "Opening new tabs/windows is not allowed during hunts.",
          variant: "destructive"
        });
      }
    };

    // Monitor right-click context menu
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const violation = 'Attempted to access context menu';
      setViolations(prev => [...prev, violation]);
      onViolation(violation);
      
      toast({
        title: "Context Menu Blocked",
        description: "Right-click menu access is disabled during hunts.",
        variant: "destructive"
      });
    };

    // Monitor copy/paste
    const handleCopy = (event: ClipboardEvent) => {
      event.preventDefault();
      const violation = 'Attempted to copy text';
      setViolations(prev => [...prev, violation]);
      onViolation(violation);
      
      toast({
        title: "Copy Action Blocked",
        description: "Copying text is disabled during hunts.",
        variant: "destructive"
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
    };
  }, [isActive, onViolation, toast]);

  const getStatusColor = () => {
    switch (monitoringStatus) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'violation': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusIcon = () => {
    switch (monitoringStatus) {
      case 'active': return <Shield className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'violation': return <X className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (monitoringStatus) {
      case 'active': return 'Monitoring Active';
      case 'warning': return 'Recently Switched';
      case 'violation': return 'Violation Detected';
      default: return 'Monitoring';
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor()}>
            {getStatusIcon()}
            <span className="ml-1">{getStatusText()}</span>
          </Badge>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            <Eye className="h-3 w-3 mr-1" />
            Browser Monitor
          </Badge>
        </div>
        {violations.length > 0 && (
          <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50">
            {violations.length} Violation{violations.length !== 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      {!isTabActive && (
        <Alert className="bg-red-500/10 border-red-500/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-400">
            <strong>Security Alert:</strong> You have switched away from the hunt. Please return to continue.
          </AlertDescription>
        </Alert>
      )}

      {violations.length > 0 && (
        <Alert className="bg-yellow-500/10 border-yellow-500/20">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-yellow-400">
            <strong>Monitoring Log:</strong> {violations.length} security event{violations.length !== 1 ? 's' : ''} detected. 
            All activity is being recorded for verification.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
