import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { WifiOff, Wifi, Cloud, CloudOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from './ui/card';

export function OfflineIndicator() {
  const { isOnline, pendingActions } = useOnlineStatus();
  const { t } = useTranslation();

  if (isOnline && pendingActions === 0) {
    return null; // Don't show when online and synced
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 p-3 shadow-lg border-2 max-w-xs">
      <div className="flex items-start gap-3">
        {isOnline ? (
          <Cloud className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
        ) : (
          <CloudOff className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-orange-500" />
            )}
            <p className="font-semibold text-sm">
              {isOnline ? t('offlineIndicator.online') : t('offlineIndicator.offline')}
            </p>
          </div>
          
          <p className="text-xs text-gray-600">
            {isOnline ? (
              pendingActions > 0 ? (
                <>
                  {t('offlineIndicator.syncing')} ({pendingActions} {t('offlineIndicator.pending')})
                </>
              ) : (
                t('offlineIndicator.allSynced')
              )
            ) : (
              t('offlineIndicator.offlineMessage')
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}
