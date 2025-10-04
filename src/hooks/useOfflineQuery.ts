import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cacheData, getCachedData } from '@/lib/indexedDB';
import { useOnlineStatus } from './useOnlineStatus';

/**
 * Hook to fetch data with offline support
 * Automatically caches data to IndexedDB when online
 * Returns cached data when offline
 */
export function useOfflineQuery<T>(
  table: 'farms' | 'crop-records' | 'expenses' | 'crop-recommendations',
  query: () => Promise<{ data: T[] | null; error: any }>,
  dependencies: any[] = []
) {
  const { isOnline } = useOnlineStatus();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      if (isOnline) {
        // Fetch from Supabase when online
        try {
          const result = await query();
          
          if (result.error) {
            setError(result.error);
          } else if (result.data) {
            setData(result.data);
            // Cache the data for offline use
            await cacheData(table, result.data as any);
          }
        } catch (err) {
          setError(err);
        }
      } else {
        // Use cached data when offline
        try {
          const cachedData = await getCachedData(table);
          setData(cachedData as T[]);
        } catch (err) {
          setError(err);
        }
      }
      
      setLoading(false);
    };

    fetchData();
  }, [isOnline, ...dependencies]);

  return { data, loading, error, isOnline };
}
