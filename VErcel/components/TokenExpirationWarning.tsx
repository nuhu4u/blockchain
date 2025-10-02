'use client';

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw, X } from 'lucide-react';

interface TokenExpirationWarningProps {
  show: boolean;
  timeUntilExpiration: number | null;
  onDismiss: () => void;
  onExtendSession: () => void;
  userType?: 'user' | 'admin' | 'observer';
}

export const TokenExpirationWarning: React.FC<TokenExpirationWarningProps> = ({
  show,
  timeUntilExpiration,
  onDismiss,
  onExtendSession,
  userType = 'user'
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!show || !timeUntilExpiration) return;

    setTimeLeft(timeUntilExpiration);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 0) return 0;
        return prev - 1000; // Decrease by 1 second
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [show, timeUntilExpiration]);

  if (!show || !timeLeft) return null;

  const minutes = Math.floor(timeLeft / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const getMessage = () => {
    const baseMessage = userType === 'admin' 
      ? 'Your admin session will expire soon' 
      : userType === 'observer'
      ? 'Your observer session will expire soon'
      : 'Your session will expire soon';
    
    return `${baseMessage}. Please save your work.`;
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <Alert className="border-orange-200 bg-orange-50">
        <Clock className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <div className="space-y-3">
            <p className="font-medium">{getMessage()}</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                Time remaining: <strong>{minutes}:{seconds.toString().padStart(2, '0')}</strong>
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onExtendSession}
                className="text-orange-700 border-orange-300 hover:bg-orange-100"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Extend Session
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onDismiss}
                className="text-orange-700 hover:bg-orange-100"
              >
                <X className="h-3 w-3 mr-1" />
                Dismiss
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

