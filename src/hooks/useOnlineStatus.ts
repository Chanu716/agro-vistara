import { useState, useEffect } from 'react';
import { getPendingActionsCount } from '@/lib/indexedDB';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update pending actions count
    const updatePendingCount = async () => {
      const count = await getPendingActionsCount();
      setPendingActions(count);
    };

    updatePendingCount();
    const interval = setInterval(updatePendingCount, 5000); // Check every 5 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return { isOnline, pendingActions };
}
